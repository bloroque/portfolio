import { useState, useEffect, useCallback } from "react";
import { initGapi, isGapiReady } from "./googleAuth";
import { fetchMonthEvents, fetchDayEvents, fetchHolidays, createAppointment } from "./calendarService";
import { getAllSlotsWithStatus, isDayHoliday, getHolidayName, groupSlots } from "./slotUtils";

/**
 * React hook — connects SchedulerPicker to Google Calendar
 * 
 * Auto-connects via API Key (no sign-in required).
 * Reads: via gapi + API Key (calendar must be public)
 * Writes: via Google Apps Script (deployed as web app)
 */
export default function useGoogleCalendar(lang) {
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Data
    const [holidays, setHolidays] = useState([]);
    const [daySlots, setDaySlots] = useState(null);

    // Auto-init gapi on mount
    useEffect(() => {
        initGapi()
            .then(() => setReady(true))
            .catch((err) => {
                console.error("Google API init error:", err);
                setError(lang === "fr" ? "Erreur de connexion au calendrier" : "Calendar connection error");
            });
    }, [lang]);

    /**
     * Load holidays + events when month changes
     */
    const loadMonth = useCallback(async (year, month) => {
        if (!isGapiReady()) return;

        setLoading(true);
        setError(null);
        try {
            const [hols] = await Promise.all([
                fetchHolidays(year, month),
                fetchMonthEvents(year, month), // pre-warm cache
            ]);
            setHolidays(hols);
        } catch (err) {
            console.error("Error loading month data:", err);
            setError(lang === "fr" ? "Erreur de chargement du calendrier" : "Error loading calendar");
        } finally {
            setLoading(false);
        }
    }, [lang]);

    /**
     * Load available slots for a specific day
     */
    const loadDaySlots = useCallback(async (year, month, day) => {
        if (!isGapiReady()) {
            setDaySlots(null);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const events = await fetchDayEvents(year, month, day);
            const slotsWithStatus = getAllSlotsWithStatus(events, year, month, day);
            setDaySlots(slotsWithStatus);
        } catch (err) {
            console.error("Error loading day slots:", err);
            setError(lang === "fr" ? "Erreur de chargement des créneaux" : "Error loading slots");
            setDaySlots([]);
        } finally {
            setLoading(false);
        }
    }, [lang]);

    /**
     * Book an appointment (via Apps Script)
     */
    const bookAppointment = useCallback(async ({ date, slot, name, email, phone, notes }) => {
        setLoading(true);
        setError(null);
        try {
            const result = await createAppointment({ date, slot, name, email, phone, notes });
            // Refresh day slots after booking
            await loadDaySlots(date.year, date.month, date.day);
            return result;
        } catch (err) {
            console.error("Error creating appointment:", err);
            const msg = lang === "fr" ? "Erreur lors de la réservation" : "Error creating appointment";
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [lang, loadDaySlots]);

    /**
     * Check if a day is a holiday
     */
    const checkHoliday = useCallback((day, month, year) => {
        return isDayHoliday(day, month, year, holidays);
    }, [holidays]);

    /**
     * Get holiday name
     */
    const holidayName = useCallback((day, month, year) => {
        return getHolidayName(day, month, year, holidays);
    }, [holidays]);

    /**
     * Get grouped slots (morning / afternoon) for UI
     */
    const getGroupedSlots = useCallback(() => {
        if (!daySlots) return null;
        return groupSlots(daySlots, lang);
    }, [daySlots, lang]);

    return {
        // State
        ready,
        loading,
        error,

        // Data loading
        loadMonth,
        loadDaySlots,

        // Holidays
        holidays,
        checkHoliday,
        holidayName,

        // Slots
        daySlots,
        getGroupedSlots,

        // Booking
        bookAppointment,
    };
}
