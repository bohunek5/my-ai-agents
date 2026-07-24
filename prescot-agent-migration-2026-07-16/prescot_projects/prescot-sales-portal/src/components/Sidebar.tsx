
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    CalendarDays,
    LogOut,
    ShieldCheck,
    Zap,
    BarChartHorizontal,
    TrendingUp,
    Sun,
    Moon
} from 'lucide-react';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const isAdmin = user?.role === 'admin';
    const isPrezes = user?.role === 'prezes' || isAdmin;
    const isHandlowiec = user?.role === 'handlowiec' || isAdmin;

    interface MenuItem {
        icon: React.ReactNode;
        label: string;
        path: string;
        visible: boolean;
    }

    const menuItems: MenuItem[] = [
        {
            icon: <BarChartHorizontal size={20} />,
            label: 'Plan Tygodniowy',
            path: '/weekly-plan',
            visible: isPrezes
        },
        {
            icon: <TrendingUp size={20} />,
            label: 'Podsumowanie Tygodnia',
            path: '/weekly-summary',
            visible: isPrezes
        },
        {
            icon: <BarChartHorizontal size={20} />,
            label: 'Analizy i Raporty',
            path: '/analytics',
            visible: isPrezes
        },
        {
            icon: <LayoutDashboard size={20} />,
            label: 'Portal Operacyjny',
            path: '/',
            visible: isHandlowiec && !isPrezes // Only for pure reps, or keep for both? User said 'na starcie' prezesi mają mieć tygodniówkę.
        },
        {
            icon: <Users size={20} />,
            label: 'Baza Klientów',
            path: '/clients',
            visible: isPrezes
        },
        {
            icon: <Zap size={20} />,
            label: 'Stany Magazynowe',
            path: '/stock',
            visible: !isPrezes // User said prezesi don't need this
        },
        {
            icon: isPrezes ? <Zap size={20} /> : <BookOpen size={20} />,
            label: isPrezes ? 'Plan Poniedziałkowy' : 'Wsparcie Rozmowy',
            path: isPrezes ? '/strategy' : '/knowledge',
            visible: isHandlowiec || isPrezes
        },
        {
            icon: <CalendarDays size={20} />,
            label: 'Terminarz',
            path: '/schedule',
            visible: isHandlowiec
        },
    ];

    if (isAdmin) {
        menuItems.push({
            icon: <ShieldCheck size={20} />,
            label: 'Admin',
            path: '/admin',
            visible: true
        });
    }

    return (
        <aside className={`${styles.sidebar} glass`}>
            <div className={styles.top}>
                <div className={styles.logoContainer} onClick={() => navigate('/')}>
                    <img
                        src={theme === 'light' ? "/images/logo_day.svg" : "/images/logo_night.svg"}
                        alt="PRESCOT"
                        className={styles.logoImg}
                    />
                </div>

                <div className={styles.userBadge}>
                    <div className={styles.avatar}>
                        {user?.role === 'admin' ? <Zap size={20} /> : user?.fullName.charAt(0)}
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.name}>{user?.fullName}</div>
                        <div className={styles.roleBadge}>{user?.role}</div>
                    </div>
                </div>
            </div>

            <nav className={styles.nav}>
                {menuItems.filter(item => item.visible).map((item, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(item.path)}
                        className={`${styles.navItem} ${location.pathname === item.path ? styles.activeNav : ''}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className={styles.bottom}>
                <button className={styles.navItem} onClick={toggleTheme}>
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    <span>{theme === 'light' ? 'Tryb Nocny' : 'Tryb Dzienny'}</span>
                </button>
                <button className={`${styles.navItem} ${styles.logout}`} onClick={logout}>
                    <LogOut size={20} />
                    <span>Wyloguj</span>
                </button>
                <div className={styles.statusFooter}>
                    <div className={styles.pulse}></div>
                    <span>Monitorowanie Systemowe</span>
                </div>
            </div>
        </aside>
    );
};
