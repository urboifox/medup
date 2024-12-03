import ExpertCard from "@/components/cards/expert-card";
import Button from "../ui/button";
import Link from "next/link";

export default function ExpertsSection() {
    const experts = Array(8).fill(null);

    return (
        <section className="container py-40 flex flex-col gap-20">
            <div className="flex flex-col gap-6 text-center items-center max-w-4xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold">Meet our best experts</h2>
                <p className="text-dark-300 text-lg lg:text-xl">
                    Discover a world-class lineup of professionals who are redefining the way skills
                    are shared. Whether you're just starting out or looking to level up, our experts
                    are here to guide you every step of the way. Learn from the best, on your
                    terms—anytime, anywhere.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10">
                {experts.map((_, idx) => {
                    return <ExpertCard key={idx} />;
                })}
            </div>
            <Link href="/" className="w-max mx-auto">
                <Button>Discover More</Button>
            </Link>
        </section>
    );
}
