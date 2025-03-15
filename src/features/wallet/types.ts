import { User } from "@/types/user";

export enum TransactionType {
    Deposit,
    Withdrawal,
    Transfer
}

export type Transaction = {
    id: string;
    type: TransactionType;
    amount: number;
    incoming: boolean;
    from_admin: boolean;
    created_at: string;
    description: string;
    user: User;
};
