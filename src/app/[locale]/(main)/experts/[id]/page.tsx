export default async function ExpertPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <div>Expert {id}</div>;
}

export async function generateStaticParams() {
    return [{ id: "1" }];
}
