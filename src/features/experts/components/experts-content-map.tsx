import ExpertCard from "@/components/cards/expert-card";
import { getAllExperts } from "../services";

export default async function ExpertsContentMap() {
    const res = await getAllExperts({
        params: { only_top: "0" }
    });
    const experts = res.data;

    return experts?.map((expert) => {
        return <ExpertCard key={expert.id} expert={expert} />;
    });
}
