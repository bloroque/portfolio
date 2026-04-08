import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ReactComponent as KeyboardSvg } from "../../assets/images/keyboard-azerty.svg";

const TYPING_SEQUENCE = [
    "D", "E", "V", "E", "L", "O", "P", "E", "R",
    null,
    "F", "U", "L", "L",
    null,
    "S", "T", "A", "C", "K",
    null, null,
];

const KeyboardBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const keyGroups = Array.from(container.querySelectorAll(".key"));

        // Dim all keys initially
        keyGroups.forEach((group) => {
            const rect = group.querySelector("rect");
            const texts = group.querySelectorAll("text");
            if (rect) {
                rect.style.stroke = "rgba(255,255,255,0.15)";
                rect.style.transition = "stroke 0.5s ease-out, filter 0.5s ease-out";
            }
            texts.forEach((t) => {
                t.style.fill = "rgba(255,255,255,0.15)";
                t.style.transition = "fill 0.5s ease-out";
            });
        });

        // Dim outer border
        const outerRect = container.querySelector("svg > rect");
        if (outerRect) {
            outerRect.style.stroke = "rgba(255,255,255,0.1)";
        }

        // Dim decorative lines
        const lines = container.querySelectorAll("svg > line");
        lines.forEach((line) => {
            line.style.stroke = "rgba(255,255,255,0.05)";
        });

        // Build key map: label -> group element
        const keyMap = {};
        keyGroups.forEach((group) => {
            const texts = group.querySelectorAll("text");
            texts.forEach((textEl) => {
                const label = textEl.textContent.trim().toUpperCase();
                if (label && !keyMap[label]) {
                    keyMap[label] = group;
                }
            });
        });

        let index = 0;
        const timeoutIds = [];

        const highlightKey = (group) => {
            const rect = group.querySelector("rect");
            const texts = group.querySelectorAll("text");
            if (rect) {
                rect.style.stroke = "var(--color-accent, #6366f1)";
                rect.style.filter = "drop-shadow(0 0 8px var(--color-accent, #6366f1))";
                rect.style.transition = "stroke 0.05s ease-in, filter 0.05s ease-in";
            }
            texts.forEach((t) => {
                t.style.fill = "var(--color-accent, #6366f1)";
                t.style.transition = "fill 0.05s ease-in";
            });

            const fadeId = setTimeout(() => {
                if (rect) {
                    rect.style.stroke = "rgba(255,255,255,0.15)";
                    rect.style.filter = "none";
                    rect.style.transition = "stroke 0.6s ease-out, filter 0.6s ease-out";
                }
                texts.forEach((t) => {
                    t.style.fill = "rgba(255,255,255,0.15)";
                    t.style.transition = "fill 0.6s ease-out";
                });
            }, 250);
            timeoutIds.push(fadeId);
        };

        const pressKey = () => {
            const letter = TYPING_SEQUENCE[index % TYPING_SEQUENCE.length];
            index++;

            if (letter === null) {
                const tid = setTimeout(pressKey, 300 + Math.random() * 200);
                timeoutIds.push(tid);
                return;
            }

            const targetGroup = keyMap[letter];
            if (targetGroup) {
                highlightKey(targetGroup);
            }

            // Occasionally press a random extra key for ambient effect
            if (Math.random() > 0.7) {
                const randomGroup = keyGroups[Math.floor(Math.random() * keyGroups.length)];
                const extraId = setTimeout(
                    () => highlightKey(randomGroup),
                    30 + Math.random() * 80
                );
                timeoutIds.push(extraId);
            }

            const nextDelay = 120 + Math.random() * 180;
            const tid = setTimeout(pressKey, nextDelay);
            timeoutIds.push(tid);
        };

        // Start typing after a delay
        const startId = setTimeout(pressKey, 2000);
        timeoutIds.push(startId);

        return () => {
            timeoutIds.forEach((id) => clearTimeout(id));
        };
    }, []);

    return (
        <div
            style={{
                position: "absolute",
                bottom: "-30px",
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                pointerEvents: "none",
                zIndex: 0,
                overflow: "hidden",
            }}
        >
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                style={{
                    width: "100vw",
                }}
            >
                <KeyboardSvg style={{ width: "100%", height: "auto" }} />
            </motion.div>
        </div>
    );
};

export default KeyboardBackground;
