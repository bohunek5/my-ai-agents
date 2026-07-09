"use client";

import React from "react";
import { useChat } from "@/contexts/ChatContext";

export function MobileChatTrigger() {
    const { toggleChat } = useChat();

    return (
        <button
            onClick={toggleChat}
            className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 hover:bg-amber-500/20 rounded-full border border-amber-500/20 transition-all mx-1"
        >
            <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest whitespace-nowrap">
                Nasz asystent
            </span>
        </button>
    );
}
