import {
    getCities,
    getColleges,
    getCountries,
    getSkills,
    getSpecialities
} from "@/services/select-menu";
import SelectMenuClientProvider from "./select-menu-client-provider";

export default async function SelectMenuProvider({ children }: { children: React.ReactNode }) {
    const [countries, cities, skills, colleges, specialities] = await Promise.all([
        getCountries(),
        getCities(),
        getSkills(),
        getColleges(),
        getSpecialities()
    ]);

    return (
        <SelectMenuClientProvider
            countries={countries?.data || []}
            cities={cities?.data || []}
            skills={skills?.data || []}
            colleges={colleges?.data || []}
            specialities={specialities?.data || []}
        >
            {children}
        </SelectMenuClientProvider>
    );
}
