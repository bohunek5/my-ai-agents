"use client";

import { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Wind, Loader2 } from 'lucide-react';
import styles from './WeatherWidget.module.scss';
import { useTranslations } from 'next-intl';

interface WeatherData {
  temp: number;
  conditionCode: number;
  windSpeed: number;
  windDir: number;
}

export default function WeatherWidget() {
  const t = useTranslations('Weather');
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    
    // Fetch live weather data for Giżycko from Open-Meteo
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=54.0381&longitude=21.7661&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code');
        const json = await res.json();
        
        if (json.current) {
          setData({
            temp: Math.round(json.current.temperature_2m),
            conditionCode: json.current.weather_code,
            windSpeed: Math.round(json.current.wind_speed_10m),
            windDir: json.current.wind_direction_10m
          });
        }
      } catch (err) {
        console.error("Failed to fetch weather", err);
      }
    };
    
    fetchWeather();
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const getConditionText = (code: number) => {
    if (code === 0 || code === 1) return t('sunny');
    if (code >= 51 && code <= 99) return t('rain');
    return t('cloudy');
  };

  const getConditionIcon = (code: number) => {
    if (code === 0 || code === 1) return <Sun className={styles.iconSun} size={24} />;
    if (code >= 51 && code <= 99) return <CloudRain className={styles.iconRain} size={24} />;
    return <Cloud className={styles.iconCloud} size={24} />;
  };

  if (!data) {
    return (
      <div className={styles.widget}>
        <Loader2 className={styles.spinner} size={20} />
      </div>
    );
  }

  // Animation speed based on wind speed (e.g., faster if > 20km/h)
  const isHighWind = data.windSpeed > 20;

  return (
    <div className={styles.widget}>
      <div className={styles.iconContainer}>
        {getConditionIcon(data.conditionCode)}
      </div>
      <div className={styles.info}>
        <span className={styles.temp}>{data.temp}°C</span>
      </div>
      
      <div className={styles.windContainer}>
        <Wind 
          className={`${styles.windIcon} ${isHighWind ? styles.fastSpin : styles.slowSpin}`} 
          size={18} 
        />
        <div className={styles.windInfo}>
          <span className={styles.windSpeed}>{data.windSpeed} km/h</span>
        </div>
        <div 
          className={styles.windDirection} 
          style={{ transform: `rotate(${data.windDir}deg)` }}
          title={`Kierunek wiatru: ${data.windDir}°`}
        >
          ↑
        </div>
      </div>
    </div>
  );
}
