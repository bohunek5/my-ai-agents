"use client";

import { useState, useEffect, useRef } from "react";
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog, Navigation } from "lucide-react";

type DailyForecast = {
  time: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
};

type WeatherData = {
  temperature: number;
  weatherCode: number;
  windDirection: number;
  windSpeed: number;
  forecast: DailyForecast[];
};

// Map WMO weather codes to icons
const getWeatherIcon = (code: number, size = 18) => {
  if (code === 0) return <Sun size={size} className="text-yellow-500" />;
  if (code >= 1 && code <= 3) return <Cloud size={size} className="text-gray-400" />;
  if (code >= 45 && code <= 48) return <CloudFog size={size} className="text-gray-400" />;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain size={size} className="text-blue-400" />;
  if (code >= 71 && code <= 77) return <Snowflake size={size} className="text-blue-200" />;
  if (code >= 95 && code <= 99) return <CloudLightning size={size} className="text-yellow-600" />;
  return <Sun size={size} className="text-yellow-500" />;
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=54.215&longitude=21.737&current=temperature_2m,weather_code,wind_direction_10m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FWarsaw&forecast_days=3");
        if (!res.ok) return;
        const data = await res.json();
        
        const forecast = data.daily.time.slice(0, 3).map((timeStr: string, idx: number) => ({
          time: timeStr,
          weatherCode: data.daily.weather_code[idx],
          tempMax: Math.round(data.daily.temperature_2m_max[idx]),
          tempMin: Math.round(data.daily.temperature_2m_min[idx]),
        }));

        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
          windDirection: data.current.wind_direction_10m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          forecast
        });
      } catch (err) {
        console.error("Failed to fetch weather", err);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Dziś";
    if (date.toDateString() === tomorrow.toDateString()) return "Jutro";
    
    return date.toLocaleDateString('pl-PL', { weekday: 'long' });
  };

  if (!weather) {
    return (
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg animate-pulse">
        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="relative" ref={widgetRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/50 dark:bg-blue-900/20 border ${isOpen ? 'border-blue-400 dark:border-blue-500' : 'border-blue-100 dark:border-blue-800/30'} rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm transition-all hover:bg-blue-50 dark:hover:bg-slate-800 hover:scale-105`}
        title="Aktualna pogoda w Węgorzewie (Kliknij po więcej)"
      >
        <span className="text-[10px] uppercase tracking-wider text-black dark:text-white font-black mr-1 hidden lg:inline">Węgorzewo</span>
        {getWeatherIcon(weather.weatherCode)}
        <span>{weather.temperature}°C</span>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 ml-1">
           <Navigation size={12} style={{ transform: `rotate(${weather.windDirection + 180}deg)` }} className="mr-1 text-blue-500" />
           <span>{weather.windSpeed} km/h</span>
        </div>
      </button>

      {/* Forecast Popup */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-3 flex items-center gap-1 border-b border-gray-100 dark:border-slate-700 pb-2">
            <Sun size={12} /> Prognoza (Węgorzewo)
          </h4>
          <div className="space-y-3">
            {weather.forecast.map((day, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-20 capitalize">{getDayName(day.time)}</span>
                <div className="flex items-center gap-3">
                  {getWeatherIcon(day.weatherCode, 20)}
                  <div className="flex items-center justify-end gap-2 w-16 text-sm">
                    <span className="font-bold text-gray-800 dark:text-gray-100">{day.tempMax}°</span>
                    <span className="text-gray-400 dark:text-gray-500">{day.tempMin}°</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
