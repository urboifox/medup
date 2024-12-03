import Image from "next/image";
import Button from "../ui/button";
import Input from "../ui/input";
import icons from "@/lib/icons";

export default function HeroSearch() {
    return (
        <article className="p-3 bg-white rounded-lg shadow-md flex items-center gap-3 justify-between max-w-2xl">
            <div className="flex items-center gap-3">
                <Input
                    className="border-transparent"
                    placeholder="Skill, Keyword..."
                    placeholderIcon={
                        <Image width={24} height={24} src={icons.search} alt="Search" />
                    }
                />
                <span className="h-6 w-px bg-dark-100" />
                <button className="flex items-center gap-2 text-dark-300">
                    <Image width={24} height={24} src={icons.mapPin} alt="Map Pin" />
                    <p className="line-clamp-1 max-w-52 text-start">Your Location</p>
                </button>
            </div>
            <Button>Search</Button>
        </article>
    );
}
