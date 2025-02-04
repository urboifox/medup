import ExpertsPageContent from "@/features/experts/components/experts-page.content";
import ExpertsSearchHeader from "@/features/experts/components/experts-search-header";

export default async function ExpertsPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const searchParamsData = await searchParams;

    return (
        <div className="min-h-screen container py-10 flex flex-col gap-10">
            <ExpertsSearchHeader />
            <ExpertsPageContent searchParams={searchParamsData} />
        </div>
    );
}
