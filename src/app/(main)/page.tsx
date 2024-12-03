import ActionsSection from "@/components/home/actions-section";
import CategoriesSection from "@/components/home/categories-section";
import ExpertsSection from "@/components/home/experts-section";
import HeroSection from "@/components/home/hero-section";

export default function Home() {
    return (
        <div>
            <HeroSection />
            <ExpertsSection />
            <CategoriesSection />
            <ActionsSection />
        </div>
    );
}
