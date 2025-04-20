import TopExpertSidebarItem from "./top-expert-sidebar-item";
import { AiOutlineWarning } from "react-icons/ai";
import { Link } from "@/i18n/routing";
import { Expert } from "@/features/experts/types";

export default function TopExpertsSidebar({ experts }: { experts: Expert[] }) {
    return (
        <div className="flex flex-col gap-4 border-s border-light-300 h-full">
            <h3 className="text-xl font-semibold flex items-center gap-2 ps-4">Explore</h3>
            <hr />
            <div className="flex flex-col gap-2 ps-4">
                <h4 className="font-semibold">Top Experts</h4>

                <ul className="flex flex-col gap-2">
                    {experts?.map((expert, index) => {
                        return (
                            <li key={index}>
                                <TopExpertSidebarItem expert={expert} />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <hr />
            <div className="flex flex-col gap-2 ps-4 [&_a]:text-primary-main [&_a]:font-semibold text-dark-300 text-sm">
                <AiOutlineWarning className="text-warning-main h-fit" size={20} />
                <p>
                    For the safety and security of our" members, all buying and selling must take
                    place on the <Link href="/">Medupskills.com</Link> platform. Any transactions
                    outside of the platform are against our terms of service and may lead to account
                    restrictions The platform reserves the right to take legal action against any
                    violators
                </p>
                <p>
                    لحماية جميع الأعضاء، يقتصر التعامل التجاري على منصة{" "}
                    <Link href="/">Medupskills.com</Link> فقط. أي تعامل خارج المنصة بعد مخالفة
                    الشروط الاستخدام ويعرض الحساب للحجب
                </p>
            </div>
        </div>
    );
}
