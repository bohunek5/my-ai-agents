
import React, { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import styles from './SalesAnalytics.module.css'; // Reusing analytics styles
import stockData from '../data/stock_data.json';
import { Package, Search, BarChart3 } from 'lucide-react';

interface StockItem {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    stock_pieces: number;
    unit: string;
    total_value: number;
}

export const SalesStock: React.FC = () => {
    const data = stockData as StockItem[];
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Wszystkie');

    const categories = useMemo(() => Array.from(new Set(data.map(d => d.category))), [data]);

    const filteredData = useMemo(() => {
        const q = search.toLowerCase();
        return data.filter(item => {
            const matchCategory = selectedCategory === 'Wszystkie' || item.category === selectedCategory;
            const matchSearch = q === '' ||
                item.name.toLowerCase().includes(q) ||
                item.id.toLowerCase().includes(q);
            return matchCategory && matchSearch;
        });
    }, [data, selectedCategory, search]);

    const stats = useMemo(() => {
        const totalValue = filteredData.reduce((sum, item) => sum + item.total_value, 0);
        const totalQty = filteredData.reduce((sum, item) => sum + item.stock, 0);
        return { totalValue, totalQty };
    }, [filteredData]);

    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Stany Magazynowe</h1>
                        <p className={styles.subtitle}>Aktualne ilości i wartości asortymentu (Chmura XML)</p>
                    </div>
                    <div className={styles.searchBar}>
                        <Search className={styles.searchIcon} size={18} />
                        <input
                            type="text"
                            placeholder="Szukaj produktu lub ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </header>

                <section className={styles.overview}>
                    <div className={`${styles.statsCard} glass`}>
                        <div className={styles.statsIcon}><Package size={24} /></div>
                        <div className={styles.statsInfo}>
                            <span className={styles.statsLabel}>Wartość Magazynu</span>
                            <span className={styles.statsValue}>{stats.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} PLN</span>
                        </div>
                    </div>
                    <div className={`${styles.statsCard} glass accent`}>
                        <div className={styles.statsIconBlue}><BarChart3 size={24} /></div>
                        <div className={styles.statsInfo}>
                            <span className={styles.statsLabel}>Suma Metrów/Sztuk</span>
                            <span className={styles.statsValue}>{stats.totalQty.toLocaleString()} j.m.</span>
                        </div>
                    </div>
                </section>

                <div className={`${styles.contentWrapper} glass`}>
                    <div className={styles.filtersBar}>
                        <div className={styles.filterGroup}>
                            <label>Kategoria</label>
                            <select title="Kategoria" className={`${styles.select} glass`} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="Wszystkie">Wszystkie Kategorie</option>
                                {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Produkt</th>
                                    <th>Kategoria</th>
                                    <th>Cena netto</th>
                                    <th>Ilość (j.m.)</th>
                                    <th>Ilość (rolki/szt)</th>
                                    <th>Wartość</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((row, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div className={styles.valColor}>{row.name}</div>
                                            <div className={styles.valSubColor}>SKU/KOD: {row.id}</div>
                                        </td>
                                        <td className={styles.valSubColor}>{row.category.split('/').pop()}</td>
                                        <td>{row.price.toFixed(2)} PLN</td>
                                        <td>
                                            <div className={styles.valColor}>{row.stock.toLocaleString()} {row.unit.split(' ')[0]}</div>
                                        </td>
                                        <td>
                                            {row.stock_pieces !== row.stock ? (
                                                <div className={styles.valColor}>{row.stock_pieces.toFixed(1)} szt.</div>
                                            ) : '-'}
                                        </td>
                                        <td className={styles.valColor}>{row.total_value.toLocaleString(undefined, { maximumFractionDigits: 2 })} PLN</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};
