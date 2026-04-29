import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import useGoogleCalendar from "@/services/agendaConnexion/useGoogleCalendar";

const FALLBACK_SLOT_GROUPS = [
    {
        key: "morning",
        label: "Matin",
        slots: [
            { time: "09:00", available: true },
            { time: "09:45", available: true },
            { time: "10:30", available: true },
            { time: "11:15", available: true },
        ],
    },
    {
        key: "afternoon",
        label: "Après-midi",
        slots: [
            { time: "14:00", available: true },
            { time: "14:45", available: true },
            { time: "15:30", available: true },
            { time: "16:15", available: true },
        ],
    },
];

const SchedulerPicker = () => {
    const { t, lang } = useLanguage();
    const today = new Date();

    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(
        { day: today.getDate(), month: currentMonth, year: currentYear }
    );
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [is24h, setIs24h] = useState(true);
    const [bookingStatus, setBookingStatus] = useState(null); // "success" | "error" | null
    const [now, setNow] = useState(() => new Date());

    // Update current time every minute
    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // Form refs
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const notesRef = useRef(null);

    // Google Calendar hook
    const calendar = useGoogleCalendar(lang);
    const { ready, loadMonth, loadDaySlots } = calendar;

    // Load month data when month/year changes or after ready
    useEffect(() => {
        if (ready) {
            loadMonth(currentYear, currentMonth);
        }
    }, [currentMonth, currentYear, ready, loadMonth]);

    // Load day slots when selected date changes or time ticks
    useEffect(() => {
        if (selectedDate && ready) {
            loadDaySlots(selectedDate.year, selectedDate.month, selectedDate.day);
        }
    }, [selectedDate, ready, loadDaySlots, now]);

    // Dynamic slot groups: use Google Calendar data if available, else fallback
    const slotGroups = useMemo(() => {
        if (ready) {
            const grouped = calendar.getGroupedSlots();
            if (grouped) return grouped;
        }
        // Fallback: static slots with past check
        return FALLBACK_SLOT_GROUPS.map((g) => ({
            ...g,
            label: g.key === "morning"
                ? (lang === "fr" ? "Matin" : "Morning")
                : (lang === "fr" ? "Après-midi" : "Afternoon"),
            slots: g.slots.map((s) => {
                if (!selectedDate) return s;
                const [h, m] = s.time.split(":").map(Number);
                const slotTime = new Date(selectedDate.year, selectedDate.month, selectedDate.day, h, m, 0);
                const isPast = slotTime < now;
                return { ...s, available: s.available && !isPast, reason: isPast ? "past" : null };
            }),
        }));
    }, [calendar, lang, ready, selectedDate, now]);

    const dayNames = lang === "fr"
        ? ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"]
        : ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    const shortDayNames = lang === "fr"
        ? ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"]
        : ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    const monthNames = lang === "fr"
        ? ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
        : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const daysInMonth = useMemo(() => {
        return new Date(currentYear, currentMonth + 1, 0).getDate();
    }, [currentMonth, currentYear]);

    const firstDayOfMonth = useMemo(() => {
        const day = new Date(currentYear, currentMonth, 1).getDay();
        return day === 0 ? 6 : day - 1; // Monday = 0
    }, [currentMonth, currentYear]);

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const isDayPast = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return date < todayStart;
    };

    const isDaySelected = (day) => {
        return selectedDate && selectedDate.day === day && selectedDate.month === currentMonth && selectedDate.year === currentYear;
    };

    const isToday = (day) => {
        return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
    };

    const isWeekend = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        const dow = date.getDay();
        return dow === 0 || dow === 6;
    };

    const isDayDisabled = (day) => {
        return isDayPast(day) || isWeekend(day) || (ready && calendar.checkHoliday(day, currentMonth, currentYear));
    };

    const selectDate = (day) => {
        if (isDayDisabled(day)) return;
        setSelectedDate({ day, month: currentMonth, year: currentYear });
        setSelectedSlot(null);
    };

    const selectSlot = (slot) => {
        const isSelected = selectedSlot === slot;
        if (isSelected) {
            setSelectedSlot(null);
        } else {
            setSelectedSlot(slot);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedSlot(null);
        setBookingStatus(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            date: selectedDate,
            slot: selectedSlot,
            name: nameRef.current?.value || "",
            email: emailRef.current?.value || "",
            phone: phoneRef.current?.value || "",
            notes: notesRef.current?.value || "",
        };

        if (calendar.ready) {
            try {
                await calendar.bookAppointment(formData);
                setBookingStatus("success");
                setTimeout(() => closeModal(), 2000);
            } catch {
                setBookingStatus("error");
            }
        } else {
            // Pas encore connecté — juste fermer
            setBookingStatus("success");
            setTimeout(() => closeModal(), 1500);
        }
    };

    const getFullDateLabel = () => {
        if (!selectedDate || !selectedSlot) return "";
        const date = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
        const dayOfWeek = date.getDay();
        const dayIdx = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const fullDayNames = lang === "fr"
            ? ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
            : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        return `${fullDayNames[dayIdx]} ${selectedDate.day} ${monthNames[selectedDate.month]} ${selectedDate.year} — ${formatTime(selectedSlot)}`;
    };

    const formatTime = (time) => {
        if (is24h) return time;
        const [h, m] = time.split(":");
        const hour = parseInt(h, 10);
        const suffix = hour >= 12 ? "PM" : "AM";
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        return `${displayHour}:${m} ${suffix}`;
    };

    const formatDateHeader = (d) => {
        const date = new Date(d.year, d.month, d.day);
        const dayOfWeek = date.getDay();
        const dayIdx = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        return `${shortDayNames[dayIdx]}. ${String(d.day).padStart(2, "0")}`;
    };

    const getDateLabel = () => {
        if (!selectedDate) return t("contact.scheduler.noDateSelected");
        return `${selectedDate.day} ${monthNames[selectedDate.month]} ${selectedDate.year}`;
    };

    const calendarCells = useMemo(() => {
        const cells = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            cells.push(null);
        }
        for (let d = 1; d <= daysInMonth; d++) {
            cells.push(d);
        }
        return cells;
    }, [firstDayOfMonth, daysInMonth]);

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2 w-full min-h-[430px]"
        >
            {/* Status bar */}
            <motion.div variants={childVariants} className="flex items-center gap-2 px-1 py-1">
                <div className={`w-2 h-2 rounded-full ${calendar.ready ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`}></div>
                <span className="text-xs text-[var(--text-secondary)] font-medium">
                    {calendar.ready
                        ? (lang === "fr" ? "Calendrier synchronisé" : "Calendar synced")
                        : (lang === "fr" ? "Chargement du calendrier..." : "Loading calendar...")
                    }
                </span>
                {calendar.loading && (
                    <svg className="animate-spin w-3.5 h-3.5 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                    </svg>
                )}
            </motion.div>

            {calendar.error && (
                <div className="text-xs text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">
                    {calendar.error}
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-2 w-full">
            {/* Calendar */}
            <motion.div
                variants={childVariants}
                className="flex-1 bg-[var(--bg-card)] border border-[var(--border-theme)] rounded p-4"
            >
                {/* Month navigation */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={prevMonth}
                        className="p-2 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors"
                        aria-label="Previous month"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <span className="text-[var(--text-heading)] font-bold text-sm md:text-base">
                        {monthNames[currentMonth]} {currentYear}
                    </span>
                    <button
                        onClick={nextMonth}
                        className="p-2 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors"
                        aria-label="Next month"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((d) => (
                        <div key={d} className="text-center text-xs font-semibold text-[var(--text-secondary)] py-1">
                            {d}
                        </div>
                    ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-1">
                    {calendarCells.map((day, idx) => (
                        <div key={idx} className="aspect-square flex items-center justify-center">
                            {day !== null && (
                                <button
                                    onClick={() => selectDate(day)}
                                    disabled={isDayDisabled(day)}
                                    title={ready ? (calendar.holidayName(day, currentMonth, currentYear) || "") : ""}
                                    className={`w-full h-full rounded text-sm font-medium transition-all duration-200 relative
                                        ${isDayDisabled(day)
                                            ? (ready && calendar.checkHoliday(day, currentMonth, currentYear)
                                                ? "text-red-400 opacity-60 cursor-not-allowed"
                                                : "text-[var(--text-secondary)] opacity-30 cursor-not-allowed")
                                            : isDaySelected(day)
                                                ? "bg-[var(--color-accent)] text-white shadow-md"
                                                : isToday(day)
                                                    ? "border-2 border-[var(--color-accent)] text-[var(--text-primary)] hover:bg-[var(--color-accent)] hover:text-white"
                                                    : "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                                        }`}
                                >
                                    {day}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Time slots */}
            <motion.div
                variants={childVariants}
                className="flex-1 bg-[var(--bg-card)] border border-[var(--border-theme)] rounded p-4 flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span className="text-[var(--text-heading)] font-bold text-sm md:text-base">
                        {getDateLabel()}
                    </span>
                    <div className="flex items-center bg-[var(--bg-secondary)] border rounded-full p-0.5">
                        <button
                            onClick={() => setIs24h(false)}
                            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${!is24h
                                ? "bg-[var(--color-accent)] text-white"
                                : "text-[var(--text-secondary)]"
                                }`}
                        >
                            12h
                        </button>
                        <button
                            onClick={() => setIs24h(true)}
                            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${is24h
                                ? "bg-[var(--color-accent)] text-white"
                                : "text-[var(--text-secondary)]"
                                }`}
                        >
                            24h
                        </button>
                    </div>
                </div>

                {/* Slots grid */}
                {!selectedDate ? (
                    <div className="flex-1 flex items-center justify-center text-[var(--text-secondary)] text-sm italic">
                        {t("contact.scheduler.selectDatePrompt")}
                    </div>
                ) : (
                    <div className="flex-1">
                        <div className="text-center text-xs font-bold text-[var(--text-heading)] border-b border-[var(--border-theme)] pb-2 mb-3 uppercase">
                            {formatDateHeader(selectedDate)}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {slotGroups.map((group) => (
                                <div key={group.key} className="flex flex-col gap-1.5">
                                    <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider text-center mb-1">
                                        {group.label}
                                    </span>
                                    {group.slots.length === 0 ? (
                                        <p className="text-xs text-[var(--text-secondary)] italic text-center py-3">
                                            {lang === "fr" ? "Aucun créneau" : "No slots"}
                                        </p>
                                    ) : (
                                        group.slots.map((slot) => {
                                        const isSelected = selectedSlot === slot.time;
                                        const isUnavailable = !slot.available;
                                        const isPast = slot.reason === "past";
                                        return (
                                            <button
                                                key={slot.time}
                                                onClick={() => !isUnavailable && selectSlot(slot.time)}
                                                disabled={isUnavailable}
                                                className={`py-2 px-2 rounded text-sm font-medium transition-all duration-200 border
                                                    ${isUnavailable
                                                        ? isPast
                                                            ? "border-gray-200 bg-gray-50 text-gray-400 line-through cursor-not-allowed opacity-50"
                                                            : "border-red-200 bg-red-50 text-red-400 line-through cursor-not-allowed opacity-60"
                                                        : isSelected
                                                            ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-md"
                                                            : "border-[var(--border-theme)] text-[var(--text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                                                    }`}
                                            >
                                                {formatTime(slot.time)}
                                                {isUnavailable && !isPast && (
                                                    <>
                                                        {!isPast && (
                                                            <span className="ml-1 text-[10px] no-underline">
                                                                {(lang === "fr" ? "• Occupé" : "• Taken")}
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </button>
                                        );
                                    })
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative w-full max-w-md bg-white border border-white rounded space-y-3 p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <h3 className="text-theme-base font-bold text-lg">
                                {t("contact.scheduler.modal.title")}
                            </h3>
                            <p className="text-[var(--color-accent)] font-semibold text-sm mb-5">
                                {getFullDateLabel()}
                            </p>

                            {/* Form */}
                            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <label className="text-slate-700 text-xs font-semibold">
                                        {t("contact.scheduler.modal.nameLabel")} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        ref={nameRef}
                                        type="text"
                                        required
                                        placeholder={t("contact.scheduler.modal.namePlaceholder")}
                                        className="px-4 py-2.5 rounded border border-[var(--border-theme)] bg-[var(--bg-secondary)] text-slate-800 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-slate-700 text-xs font-semibold">
                                        {t("contact.scheduler.modal.emailLabel")} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        ref={emailRef}
                                        type="email"
                                        required
                                        placeholder={t("contact.scheduler.modal.emailPlaceholder")}
                                        className="px-4 py-2.5 rounded border border-[var(--border-theme)] bg-[var(--bg-secondary)] text-slate-800 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-slate-700 text-xs font-semibold">
                                        {t("contact.scheduler.modal.phoneLabel")} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        ref={phoneRef}
                                        type="tel"
                                        required
                                        placeholder={t("contact.scheduler.modal.phonePlaceholder")}
                                        className="px-4 py-2.5 rounded border border-[var(--border-theme)] bg-[var(--bg-secondary)] text-slate-800 text-sm outline-none focus:border-[var(--color-accent)] transition-colors"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-slate-700 text-xs font-semibold">
                                        {t("contact.scheduler.modal.notesLabel")}
                                    </label>
                                    <textarea
                                        ref={notesRef}
                                        rows="3"
                                        placeholder={t("contact.scheduler.modal.notesPlaceholder")}
                                        className="px-4 py-2.5 rounded border border-[var(--border-theme)] bg-[var(--bg-secondary)] text-slate-800 text-sm outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                                    />
                                </div>

                                {/* Booking status */}
                                {bookingStatus === "success" && (
                                    <div className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded px-3 py-2 text-center font-semibold">
                                        {lang === "fr" ? "Rendez-vous confirmé !" : "Appointment confirmed!"}
                                    </div>
                                )}
                                {bookingStatus === "error" && (
                                    <div className="text-xs text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2 text-center font-semibold">
                                        {lang === "fr" ? "Erreur lors de la réservation" : "Error creating appointment"}
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex gap-3 justify-end mt-2">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-5 py-2.5 rounded border border-[var(--border-theme)] text-slate-800 font-semibold text-sm hover:bg-[var(--bg-secondary)] transition-colors"
                                    >
                                        {t("contact.scheduler.modal.cancelButton")}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={calendar.loading || bookingStatus === "success"}
                                        className="px-5 py-2.5 rounded bg-[var(--color-accent)] text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {calendar.loading && (
                                            <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                                                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                                            </svg>
                                        )}
                                        {t("contact.scheduler.modal.confirmButton")}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default SchedulerPicker;
