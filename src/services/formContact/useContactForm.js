import { useState, useRef, useCallback } from "react";
import { sendContactForm } from "./contactService";

/**
 * Hook pour gérer le formulaire de contact.
 * Retourne les refs, l'état et la fonction de soumission.
 */
export default function useContactForm() {
    const [status, setStatus] = useState(null); // "sending" | "success" | "error"
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);

    const resetForm = useCallback(() => {
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (messageRef.current) messageRef.current.value = "";
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        const name = nameRef.current?.value?.trim() || "";
        const email = emailRef.current?.value?.trim() || "";
        const message = messageRef.current?.value?.trim() || "";

        if (!name || !email || !message) return;

        setStatus("sending");

        try {
            await sendContactForm({ name, email, message });
            setStatus("success");
            resetForm();
            setTimeout(() => setStatus(null), 4000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus(null), 4000);
        }
    }, [resetForm]);

    return {
        nameRef,
        emailRef,
        messageRef,
        status,
        handleSubmit,
    };
}
