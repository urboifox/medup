import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Expert } from "../types";
import { IoMailOutline } from "react-icons/io5";
import { cn } from "@/utils/cn";

export default function ExpertProfileSocialMedia({
    social_contacts
}: {
    social_contacts: Expert["social_contacts"];
}) {
    return (
        <div className="flex flex-wrap gap-4">
            <SocialMediaItem icon={<FaFacebookF />} href={social_contacts.facebook} />
            <SocialMediaItem icon={<FaXTwitter />} href={social_contacts.twitter} />
            <SocialMediaItem icon={<FaLinkedinIn />} href={social_contacts.linkedin} />
            <SocialMediaItem
                icon={<IoMailOutline />}
                href={social_contacts.email && `mailto:${social_contacts.email}`}
            />
        </div>
    );
}

function SocialMediaItem({ icon, href }: { icon: React.ReactNode; href?: string }) {
    return (
        <a
            className={cn(
                "p-4 rounded-md bg-primary-50 text-primary-main transition-colors duration-200",
                !href ? "cursor-not-allowed opacity-50" : "hover:bg-primary-main hover:text-white"
            )}
            href={href}
            target="_blank"
        >
            {icon}
        </a>
    );
}
