import FuledaDetailClient from "./FuledaDetailClient";

export async function generateStaticParams() {
    return [
        { id: 'parter' },
        { id: 'pietro' }
    ];
}

export default async function FuledaDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return <FuledaDetailClient id={id as 'parter' | 'pietro'} />;
}
