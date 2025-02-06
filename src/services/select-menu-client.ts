import { City } from "@/features/select-menu/types";
import { fetcherClient, FetcherClientOptions } from "@/utils/fetcher-client";

export async function getCitiesByCountry(countryId: string, init?: FetcherClientOptions) {
    return await fetcherClient<City[]>("/api/select_menu/cities?country_id=" + countryId, init);
}
