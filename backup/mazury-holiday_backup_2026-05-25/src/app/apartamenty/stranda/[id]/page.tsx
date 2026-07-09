import ApartmentDetailClient from "./ApartmentDetailClient";
// import { readApartmentMarkdown } from "@/utils/apartmentMarkdownParser"; // Removed usage

// Define known keys to generate static params
const buildings = {
    A: ["A103", "A104", "A105", "A204", "A205", "A302", "A305", "A306", "A402", "A403"],
    B: ["B102", "B106", "B201", "B202", "B304", "B305", "B401", "B402", "B404"],
    C: ["C301", "C304", "C403", "C404"],
};

export async function generateStaticParams() {
    const allIds = [
        ...buildings.A,
        ...buildings.B,
        ...buildings.C,
    ];
    return allIds.map((id) => ({
        id: id,
    }));
}

export default async function ApartmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Try to load Markdown data first - DISABLED
    // const apartmentData = readApartmentMarkdown(id);

    return <ApartmentDetailClient id={id} />;
}
