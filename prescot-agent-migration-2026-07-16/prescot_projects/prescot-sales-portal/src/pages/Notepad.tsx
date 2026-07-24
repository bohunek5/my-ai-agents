
import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ChevronLeft, ChevronRight, Edit3, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Notepad.module.css';

export const Notepad: React.FC = () => {
    const { user } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [notes, setNotes] = useState<Record<string, string[]>>(() => {
        const saved = localStorage.getItem(`prescot_personal_notebank_${user?.username}`);
        return saved ? JSON.parse(saved) : {};
    });
    const [activeDay, setActiveDay] = useState(new Date().getDate());

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const monthName = currentDate.toLocaleString('pl-PL', { month: 'long', year: 'numeric' });

    const getDayKey = (day: number) => `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;

    const [newNote, setNewNote] = useState('');

    const addNote = () => {
        if (!newNote.trim()) return;
        const key = getDayKey(activeDay);
        const currentNotes = notes[key] || [];
        const updated = { ...notes, [key]: [...currentNotes, newNote.trim()] };
        setNotes(updated);
        localStorage.setItem(`prescot_personal_notebank_${user?.username}`, JSON.stringify(updated));
        setNewNote('');
    };

    const deleteNote = (day: number, index: number) => {
        const key = getDayKey(day);
        const updatedNotes = [...(notes[key] || [])];
        updatedNotes.splice(index, 1);
        const updated = { ...notes, [key]: updatedNotes };
        setNotes(updated);
        localStorage.setItem(`prescot_personal_notebank_${user?.username}`, JSON.stringify(updated));
    };

    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Twój Terminarz</h1>
                        <p className={styles.subtitle}>Osobisty notatnik i kalendarz handlowca</p>
                    </div>
                </header>

                <div className={styles.container}>
                    <div className={`${styles.calendarCard} glass`}>
                        <div className={styles.calendarHeader}>
                            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} title="Poprzedni miesiąc">
                                <ChevronLeft size={20} />
                            </button>
                            <h2>{monthName}</h2>
                            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} title="Następny miesiąc">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div className={styles.calendarGrid}>
                            {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'].map(d => (
                                <div key={d} className={styles.weekday}>{d}</div>
                            ))}
                            {Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }).map((_, i) => (
                                <div key={`empty-${i}`} className={styles.emptyDay}></div>
                            ))}
                            {Array.from({ length: daysInMonth(currentDate.getFullYear(), currentDate.getMonth()) }).map((_, i) => {
                                const day = i + 1;
                                const key = getDayKey(day);
                                const hasNotes = notes[key]?.length > 0;
                                return (
                                    <div
                                        key={day}
                                        className={`${styles.day} ${activeDay === day ? styles.activeDay : ''} ${hasNotes ? styles.hasNotes : ''}`}
                                        onClick={() => setActiveDay(day)}
                                        title={`Zobacz notatki na dzień ${day}`}
                                    >
                                        {day}
                                        {hasNotes && <div className={styles.noteDot}></div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={`${styles.notesCard} glass`}>
                        <div className={styles.notesHeader}>
                            <h3>Notatki: {activeDay} {monthName}</h3>
                        </div>

                        <div className={styles.addNoteForm}>
                            <textarea
                                placeholder="Wpisz nową notatkę..."
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                className={styles.noteTextArea}
                            />
                            <button className={styles.addNoteSubmit} onClick={addNote} title="Dodaj notatkę">
                                <Plus size={16} /> Dodaj Notatkę
                            </button>
                        </div>

                        <div className={styles.notesList}>
                            {notes[getDayKey(activeDay)]?.length > 0 ? (
                                notes[getDayKey(activeDay)].map((note, idx) => (
                                    <div key={idx} className={styles.noteItem}>
                                        <p>{note}</p>
                                        <button onClick={() => deleteNote(activeDay, idx)} className={styles.deleteBtn} title="Usuń notatkę"><Trash2 size={14} /></button>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noNotes}>
                                    <Edit3 size={32} />
                                    <p>Brak notatek na ten dzień.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
