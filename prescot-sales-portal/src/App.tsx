
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/Clients';
import { WeeklyPlan } from './pages/WeeklyPlan';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { MondayStrategy } from './pages/MondayStrategy';
import { Notepad } from './pages/Notepad';

import { SalesAnalytics } from './pages/SalesAnalytics';
import { SalesStock } from './pages/SalesStock';
import { TestLeadDetail } from './pages/TestLeadDetail';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="loading-screen">Ładowanie...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <SalesAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock"
              element={
                <ProtectedRoute>
                  <SalesStock />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clients"
              element={
                <ProtectedRoute>
                  <Clients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/weekly-plan"
              element={
                <ProtectedRoute>
                  <WeeklyPlan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/knowledge"
              element={
                <ProtectedRoute>
                  <KnowledgeBase />
                </ProtectedRoute>
              }
            />
            <Route
              path="/strategy"
              element={
                <ProtectedRoute>
                  <MondayStrategy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notepad"
              element={
                <ProtectedRoute>
                  <Notepad />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test-lead"
              element={
                <ProtectedRoute>
                  <TestLeadDetail />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
