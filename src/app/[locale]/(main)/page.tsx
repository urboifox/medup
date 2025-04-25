import ActionsSection from "@/components/home/actions-section";
import AdSection from "@/components/home/ad-section";
import CollegesSection from "@/components/home/colleges-section";
import ContactSection from "@/components/home/contact-section";
import ExpertsSection from "@/components/home/experts-section";
import ExploreSection from "@/components/home/explore-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import PopularSkillsSection from "@/components/home/popular-skills-section";
import SpecializedSkillsSection from "@/components/home/specialized-skills-section";
import TestimonialsSection from "@/components/home/testimonials-section";

export default async function HomePage({
    searchParams
}: {
    searchParams: Promise<Record<string, string | undefined>>;
}) {
    const searchParamsData = await searchParams;
    return (
        <main>
            <HeroSection />
            <AdSection />
            <ExpertsSection searchParams={searchParamsData} />
            <HowItWorksSection />
            <ContactSection />
            <CollegesSection />
            <ActionsSection />
            <SpecializedSkillsSection />
            <ExploreSection />
            <PopularSkillsSection />
            <TestimonialsSection />
        </main>
    );
}
