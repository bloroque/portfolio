/**
 * All bookable slots: morning (9h-12h) + afternoon (14h-18h)
 */
const ALL_SLOTS = [
    "09:00", "09:45", "10:30", "11:15",
    "14:00", "14:45", "15:30", "16:15",
];

const SLOT_DURATION_MIN = 45;

/**
 * Check if a slot overlaps with an existing event
 */
function slotOverlapsEvent(slotStart, slotEnd, eventStart, eventEnd) {
    return slotStart < eventEnd && slotEnd > eventStart;
}

/**
 * Given a list of Google Calendar events for a day,
 * return ALL slots with their availability status
 */
export function getAllSlotsWithStatus(dayEvents, year, month, day) {
    const now = new Date();

    return ALL_SLOTS.map((slot) => {
        const [h, m] = slot.split(":").map(Number);
        const slotStart = new Date(year, month, day, h, m, 0);
        const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION_MIN * 60 * 1000);

        // Slot is in the past
        const isPast = slotStart < now;

        const hasConflict = dayEvents.some((event) => {
            const evStart = new Date(event.start.dateTime || event.start.date);
            const evEnd = new Date(event.end.dateTime || event.end.date);
            return slotOverlapsEvent(slotStart, slotEnd, evStart, evEnd);
        });

        return { time: slot, available: !hasConflict && !isPast, reason: isPast ? "past" : hasConflict ? "busy" : null };
    });
}

/**
 * Given a list of Google Calendar events for a day,
 * return which slots are still available (not overlapping any event)
 */
export function getAvailableSlots(dayEvents, year, month, day) {
    return ALL_SLOTS.filter((slot) => {
        const [h, m] = slot.split(":").map(Number);
        const slotStart = new Date(year, month, day, h, m, 0);
        const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION_MIN * 60 * 1000);

        const hasConflict = dayEvents.some((event) => {
            const evStart = new Date(event.start.dateTime || event.start.date);
            const evEnd = new Date(event.end.dateTime || event.end.date);
            return slotOverlapsEvent(slotStart, slotEnd, evStart, evEnd);
        });

        return !hasConflict;
    });
}

/**
 * Check if a specific day is a holiday
 */
export function isDayHoliday(day, month, year, holidays) {
    return holidays.some(
        (h) => h.day === day && h.month === month && h.year === year
    );
}

/**
 * Get holiday name for a specific day (or null)
 */
export function getHolidayName(day, month, year, holidays) {
    const holiday = holidays.find(
        (h) => h.day === day && h.month === month && h.year === year
    );
    return holiday ? holiday.name : null;
}

/**
 * Group slot objects into morning / afternoon for the UI
 * Each slot is { time: "09:00", available: true/false }
 */
export function groupSlots(slots, lang) {
    return [
        {
            key: "morning",
            label: lang === "fr" ? "Matin" : "Morning",
            slots: slots.filter((s) => {
                const h = parseInt(s.time.split(":")[0], 10);
                return h < 12;
            }),
        },
        {
            key: "afternoon",
            label: lang === "fr" ? "Après-midi" : "Afternoon",
            slots: slots.filter((s) => {
                const h = parseInt(s.time.split(":")[0], 10);
                return h >= 12;
            }),
        },
    ];
}
