import ActionsSection from "@/components/home/actions-section";
import ExpertsSection from "@/components/home/experts-section";
import ExploreSection from "@/components/home/explore-section";
import HeroSection from "@/components/home/hero-section";
import TestimonialsSection from "@/components/home/testimonials-section";

export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <ExpertsSection />
            {/* <CategoriesSection /> */}
            <ActionsSection />
            <ExploreSection />
            <TestimonialsSection />
        </main>
    );
}
