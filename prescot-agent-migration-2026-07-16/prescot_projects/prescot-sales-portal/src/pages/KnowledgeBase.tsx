import React, { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { KNOWLEDGE_QA } from '../data/mockData';
import { Search, MessageCircleQuestion, ChevronDown } from 'lucide-react';
import styles from './KnowledgeBase.module.css';

export const KnowledgeBase: React.FC = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Wszystkie');
    const [openedQA, setOpenedQA] = useState<number | null>(null);

    const categories = useMemo(() => {
        const cats = new Set(KNOWLEDGE_QA.map(qa => qa.category));
        return ['Wszystkie', ...Array.from(cats)];
    }, []);

    const filteredQA = useMemo(() => {
        return KNOWLEDGE_QA.filter(qa => {
            const matchesSearch = qa.question.toLowerCase().includes(search.toLowerCase()) ||
                qa.answer.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = activeCategory === 'Wszystkie' || qa.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [search, activeCategory]);

    const toggleQA = (idx: number) => {
        setOpenedQA(openedQA === idx ? null : idx);
    };

    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
                <div className={styles.auroraBg}></div>

                <header className={styles.header}>
                    <div>
                        <div className={styles.prestigeTag}>TACTICAL SALES INTELLIGENCE</div>
                        <h1 className={styles.title}>Wsparcie Rozmowy: Niezbędnik</h1>
                        <p className={styles.subtitle}>Merytoryka, psychologia i argumentacja techniczna do rozmów B2B</p>
                    </div>
                    <div className={styles.searchWrapper}>
                        <Search size={18} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Szukaj rozwiązań, strategii, plików..."
                            className={styles.searchInput}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </header>

                <nav className={styles.categoryFilters}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </nav>

                <section className={styles.qaGrid}>
                    {filteredQA.map((qa, idx) => (
                        <div
                            key={idx}
                            className={`${styles.qaCard} ${openedQA === idx ? styles.qaCardOpened : ''} glass`}
                        >
                            <div className={styles.qaHeader} onClick={() => toggleQA(idx)}>
                                <div className={styles.qaMeta}>
                                    <span className={styles.qaCategory}>{qa.category}</span>
                                    <h3 className={styles.question}>{qa.question}</h3>
                                </div>
                                <ChevronDown size={20} className={styles.chevronIcon} />
                            </div>
                            <div className={styles.answer}>
                                {qa.answer}
                            </div>
                        </div>
                    ))}
                    {filteredQA.length === 0 && (
                        <div className={styles.noResults}>
                            <MessageCircleQuestion size={56} />
                            <h2>Nie znaleźliśmy odpowiedzi</h2>
                            <p>Spróbuj zmienić kategorię lub skontaktuj się z product managerem poprzez CRM.</p>
                        </div>
                    )}
                </section>

            </main>
        </div>
    );
};
