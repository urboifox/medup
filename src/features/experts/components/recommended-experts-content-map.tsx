import ExpertCard from "@/components/cards/expert-card";
import { getAllExperts } from "../services";

export default async function RecommendedExpertsContentMap() {
    const res = await getAllExperts({
        params: { only_top: "1" },
    });
    const experts = res.data;

    return experts?.map((expert) => {
        return <ExpertCard key={expert.id} expert={expert} />;
    });
}
