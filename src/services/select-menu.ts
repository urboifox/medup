import {
    City,
    College,
    CollegeWithSpeciality,
    Country,
    Skill,
    Speciality
} from "@/features/select-menu/types";
import { fetcher } from "@/utils/fetcher";

export async function getCountries() {
    return await fetcher<Country[]>("/api/select_menu/countries", {
        cache: "force-cache"
    });
}

export async function getCities() {
    return await fetcher<City[]>("/api/select_menu/cities", {
        cache: "force-cache"
    });
}

export async function getSkills() {
    return await fetcher<Skill[]>("/api/select_menu/skills", {
        next: {
            revalidate: 60 * 60 * 24
        }
    });
}

export async function getColleges() {
    return await fetcher<College[]>("/api/select_menu/colleges", {
        next: {
            revalidate: 60 * 60 * 24
        }
    });
}

export async function getSpecialities() {
    return await fetcher<Speciality[]>("/api/select_menu/specialities", {
        next: {
            revalidate: 60 * 60 * 24
        }
    });
}

export async function getCollegesWithSpecialities() {
    return await fetcher<CollegeWithSpeciality[]>("/api/select_menu/colleges_with_specialities", {
        next: {
            revalidate: 60 * 60 * 24
        }
    });
}
