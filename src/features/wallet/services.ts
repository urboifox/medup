import { fetcher, FetcherOptions } from "@/utils/fetcher";
import { Transaction } from "./types";

export async function getTransactions(options?: FetcherOptions) {
    return await fetcher<Transaction[]>("/api/transactions", options);
}

export async function getBalance(options?: FetcherOptions) {
    return await fetcher<{ balance: number }>("/api/wallet", options);
}
