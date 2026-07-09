"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";
import { X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Markdown from "react-markdown";
import Link from "next/link";

export function AiAssistant() {
    const { isOpen, closeChat, toggleChat } = useChat();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
        { role: "assistant", content: "Cześć! Jestem Twoim wirtualnym asystentem Mazury Holiday. W czym mogę Ci pomóc?" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsTyping(true);

        const { getAssistantResponse } = await import("@/utils/aiAssistantEngine");

        // Simulate a slight delay for realistic feel
        setTimeout(() => {
            const response = getAssistantResponse(userMessage);
            setMessages((prev) => [...prev, { role: "assistant", content: response }]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Desktop Trigger - 3D Cloud Style */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleChat}
                        className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-5 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 hover:shadow-[0_8px_30px_rgba(245,158,11,0.3)] transition-all group"
                    >
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                            <div className="relative bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-full text-white">
                                <Sparkles size={20} fill="currentColor" />
                            </div>
                        </div>
                        <span className="font-semibold text-sm tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
                            Asystent
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[95vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                    <Sparkles size={18} fill="currentColor" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Mazury Holiday Asystent</h3>
                                    <p className="text-xs text-amber-100 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={closeChat}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                aria-label="Zamknij czat"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        "flex w-full mb-4",
                                        msg.role === "user" ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm prose prose-slate dark:prose-invert prose-p:leading-relaxed prose-a:text-white prose-a:underline hover:prose-a:text-slate-100",
                                            msg.role === "user"
                                                ? "bg-amber-500 text-white rounded-tr-none"
                                                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700"
                                        )}
                                    >
                                        {msg.role === "assistant" ? (
                                            <React.Suspense fallback={<div className="animate-pulse h-4 w-24 bg-slate-200 rounded" />}>
                                                <div className="assistant-markdown">
                                                    <Markdown
                                                        components={{
                                                            a: ({ ...props }) => (
                                                                <Link
                                                                    href={props.href || "#"}
                                                                    className="font-bold underline decoration-2 underline-offset-2 hover:opacity-80 transition-opacity"
                                                                    onClick={() => {
                                                                        if (props.href?.startsWith('/')) {
                                                                            // Optional: closeChat(); 
                                                                        }
                                                                    }}
                                                                >
                                                                    {props.children}
                                                                </Link>
                                                            ),
                                                        }}
                                                    >
                                                        {msg.content}
                                                    </Markdown>
                                                </div>
                                            </React.Suspense>
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 px-4 py-3 shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
                            <div className="relative flex items-center">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Zapytaj o cennik, atrakcje..."
                                    className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none h-[46px] max-h-[100px]"
                                    rows={1}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 p-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:hover:bg-amber-500 transition-colors"
                                    aria-label="Wyślij wiadomość"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
