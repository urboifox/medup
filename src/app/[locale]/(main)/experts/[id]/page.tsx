import { getAllExperts } from "@/features/experts/services";

export default async function ExpertPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <div>Expert {id}</div>;
}

export async function generateStaticParams() {
    const { data: experts } = await getAllExperts({ skipAuth: true, skipLocale: true });
    const staticParams = experts?.map((expert) => ({ id: expert.id.toString() }));
    return staticParams ?? [];
}
