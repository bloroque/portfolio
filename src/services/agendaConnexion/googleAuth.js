import CONFIG from "./config";

let gapiReady = false;

/**
 * Load gapi client with API Key only (no OAuth needed).
 * The calendar must be set to public for reads to work.
 */
export async function initGapi() {
    if (gapiReady) return;

    await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });

    await new Promise((resolve, reject) => {
        window.gapi.load("client", async () => {
            try {
                await window.gapi.client.init({
                    apiKey: CONFIG.API_KEY,
                    discoveryDocs: [
                        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
                    ],
                });
                gapiReady = true;
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
}

export function isGapiReady() {
    return gapiReady;
}
