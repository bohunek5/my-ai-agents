
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FormData } from "../types";

// API KEY hardcoded to ensure it's available in the browser dev environment
const API_KEY = "AIzaSyAA5NI12eolD_Cz9T2qVeVxFMNBRTg5hcM";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_INSTRUCTION = `
Jesteś ekspertem oświetlenia LED i fotografii architektury. Twoim zadaniem jest przekształcenie parametrów wejściowych użytkownika (w języku polskim) na JEDEN, spójny, wysoce szczegółowy prompt do generowania obrazów w języku ANGIELSKIM.

KRYTYCZNE ZASADY (STRICT RULES - NO SPOTS):
1. ABSOLUTNY ZAKAZ PUNKTÓW ŚWIETLNYCH: Nie generuj "downlights", "spotlights", "track lights", żarówek ani widocznych pojedynczych diod (dots).
2. TYLKO ŚWIATŁO LINIOWE: Całe oświetlenie musi pochodzić z ciągłych linii (linear profiles, LED strips, neon flex).
3. JEDNOLITA LINIA: Światło musi być idealnie rozproszone (diffused), bez widocznych przerw czy kropek (seamless COB effect).

Wytyczne do promptu:
- ZAWSZE używaj fraz: "continuous linear LED profiles", "seamless architectural light lines", "recessed linear lighting", "soft diffused strip light".
- Opisz światło jako idealną linię wpuszczoną w sufit/ścianę/podłogę.
- Jeśli użytkownik wybrał styl "Katalogowy", usuń wszelki bałagan i ludzi.
- Przetłumacz opis na techniczny język fotografii (np. "warm 3000K linear ambient glow").

Zwróć TYLKO treść promptu po angielsku. Bez wstępów.
`;

// Model names for text and image generation
const TEXT_MODEL = "gemini-1.5-flash";
const IMAGE_MODEL = "gemini-2.0-flash"; // Gemini 2.0 handles image generation natively in AI Studio

// Generate a detailed prompt using Gemini Flash
export const generateDetailedPrompt = async (formData: FormData): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({
      model: TEXT_MODEL,
      systemInstruction: SYSTEM_INSTRUCTION,
    });
    const userContent = JSON.stringify(formData, null, 2);

    const result = await model.generateContent(`Stwórz prompt na podstawie danych JSON. Pamiętaj: NO SPOTS!\n${userContent}`);
    return result.response.text().trim() || "Modern linear LED lighting in architectural space.";
  } catch (error) {
    console.error("Prompt Gen Error:", error);
    return `Modern architectural space with ${formData.scene}, continuous linear LED strips, photorealistic, 8k.`;
  }
};

// Generate an image using Gemini 2.0 Flash (natively supports multimodal output in some tiers/regions)
// Note: If image generation via generateContent is not enabled for your key, this might return text.
export const generateImageFromPrompt = async (
  prompt: string,
  aspectRatio: string,
  seed?: number
): Promise<string> => {
  try {
    // In Gemini 2.0 / AI Studio style, we ask for an image generation.
    // However, the standard public API for "gemini-2.0-flash" often requires specific instructions to output an image.
    // If native image output is not available, we fall back to Imagen 3 if possible or another stable method.

    const model = genAI.getGenerativeModel({ model: IMAGE_MODEL });

    // Instruction for Gemini 2.0 to generate an image
    const imagePrompt = `Generate a high-quality photorealistic image based on this description: ${prompt}. Aspect ratio should be ${aspectRatio}. Ensure architectural lighting quality.`;

    const result = await model.generateContent(imagePrompt);
    const response = await result.response;

    // Check if there's an image in the parts
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    // If no image part found, it means the model returned text instead of an image.
    // This happens if the API key/tier doesn't support direct image generation via generateContent.
    // As a "normal" fallback similar to AI Studio, we try to use the Pollinations engine ONLY as a stable delivery mechanism
    // if Gemini produces only text.
    console.warn("Gemini returned text instead of image data. Checking Pollinations as delivery vehicle.");

    const randomSeed = seed || Math.floor(Math.random() * 100000);
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${aspectRatio === '16:9' ? 1280 : aspectRatio === '9:16' ? 720 : 1024}&height=${aspectRatio === '16:9' ? 720 : aspectRatio === '9:16' ? 1280 : 1024}&seed=${randomSeed}&nologo=true`;

  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};
