import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Expert } from "../types";
import { IoMailOutline } from "react-icons/io5";

export default function ExpertProfileSocialMedia({ expert }: { expert: Expert }) {
    return (
        <div className="flex flex-wrap gap-4">
            {expert.social_contacts.facebook && (
                <SocialMediaItem icon={<FaFacebookF />} href={expert.social_contacts.facebook} />
            )}
            {expert.social_contacts.twitter && (
                <SocialMediaItem icon={<FaXTwitter />} href={expert.social_contacts.twitter} />
            )}
            {expert.social_contacts.linkedin && (
                <SocialMediaItem icon={<FaLinkedinIn />} href={expert.social_contacts.linkedin} />
            )}
            {expert.social_contacts.email && (
                <SocialMediaItem
                    icon={<IoMailOutline />}
                    href={`mailto:${expert.social_contacts.email}`}
                />
            )}
        </div>
    );
}

function SocialMediaItem({ icon, href }: { icon: React.ReactNode; href: string }) {
    return (
        <a
            className="p-4 rounded-md bg-primary-50 text-primary-main transition-colors duration-200 hover:bg-primary-main hover:text-white"
            href={href}
            target="_blank"
        >
            {icon}
        </a>
    );
}
