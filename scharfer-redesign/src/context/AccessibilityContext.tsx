'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  fontSizeMultiplier: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  isHighContrastLinks: boolean;
  toggleHighContrastLinks: () => void;
  isDyslexicFont: boolean;
  toggleDyslexicFont: () => void;
  isReading: boolean;
  readPage: () => void;
  stopReading: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [isHighContrastLinks, setIsHighContrastLinks] = useState(false);
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from local storage
    const savedTheme = localStorage.getItem('theme');
    const savedFontMultiplier = localStorage.getItem('fontSizeMultiplier');
    const savedLinks = localStorage.getItem('highContrastLinks');
    const savedDyslexic = localStorage.getItem('dyslexicFont');

    if (savedTheme === 'dark') setIsDarkMode(true);
    if (savedFontMultiplier) setFontSizeMultiplier(parseFloat(savedFontMultiplier));
    if (savedLinks === 'true') setIsHighContrastLinks(true);
    if (savedDyslexic === 'true') setIsDyslexicFont(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Apply theme
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }

    // Apply font size (using CSS variable and zoom for fixed px elements)
    document.documentElement.style.setProperty('--font-scale', fontSizeMultiplier.toString());
    document.documentElement.style.fontSize = `${Math.round(fontSizeMultiplier * 100)}%`;
    // Add zoom for Webkit/Blink browsers to catch fixed px elements
    (document.body.style as any).zoom = fontSizeMultiplier.toString();
    localStorage.setItem('fontSizeMultiplier', fontSizeMultiplier.toString());

    // Apply links contrast
    if (isHighContrastLinks) {
      document.body.classList.add('wcag-highlight-links');
      localStorage.setItem('highContrastLinks', 'true');
    } else {
      document.body.classList.remove('wcag-highlight-links');
      localStorage.setItem('highContrastLinks', 'false');
    }

    // Apply dyslexic font
    if (isDyslexicFont) {
      document.body.classList.add('wcag-dyslexic');
      localStorage.setItem('dyslexicFont', 'true');
    } else {
      document.body.classList.remove('wcag-dyslexic');
      localStorage.setItem('dyslexicFont', 'false');
    }

  }, [isDarkMode, fontSizeMultiplier, isHighContrastLinks, isDyslexicFont, mounted]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  
  const increaseFontSize = () => {
    setFontSizeMultiplier(prev => (prev < 1.6 ? prev + 0.2 : prev));
  };
  
  const decreaseFontSize = () => {
    setFontSizeMultiplier(prev => (prev > 1.0 ? prev - 0.2 : prev));
  };

  const toggleHighContrastLinks = () => setIsHighContrastLinks(prev => !prev);
  const toggleDyslexicFont = () => setIsDyslexicFont(prev => !prev);

  // Speech synthesis
  const readPage = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = document.body.innerText;
      const utterance = new SpeechSynthesisUtterance(text);
      // Pick Polish language if available
      const voices = window.speechSynthesis.getVoices();
      const plVoice = voices.find(v => v.lang.includes('pl'));
      if (plVoice) utterance.voice = plVoice;
      
      utterance.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  // Prevent hydration mismatch by not returning children until mounted if they depend on context? 
  // Actually, standard context provider can just wrap without blocking children, but SSR might differ.
  // We will just return the provider. The classes are added via useEffect anyway.
  
  return (
    <AccessibilityContext.Provider value={{
      isDarkMode, toggleDarkMode,
      fontSizeMultiplier, increaseFontSize, decreaseFontSize,
      isHighContrastLinks, toggleHighContrastLinks,
      isDyslexicFont, toggleDyslexicFont,
      isReading, readPage, stopReading
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
