"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTitleProps {
    phrases: string[];
    speed?: number;
}

export default function TypewriterTitle({ phrases, speed = 50 }: TypewriterTitleProps) {
    const [displayText, setDisplayText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const currentPhrase = phrases[phraseIndex];

        if (isWaiting) {
            timer = setTimeout(() => {
                setIsWaiting(false);
                setIsDeleting(true);
            }, 3000); // Wait 3 seconds before deleting
            return () => clearTimeout(timer);
        }

        if (isDeleting) {
            if (displayText.length > 0) {
                timer = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, speed / 2);
            } else {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
            }
        } else {
            if (displayText.length < currentPhrase.length) {
                timer = setTimeout(() => {
                    setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                }, speed);
            } else {
                setIsWaiting(true);
            }
        }

        return () => clearTimeout(timer);
    }, [displayText, phraseIndex, isDeleting, isWaiting, phrases, speed]);

    return (
        <span className="relative">
            {displayText}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[3px] h-[0.9em] bg-amber-500 ml-1 align-middle"
            />
        </span>
    );
}
