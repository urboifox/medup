import ActionsSection from "@/components/home/actions-section";
import AdSection from "@/components/home/ad-section";
import CollegesSection from "@/components/home/colleges-section";
import ContactSection from "@/components/home/contact-section";
import ExpertsSection from "@/components/home/experts-section";
import ExploreSection from "@/components/home/explore-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import SpecializedSkillsSection from "@/components/home/specialized-skills-section";
import TestimonialsSection from "@/components/home/testimonials-section";

export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <AdSection />
            <ExpertsSection />
            <HowItWorksSection />
            <ContactSection />
            <CollegesSection />
            <ActionsSection />
            <SpecializedSkillsSection />
            <ExploreSection />
            <TestimonialsSection />
        </main>
    );
}
