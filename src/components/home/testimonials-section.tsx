import { Suspense } from "react";
import TestimonialsSectionContent from "./testimonials-secion-content";
import { getTestimonials } from "@/features/home/services";

export default function TestimonialsSection() {
    return (
        <Suspense>
            <TestimonialsSectionContainer />
        </Suspense>
    );
}

async function TestimonialsSectionContainer() {
    const res = await getTestimonials();
    const testimonials = res.data;

    return <TestimonialsSectionContent testimonials={testimonials || []} />;
}
