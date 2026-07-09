import React from 'react';

interface ThemeLogoProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ThemeLogo({ lightSrc, darkSrc, alt, className = '', style }: ThemeLogoProps) {
  return (
    <>
      <img src={lightSrc} alt={alt} className={`logo-light-variant ${className}`} style={style} />
      <img src={darkSrc} alt={alt} className={`logo-dark-variant ${className}`} style={style} />
    </>
  );
}
