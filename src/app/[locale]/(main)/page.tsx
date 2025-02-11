import ActionsSection from "@/components/home/actions-section";
import AdSection from "@/components/home/ad-section";
import CollegesSection from "@/components/home/colleges-section";
import ExpertsSection from "@/components/home/experts-section";
import ExploreSection from "@/components/home/explore-section";
import HeroSection from "@/components/home/hero-section";
import TestimonialsSection from "@/components/home/testimonials-section";

export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <AdSection />
            <ExpertsSection />
            <CollegesSection />
            <ActionsSection />
            <ExploreSection />
            <TestimonialsSection />
        </main>
    );
}
