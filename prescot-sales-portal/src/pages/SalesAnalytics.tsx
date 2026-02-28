import React, { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import styles from './SalesAnalytics.module.css';

// Using JSON directly might be heavy depending on bundler, but it's okay for 10MB in Vite.
import rawData from '../data/sales_data_parsed.json';

import { BarChartHorizontal, Search, TrendingUp, Users } from 'lucide-react';

interface Sale {
    year: string | null;
    quarter: string | null;
    rep: string | null;
    company: string | null;
    product: string;
    sku: string;
    quantity: number;
    price: number;
    value: number;
}

export const SalesAnalytics: React.FC = () => {
    const data = rawData as Sale[];

    const [selectedQuarter, setSelectedQuarter] = useState<string>('Wszystkie');
    const [selectedYear, setSelectedYear] = useState<string>('Wszystkie');
    const [selectedRep, setSelectedRep] = useState<string>('Wszyscy');
    const [searchClient, setSearchClient] = useState<string>('');
    const deferredSearch = React.useDeferredValue(searchClient);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Sale; direction: 'asc' | 'desc' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 80;

    // Derived filters for selects
    const quarters = useMemo(() => Array.from(new Set(data.map(d => d.quarter).filter(Boolean))), [data]);
    const years = useMemo(() => Array.from(new Set(data.map(d => d.year).filter(Boolean))), [data]);
    const reps = useMemo(() => Array.from(new Set(data.map(d => d.rep).filter(Boolean))), [data]);

    // Apply filters using deferredSearch for high performance
    const filteredData = useMemo(() => {
        const q = deferredSearch.toLowerCase();
        return data.filter(item => {
            const matchYear = selectedYear === 'Wszystkie' || item.year === selectedYear;
            const matchQuarter = selectedQuarter === 'Wszystkie' || item.quarter === selectedQuarter;
            const matchRep = selectedRep === 'Wszyscy' || item.rep === selectedRep;

            const matchSearch = q === '' ||
                (item.company && item.company.toLowerCase().includes(q)) ||
                (item.product && item.product.toLowerCase().includes(q)) ||
                (item.sku && item.sku.toLowerCase().includes(q));

            return matchYear && matchQuarter && matchRep && matchSearch;
        });
    }, [data, selectedQuarter, selectedYear, selectedRep, deferredSearch]);

    const sortedData = useMemo(() => {
        if (!sortConfig) return filteredData;
        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue === bValue) return 0;
            if (aValue === null) return 1;
            if (bValue === null) return -1;

            let comparison = 0;
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                comparison = aValue - bValue;
            } else {
                comparison = String(aValue).localeCompare(String(bValue), 'pl', { numeric: true });
            }

            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });
    }, [filteredData, sortConfig]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(start, start + itemsPerPage);
    }, [sortedData, currentPage]);

    const totalQuantity = useMemo(() => filteredData.reduce((sum, item) => sum + item.quantity, 0), [filteredData]);
    const totalValue = useMemo(() => filteredData.reduce((sum, item) => sum + (item.value || 0), 0), [filteredData]);

    const requestSort = (key: keyof Sale) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setCurrentPage(1);
    };

    const getSortIndicator = (key: keyof Sale) => {
        if (!sortConfig || sortConfig.key !== key) return ' ↕';
        return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    };

    const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        setter(value);
        setCurrentPage(1); // reset to first page on filter change
    };

    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Analiza Sprzedaży</h1>
                        <p className={styles.subtitle}>Zaawansowany portal analityczny (Widok Prezesa)</p>
                    </div>

                    <div className={styles.searchBar}>
                        <Search className={styles.searchIcon} size={18} />
                        <input
                            type="text"
                            placeholder="Szukaj klienta, produktu lub SKU..."
                            value={searchClient}
                            onChange={(e) => setSearchClient(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                </header>

                <section className={styles.overview}>
                    <div className={`${styles.statsCard} glass`}>
                        <div className={styles.statsIcon}><BarChartHorizontal size={24} /></div>
                        <div className={styles.statsInfo}>
                            <span className={styles.statsLabel}>Zarejestrowane Pozycje</span>
                            <span className={styles.statsValue}>{filteredData.length.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className={`${styles.statsCard} glass accent`}>
                        <div className={styles.statsIconBlue}><Users size={24} /></div>
                        <div className={styles.statsInfo}>
                            <span className={styles.statsLabel}>Suma Łączna Sprzedaży</span>
                            <span className={styles.statsValue}>{totalQuantity.toLocaleString(undefined, { maximumFractionDigits: 1 })} szt.</span>
                        </div>
                    </div>
                    <div className={`${styles.statsCard} glass`}>
                        <div className={`${styles.statsIcon} ${styles.statsIconAmber}`}><TrendingUp size={24} /></div>
                        <div className={styles.statsInfo}>
                            <span className={styles.statsLabel}>Wartość Sprzedaży</span>
                            <span className={styles.statsValue}>{Math.round(totalValue).toLocaleString()} PLN</span>
                        </div>
                    </div>
                </section>

                <div className={`${styles.contentWrapper} glass`}>
                    <div className={styles.filtersBar}>
                        <div className={styles.filterGroup}>
                            <label>Rok Rozliczeniowy</label>
                            <select title="Rok" className={`${styles.select} glass`} value={selectedYear} onChange={(e) => handleFilterChange(setSelectedYear, e.target.value)}>
                                <option value="Wszystkie">Wszystkie Lata</option>
                                {years.map((y, i) => <option key={i} value={y!}>{y}</option>)}
                            </select>
                        </div>

                        <div className={styles.filterGroup}>
                            <label>Kwartał</label>
                            <select title="Kwartał" className={`${styles.select} glass`} value={selectedQuarter} onChange={(e) => handleFilterChange(setSelectedQuarter, e.target.value)}>
                                <option value="Wszystkie">Wszystkie Kwartały</option>
                                {quarters.map((q, i) => <option key={i} value={q!}>{q}</option>)}
                            </select>
                        </div>

                        <div className={styles.filterGroup}>
                            <label>Opiekun Klienta</label>
                            <select title="Przedstawiciel" className={`${styles.select} glass`} value={selectedRep} onChange={(e) => handleFilterChange(setSelectedRep, e.target.value)}>
                                <option value="Wszyscy">Wszyscy Handlowcy</option>
                                {reps.map((r, i) => <option key={i} value={r!}>{r}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th onClick={() => requestSort('year')} className={styles.sortableHeader}>Data / Okres {getSortIndicator('year')}</th>
                                    <th onClick={() => requestSort('rep')} className={styles.sortableHeader}>Przedstawiciel {getSortIndicator('rep')}</th>
                                    <th onClick={() => requestSort('company')} className={styles.sortableHeader}>Firma (Klient) {getSortIndicator('company')}</th>
                                    <th onClick={() => requestSort('product')} className={styles.sortableHeader}>Model Produktu {getSortIndicator('product')}</th>
                                    <th onClick={() => requestSort('sku')} className={styles.sortableHeader}>SKU / Kod {getSortIndicator('sku')}</th>
                                    <th onClick={() => requestSort('quantity')} className={styles.sortableHeader}>Ilość {getSortIndicator('quantity')}</th>
                                    <th onClick={() => requestSort('price' as any)} className={styles.sortableHeader}>Cena {getSortIndicator('price' as any)}</th>
                                    <th onClick={() => requestSort('value' as any)} className={styles.sortableHeader}>Wartość {getSortIndicator('value' as any)}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((row, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div className={styles.valColor}>{row.quarter || '-'}</div>
                                            <div className={styles.valSubColor}>{row.year || '-'}</div>
                                        </td>
                                        <td>
                                            <div className={styles.repName}>{row.rep || '-'}</div>
                                        </td>
                                        <td>{row.company || '-'}</td>
                                        <td>{row.product}</td>
                                        <td className={styles.valSubColor}>{row.sku || '-'}</td>
                                        <td className={`${styles.valColor} ${styles.qtyValue}`}>{row.quantity}</td>
                                        <td className={styles.valColor}>{row.price ? `${row.price.toFixed(2)} PLN` : '-'}</td>
                                        <td className={`${styles.valColor} ${styles.qtyValue}`}>{row.value ? `${row.value.toLocaleString()} PLN` : '-'}</td>
                                    </tr>
                                ))}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className={styles.noDataCell}>
                                            Brak wyników sprzedażowych dla podanego filtrowania.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.pagination}>
                        <span className={styles.pageInfo}>
                            Wyświetlanie {paginatedData.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredData.length)} z {filteredData.length} rekordów (Strona {currentPage} z {totalPages || 1})
                        </span>
                        <div className={styles.pageControls}>
                            <button
                                className={styles.pageBtn}
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(c => c - 1)}
                            >
                                Poprzednie rekordy
                            </button>
                            <button
                                className={styles.pageBtn}
                                disabled={currentPage === totalPages || totalPages === 0}
                                onClick={() => setCurrentPage(c => c + 1)}
                            >
                                Pobierz następne
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
