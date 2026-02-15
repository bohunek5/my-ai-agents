"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, Home, Briefcase, Plus, Minus,
    Check, ArrowRight, ArrowLeft, Calendar as CalendarIcon,
    MapPin, Mail, Phone, CreditCard, Sparkles
} from "lucide-react";
import { useBookingStore, EXTRAS, PropertyType } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { pl } from 'date-fns/locale';

const steps = [
    "Zakres",
    "Dodatki",
    "Termin",
    "Kontakt",
    "Płatność"
];

export function BookingWizard() {
    const {
        step, nextStep, prevStep, scope, setPropertyType,
        setRooms, setBathrooms, extras, toggleExtra,
        details, setDetails, calculateTotal
    } = useBookingStore();

    const total = calculateTotal();

    const renderStep = () => {
        switch (step) {
            case 1:
                return <StepScope />;
            case 2:
                return <StepExtras />;
            case 3:
                return <StepSchedule />;
            case 4:
                return <StepContact />;
            case 5:
                return <StepPayment />;
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-teal-600 dark:text-teal-400">Krok {step} z 5</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{steps[step - 1]}</span>
                </div>
                <Progress value={(step / 5) * 100} className="h-2 bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Main Content */}
            <div className="min-h-[500px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Sticky Bottom Summary (Mobile) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 md:hidden border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Suma szacunkowa</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{total} zł</p>
                    </div>
                    <Button onClick={nextStep} size="lg" className="px-8 rounded-full shadow-lg shadow-teal-200 dark:shadow-teal-900/20 bg-teal-600 hover:bg-teal-700 text-white">
                        {step === 5 ? "Zakończ" : "Dalej"} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Desktop Navigation Buttons */}
            <div className="hidden md:flex justify-between mt-12 items-center">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="rounded-full px-8 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                    <ArrowLeft className="mr-2 w-4 h-4" /> Wstecz
                </Button>

                <div className="text-right flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Suma szacunkowa</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{total} zł</p>
                    </div>
                    <Button onClick={nextStep} size="lg" className="rounded-full px-12 h-14 text-lg shadow-xl shadow-teal-100 dark:shadow-teal-900/20 bg-teal-600 hover:bg-teal-700 text-white transition-all hover:scale-105 active:scale-95">
                        {step === 5 ? "Potwierdź rezerwację" : "Kontynuuj"} <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

function StepScope() {
    const { scope, setPropertyType, setRooms, setBathrooms } = useBookingStore();

    const propertyTypes: { id: PropertyType; label: string; icon: any }[] = [
        { id: 'Apartament', label: 'Apartament', icon: Building2 },
        { id: 'Dom', label: 'Dom', icon: Home },
        { id: 'Biuro', label: 'Biuro', icon: Briefcase },
    ];

    return (
        <div className="space-y-12">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Powiedz nam o swoim miejscu</h2>
                <p className="text-slate-500 dark:text-slate-400">Wybierz typ nieruchomości i rozmiar, aby zacząć.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {propertyTypes.map((type) => (
                    <Card
                        key={type.id}
                        className={cn(
                            "relative cursor-pointer p-6 transition-all border-2 flex flex-col items-center gap-4 hover:border-teal-200 dark:hover:border-teal-800",
                            scope.propertyType === type.id
                                ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 shadow-inner"
                                : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
                        )}
                        onClick={() => setPropertyType(type.id)}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                            scope.propertyType === type.id ? "bg-teal-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                        )}>
                            <type.icon className="w-6 h-6" />
                        </div>
                        <span className="font-semibold text-lg dark:text-slate-200">{type.label}</span>
                        {scope.propertyType === type.id && (
                            <div className="absolute top-2 right-2 bg-teal-500 text-white rounded-full p-1">
                                <Check className="w-4 h-4" />
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            <div className="space-y-8 max-w-xl mx-auto md:mx-0">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-lg font-semibold flex items-center gap-2 dark:text-slate-200">
                            Liczba pokoi
                            <Badge variant="secondary" className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400">{scope.rooms}</Badge>
                        </label>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => setRooms(Math.max(1, scope.rooms - 1))} className="rounded-full w-10 h-10 border-slate-200 dark:border-slate-700">
                            <Minus className="w-4 h-4" />
                        </Button>
                        <Slider
                            value={[scope.rooms]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={(val) => setRooms(val[0])}
                            className="flex-1"
                        />
                        <Button variant="outline" size="icon" onClick={() => setRooms(Math.min(10, scope.rooms + 1))} className="rounded-full w-10 h-10 border-slate-200 dark:border-slate-700">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-lg font-semibold flex items-center gap-2 dark:text-slate-200">
                            Liczba łazienek
                            <Badge variant="secondary" className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400">{scope.bathrooms}</Badge>
                        </label>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => setBathrooms(Math.max(1, scope.bathrooms - 1))} className="rounded-full w-10 h-10 border-slate-200 dark:border-slate-700">
                            <Minus className="w-4 h-4" />
                        </Button>
                        <Slider
                            value={[scope.bathrooms]}
                            min={1}
                            max={6}
                            step={1}
                            onValueChange={(val) => setBathrooms(val[0])}
                            className="flex-1"
                        />
                        <Button variant="outline" size="icon" onClick={() => setBathrooms(Math.min(6, scope.bathrooms + 1))} className="rounded-full w-10 h-10 border-slate-200 dark:border-slate-700">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StepExtras() {
    const { extras, toggleExtra } = useBookingStore();

    return (
        <div className="space-y-8">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Usługi Dodatkowe</h2>
                <p className="text-slate-500 dark:text-slate-400">Wybierz dodatki, które chcesz uwzględnić w sprzątaniu.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {EXTRAS.map((extra) => (
                    <Card
                        key={extra.id}
                        className={cn(
                            "relative cursor-pointer p-6 transition-all border-2 flex flex-col items-start gap-4 hover:shadow-lg dark:hover:shadow-teal-900/10",
                            extras.includes(extra.id)
                                ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 ring-2 ring-teal-100 dark:ring-teal-900/30"
                                : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
                        )}
                        onClick={() => toggleExtra(extra.id)}
                    >
                        <div className="text-3xl">{extra.icon}</div>
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-800 dark:text-slate-100">{extra.name}</span>
                            <span className="text-sm font-medium text-teal-600 dark:text-teal-400">+{extra.price} zł</span>
                        </div>
                        {extras.includes(extra.id) && (
                            <div className="absolute top-4 right-4 bg-teal-500 text-white rounded-full p-1 shadow-lg">
                                <Check className="w-4 h-4" />
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}

function StepSchedule() {
    const { details, setDetails } = useBookingStore();
    const timeSlots = ["08:00", "10:00", "12:00", "14:00", "16:00"];

    return (
        <div className="space-y-8">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Kiedy mamy przyjechać?</h2>
                <p className="text-slate-500 dark:text-slate-400">Wybierz preferowaną datę i godzinę.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <Card className="p-4 border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900">
                    <Calendar
                        mode="single"
                        selected={details.date}
                        onSelect={(date) => setDetails({ date })}
                        className="w-full"
                        disabled={(date) => date < new Date()}
                        locale={pl}
                    />
                </Card>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2 dark:text-slate-100">
                        <Sparkles className="w-5 h-5 text-teal-500" /> Dostępne Godziny
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        {timeSlots.map((slot) => (
                            <Button
                                key={slot}
                                variant={details.timeSlot === slot ? "default" : "outline"}
                                className={cn(
                                    "justify-between h-14 rounded-2xl px-6 text-lg transition-all",
                                    details.timeSlot === slot
                                        ? "bg-teal-600 text-white shadow-lg shadow-teal-100 dark:shadow-teal-900/20"
                                        : "border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 dark:text-slate-300"
                                )}
                                onClick={() => setDetails({ timeSlot: slot })}
                            >
                                {slot}
                                {details.timeSlot === slot && <Check className="w-5 h-5" />}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StepContact() {
    const { details, setDetails } = useBookingStore();

    return (
        <div className="space-y-8 max-w-2xl mx-auto md:mx-0">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Dane Kontaktowe</h2>
                <p className="text-slate-500 dark:text-slate-400">Gdzie i jak możemy się z Tobą skontaktować?</p>
            </div>

            <div className="grid gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Adres Sprzątania</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            placeholder="np. ul. Luksusowa 123, Mieszkanie 4"
                            className="pl-12 h-14 rounded-2xl border-slate-200 dark:border-slate-700 focus:ring-teal-500/20 dark:bg-slate-900 dark:text-slate-100"
                            value={details.address}
                            onChange={(e) => setDetails({ address: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Adres E-mail</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder="twoj@email.pl"
                                className="pl-12 h-14 rounded-2xl border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                value={details.email}
                                onChange={(e) => setDetails({ email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Numer Telefonu</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder="+48 000 000 000"
                                className="pl-12 h-14 rounded-2xl border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                value={details.phone}
                                onChange={(e) => setDetails({ phone: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StepPayment() {
    return (
        <div className="space-y-8 max-w-2xl mx-auto md:mx-0">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Bezpieczna Płatność</h2>
                <p className="text-slate-500 dark:text-slate-400">Szybkie i bezpieczne przetwarzanie płatności.</p>
            </div>

            <div className="space-y-6">
                <div className="flex gap-4">
                    <Button variant="outline" className="flex-1 h-16 rounded-2xl border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-1 group dark:bg-slate-900">
                        <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Zapłać przez</span>
                        <span className="text-lg font-bold dark:text-slate-200">Apple Pay</span>
                    </Button>
                    <Button variant="outline" className="flex-1 h-16 rounded-2xl border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-1 group dark:bg-slate-900">
                        <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Zapłać przez</span>
                        <span className="text-lg font-bold dark:text-slate-200">Google Pay</span>
                    </Button>
                    <Button variant="outline" className="flex-1 h-16 rounded-2xl border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-1 group dark:bg-slate-900">
                        <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Zapłać przez</span>
                        <span className="text-lg font-bold dark:text-slate-200">BLIK</span>
                    </Button>
                </div>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-3 text-slate-500 font-bold">Lub użyj karty</span>
                    </div>
                </div>

                <Card className="p-8 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-6 rounded-[2rem]">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500 ml-1">Numer Karty</label>
                        <div className="relative">
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input placeholder="0000 0000 0000 0000" className="pl-12 h-14 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500 ml-1">Data Ważności</label>
                            <Input placeholder="MM/RR" className="h-14 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500 ml-1">Kod CVC</label>
                            <Input placeholder="123" className="h-14 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white" />
                        </div>
                    </div>
                </Card>

                <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/30 p-4 rounded-2xl flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-teal-800 dark:text-teal-300 leading-relaxed">
                        Twoja płatność jest zabezpieczona szyfrowaniem SSL. Opłata zostanie pobrana dopiero po wykonaniu usługi i Twoim zatwierdzeniu.
                    </p>
                </div>
            </div>
        </div>
    );
}
