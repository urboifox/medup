import { Contract } from "@/features/contracts/types";
import { fetcher } from "@/utils/fetcher";
import CompleteContractButton from "./complete-contract-button";

export default async function ContractPage({ params }: { params: { contractId: string } }) {
    const { contractId } = params;
    const { data: contract } = await fetcher<Contract>("/api/public/contracts/" + contractId);

    return (
        <div className="flex flex-col gap-4 h-full container py-10">
            <CompleteContractButton contract={contract as Contract} />
            <embed src={contract?.contract} width="100%" className="min-h-[800px]" />
        </div>
    );
}
