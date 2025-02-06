import { City } from "@/features/select-menu/types";
import { fetcherClient } from "@/utils/fetcher-client";

export async function getCitiesByCountry(countryId: string) {
    return await fetcherClient<City[]>("/api/select_menu/cities?country_id=" + countryId);
}
