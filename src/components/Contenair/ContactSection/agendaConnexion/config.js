// Google Calendar API configuration
// Lecture via API Key (pas de OAuth nécessaire — calendrier public)
// Écriture via Google Apps Script (déployé comme web app)

const GOOGLE_CALENDAR_CONFIG = {
    // Google Calendar API Key
    API_KEY: process.env.REACT_APP_GOOGLE_API_KEY || "",

    // Calendar ID (ton email Google)
    CALENDAR_ID: process.env.REACT_APP_GOOGLE_CALENDAR_ID || "brillantloroque@gmail.com",

    // Google Apps Script URL pour créer des événements
    APPS_SCRIPT_URL: process.env.REACT_APP_APPS_SCRIPT_URL || "",

    // Google holiday calendar (Madagascar)
    HOLIDAY_CALENDAR_ID: "fr.mg#holiday@group.v.calendar.google.com",
};

export default GOOGLE_CALENDAR_CONFIG;
