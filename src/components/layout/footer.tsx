import { Link } from "@/i18n/routing";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="pt-40 bg-[#18191c] text-white">
            <div className="container flex flex-wrap gap-10 pb-20 pt-10 justify-between">
                <div className="flex flex-col gap-4">
                    <Link href="/">
                        <h3 className="text-dark-100 font-bold text-xl">MedUp</h3>
                    </Link>
                    <p className="text-dark-300">
                        أتصل الان:{" "}
                        <Link href={`tel:${9661234}`} className="font-semibold text-dark-100">
                            +966 123456789
                        </Link>
                    </p>
                    <p className="text-dark-300 max-w-sm">
                        6391 شارع إلجين، سيلينا، ديلاوير 10299، نيويورك، الولايات المتحدة الأمريكية
                    </p>
                </div>
                <div className="flex flex-wrap gap-10">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-dark-100 font-medium text-xl">روابط سريعة</h3>
                        <div className="flex flex-col gap-1">
                            <FooterLink href="/" label="عنا" />
                            <FooterLink href="/" label="الخدمات" />
                            <FooterLink href="/" label="التواصل معنا" />
                            <FooterLink href="/" label="المدونات" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-dark-100 font-medium text-xl">المحتوى</h3>
                        <div className="flex flex-col gap-1">
                            <FooterLink href="/" label="تصفح الأطباء" />
                            <FooterLink href="/" label="تصفح الكتب" />
                            <FooterLink href="/" label="تصفح المدونات" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-dark-100 font-medium text-xl">الدعم</h3>
                        <div className="flex flex-col gap-1">
                            <FooterLink href="/" label="الأسئلة المتكررة" />
                            <FooterLink href="/" label="سياسة الخدمة" />
                            <FooterLink href="/" label="المستخدم والمشرف" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 border-t border-dark-300">
                <div className="container flex items-center justify-between flex-col gap-4 lg:flex-row">
                    <p className="text-dark-200" dir="ltr">
                        &copy; 2024 MedUp - جميع الحقوق محفوظة
                    </p>
                    <div className="flex items-center gap-3 text-xl">
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            className="text-dark-300 transition-colors duration-200 hover:text-dark-100 active:text-dark-200"
                        >
                            <FaFacebookF />
                        </Link>
                        <Link
                            href="https://x.com"
                            target="_blank"
                            className="text-dark-300 transition-colors duration-200 hover:text-dark-100 active:text-dark-200"
                        >
                            <FaXTwitter />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="relative group text-dark-300 hover:text-dark-100 active:text-dark-200"
        >
            <FiArrowLeft className="opacity-0 transition-all duration-200 group-hover:opacity-100 absolute top-1/2 -translate-y-1/2 -start-6 group-hover:-start-2" />
            <p className="transition-all duration-200 group-hover:-translate-x-4">{label}</p>
        </Link>
    );
}
