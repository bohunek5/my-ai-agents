import { heroContent } from "@/data/hero-content";
import { HeroEditor } from "./HeroEditor";

export default function AdminHeroPage() {
    return <HeroEditor initialHero={heroContent} />;
}
