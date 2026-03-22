
import React, { createContext, useContext, useState } from 'react';

type UserRole = 'handlowiec' | 'prezes' | 'admin';

interface User {
    username: string;
    role: UserRole;
    fullName: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_DB: Record<string, { pass: string; role: UserRole; name: string }> = {
    'adamg': { pass: '123', role: 'handlowiec', name: 'Adam Garbowski' },
    'dariuszn': { pass: '123', role: 'handlowiec', name: 'Dariusz Nita' },
    'annag': { pass: '123', role: 'handlowiec', name: 'Anna Galor' },
    'annaa': { pass: '123', role: 'handlowiec', name: 'Anna Asztemborska' },
    'iwonab': { pass: '123', role: 'handlowiec', name: 'Iwona Baczewska' },
    'krzysztofb': { pass: '123', role: 'prezes', name: 'Krzysztof Bara' },
    'radoslawn': { pass: '123', role: 'prezes', name: 'Radosław Narwojsz' },
    'karolb': { pass: '123', role: 'admin', name: 'Karol Bohdanowicz' }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const savedUser = localStorage.getItem('prescot_user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            console.error("Auth initialization error", e);
            return null;
        }
    });

    // No longer need a separate effect and state for loading if we initialize synchronously
    const isLoading = false;

    const login = async (username: string, password: string): Promise<boolean> => {
        const dbUser = USERS_DB[username];
        if (dbUser && dbUser.pass === password) {
            const userData: User = {
                username,
                role: dbUser.role,
                fullName: dbUser.name
            };
            setUser(userData);
            localStorage.setItem('prescot_user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('prescot_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
