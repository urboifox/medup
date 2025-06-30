import { Contract } from "@/features/contracts/types";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import { HiExternalLink } from "react-icons/hi";

export default async function ProfileContractsPage() {
    const { data: contracts } = await fetcher<Contract[]>("/api/public/contracts");

    return (
        <div className="container flex flex-col gap-4 py-10 min-h-[40vh]">
            <h2 className="text-2xl font-semibold">My Contracts</h2>
            {contracts?.map((contract: Contract) => {
                return (
                    <Link
                        href={`/contracts/${contract.id}`}
                        key={contract.id}
                        className="flex justify-between items-center gap-4 bg-light-200 p-4 rounded-xl w-full hover:border-primary-main"
                    >
                        <div>
                            <p className="text-dark-400 font-semibold">
                                {contract.expert_name} - {contract.expert_email}
                            </p>
                            <p className="text-dark-300">
                                {contract.trainee_name} - {contract.trainee_email}
                            </p>
                        </div>
                        <HiExternalLink size={24} />
                    </Link>
                );
            })}
        </div>
    );
}
