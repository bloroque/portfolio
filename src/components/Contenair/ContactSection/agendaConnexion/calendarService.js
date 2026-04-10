import CONFIG from "./config";

/**
 * ===== LECTURE (via API Key — calendrier public) =====
 */

/**
 * Fetch events from the calendar for a given date range
 */
export async function fetchEvents(timeMin, timeMax) {
    const response = await window.gapi.client.calendar.events.list({
        calendarId: CONFIG.CALENDAR_ID,
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        singleEvents: true,
        orderBy: "startTime",
    });
    return response.result.items || [];
}

/**
 * Fetch events for a specific month
 */
export async function fetchMonthEvents(year, month) {
    const timeMin = new Date(year, month, 1);
    const timeMax = new Date(year, month + 1, 0, 23, 59, 59);
    return fetchEvents(timeMin, timeMax);
}

/**
 * Fetch events for a specific day
 */
export async function fetchDayEvents(year, month, day) {
    const timeMin = new Date(year, month, day, 0, 0, 0);
    const timeMax = new Date(year, month, day, 23, 59, 59);
    return fetchEvents(timeMin, timeMax);
}

/**
 * Fetch public holidays from Google's holiday calendar
 */
export async function fetchHolidays(year, month) {
    try {
        const timeMin = new Date(year, month, 1);
        const timeMax = new Date(year, month + 1, 0, 23, 59, 59);

        const response = await window.gapi.client.calendar.events.list({
            calendarId: CONFIG.HOLIDAY_CALENDAR_ID,
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        });

        return (response.result.items || []).map((event) => {
            const date = new Date(event.start.date || event.start.dateTime);
            return {
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
                name: event.summary,
            };
        });
    } catch {
        return [];
    }
}

/**
 * ===== ÉCRITURE (via Google Apps Script — web app déployée) =====
 */

/**
 * Create an appointment via Google Apps Script
 */
export async function createAppointment({ date, slot, name, email, phone, notes }) {
    const scriptUrl = CONFIG.APPS_SCRIPT_URL;
    if (!scriptUrl) {
        throw new Error("Apps Script URL not configured");
    }

    const [hours, minutes] = slot.split(":").map(Number);
    const startDate = new Date(date.year, date.month, date.day, hours, minutes, 0);
    const endDate = new Date(startDate.getTime() + 45 * 60 * 1000);

    const payload = {
        summary: `RDV — ${name}`,
        description: [
            `Nom: ${name}`,
            `Email: ${email}`,
            `Téléphone: ${phone}`,
            notes ? `Notes: ${notes}` : "",
        ].filter(Boolean).join("\n"),
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        attendeeEmail: email,
    };

    const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to create appointment");
    }

    return response.json();
}
