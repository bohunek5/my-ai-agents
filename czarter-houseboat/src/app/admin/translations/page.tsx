import { translations } from "@/lib/translations";
import { TranslationsEditor } from "./TranslationsEditor";

export default function AdminTranslationsPage() {
    return <TranslationsEditor initialTranslations={translations as Record<string, unknown>} />;
}
