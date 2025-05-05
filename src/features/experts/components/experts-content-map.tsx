import ExpertCard from "@/components/cards/expert-card";
import { getAllExperts } from "../services";
import { sanitizeObject } from "@/utils/sanitize-object";

export default async function ExpertsContentMap({
    searchParams
}: {
    searchParams: Record<string, string | undefined>;
}) {
    const { handle, countries, page, city, skills, colleges, specialities } = searchParams;

    const { data: experts } = await getAllExperts({
        params: sanitizeObject({
            handle,
            page,
            only_top: "1",
            city,
            skills,
            colleges,
            specialities,
            countries
        })
    });

    return experts?.map((expert) => {
        return <ExpertCard key={expert.id} expert={expert} />;
    });
}
