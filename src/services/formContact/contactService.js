import CONTACT_CONFIG from "./config";

/**
 * Envoie le formulaire de contact via Google Apps Script.
 * @param {{ name: string, email: string, message: string }} data
 * @returns {Promise<{ success: boolean }>}
 */
export async function sendContactForm(data) {
    const url = CONTACT_CONFIG.APPS_SCRIPT_URL;
    if (!url) {
        throw new Error("Contact Apps Script URL not configured");
    }

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
        throw new Error(result.error || "Unknown error");
    }

    return result;
}
