import { getColleges } from "@/features/home/services";
import HomeCollegeCard from "../cards/home-college-card";

export default async function CollegesSectionGrid() {
    const res = await getColleges();
    const colleges = res.data;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-10">
            {colleges &&
                colleges.map((college) => {
                    return <HomeCollegeCard key={college.id} college={college} />;
                })}
        </div>
    );
}
