import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, Lock, User as UserIcon, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import styles from './Login.module.css';

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const success = await login(username, password);
            if (success) {
                navigate('/');
            } else {
                setError('Błędny login lub hasło');
            }
        } catch {
            setError('Wystąpił błąd podczas logowania');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.blob}></div>
            <div className={styles.blob2}></div>

            <div className={styles.themeToggle}>
                <button
                    onClick={toggleTheme}
                    className={styles.toggleBtn}
                    title={theme === 'light' ? 'Przełącz na tryb nocny' : 'Przełącz na tryb dzienny'}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>

            <div className={`${styles.loginCard} glass led-glow`}>
                <div className={styles.logoArea}>
                    <img
                        src={theme === 'light' ? "/images/logo_day.svg" : "/images/logo_night.svg"}
                        alt="PRESCOT"
                        className={styles.logoImg}
                    />
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.inputGroup}>
                        <UserIcon className={styles.icon} size={20} />
                        <input
                            type="text"
                            placeholder="Użytkownik"
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <Lock className={styles.icon} size={20} />
                        <input
                            type="password"
                            placeholder="Hasło"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Logowanie...</span>
                            </>
                        ) : (
                            <span>Wejdź do Centrum</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
