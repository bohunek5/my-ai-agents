import { GoogleGenAI } from "@google/genai";
import { FormData } from "../types";

// Konfiguracja dostawców
// Używamy klucza Google Gemini (AIzaSy...) wrzuconego do .env
const API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `
Jesteś ekspertem oświetlenia LED i fotografii architektury. Twoim zadaniem jest przekształcenie parametrów wejściowych użytkownika (w języku polskim) na JEDEN, spójny, wysoce szczegółowy prompt do generowania obrazów w języku ANGIELSKIM.

KRYTYCZNE ZASADY (STRICT RULES):
1. ABSOLUTNY ZAKAZ PUNKTÓW ŚWIETLNYCH: Nie generuj "downlights", "spotlights", żarówek.
2. TYLKO ŚWIATŁO LINIOWE: Całe oświetlenie musi pochodzić z ciągłych linii (linear profiles, LED strips).
3. JEDNOLITA LINIA: Światło musi być idealnie rozproszone.

Zwróć TYLKO treść promptu po angielsku. Bez wstępów.
`;

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Funkcja generująca prompt (Tekst)
export const generateDetailedPrompt = async (formData: FormData): Promise<string> => {
    const userContent = JSON.stringify(formData, null, 2);
    const fullPrompt = `${SYSTEM_INSTRUCTION}\n\nStwórz prompt na podstawie tych danych: ${userContent}`;

    // 1. GŁÓWNY SILNIK: Google Gemini (Darmowy/Stabilny)
    if (API_KEY && API_KEY.startsWith('AIza')) {
        try {
            const genAI = new GoogleGenAI(API_KEY);
            // Wykorzystujemy stabilny model Gemini 1.5 Flash dla tekstu
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text().trim();
            if (text) return text;
        } catch (e) {
            console.warn("Gemini Text API failed, using fallback.", e);
        }
    }

    // 2. FALLBACK: Pollinations.ai Text (FREE, NO KEY)
    try {
        const pollinationUrl = `https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}?model=openai&json=false`;
        const response = await fetch(pollinationUrl);
        if (response.ok) {
            const text = await response.text();
            return text.trim() || "Modern high-end luxury living room, cinematic architectural lighting, linear LED profiles, 8k photorealistic.";
        }
    } catch (e) {
        console.error("Pollinations text failed", e);
    }

    return "Modern architectural linear LED lighting, high-end photography, seamless light lines, cinematic atmosphere.";
};

// Funkcja generująca obraz
export const generateImageFromPrompt = async (
    prompt: string,
    aspectRatio: string,
    seed?: number
): Promise<string> => {

    // Ostateczny i darmowy silnik obrazów: Pollinations (Flux)
    // Upewniamy się, że używamy poprawnej subdomeny image.pollinations.ai
    // Jeśli image jest chwilowo down (1033), to wróci. Subdomena 'p' służy tylko do strony html.

    const width = aspectRatio === "16:9" ? 1280 : aspectRatio === "9:16" ? 720 : 1024;
    const height = aspectRatio === "16:9" ? 720 : aspectRatio === "9:16" ? 1280 : 1024;
    const randomSeed = seed || Math.floor(Math.random() * 999999);

    // Prompt wzmocniony o jakość i detale oświetlenia
    const enhancedPrompt = `${prompt}, architectural photography, professional lighting, photorealistic, premium interior design, linear led strips, seamless glow, highly detailed, 8k resolution`;

    // Używamy image.pollinations.ai (najbardziej stabilny endpoint dla <img> w 2025/2026)
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=${width}&height=${height}&seed=${randomSeed}&model=flux&nologo=true`;
};
