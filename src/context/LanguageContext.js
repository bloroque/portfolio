import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import translations from "../i18n/translations";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        const saved = localStorage.getItem("lang");
        if (saved && translations[saved]) return saved;
        const browserLang = navigator.language.slice(0, 2);
        return translations[browserLang] ? browserLang : "en";
    });

    useEffect(() => {
        localStorage.setItem("lang", lang);
        document.documentElement.lang = lang;
    }, [lang]);

    const toggleLang = () => setLang((prev) => (prev === "en" ? "fr" : "en"));

    const t = useCallback(
        (key) => {
            const keys = key.split(".");
            let value = translations[lang];
            for (const k of keys) {
                value = value?.[k];
            }
            return value || key;
        },
        [lang]
    );

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
