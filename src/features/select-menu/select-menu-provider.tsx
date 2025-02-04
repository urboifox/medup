import { getColleges, getCountries, getSkills, getSpecialities } from "@/services/select-menu";
import SelectMenuClientProvider from "./select-menu-client-provider";

export default async function SelectMenuProvider({ children }: { children: React.ReactNode }) {
    const [countries, skills, colleges, specialities] = await Promise.all([
        getCountries(),
        getSkills(),
        getColleges(),
        getSpecialities()
    ]);

    return (
        <SelectMenuClientProvider
            countries={countries?.data || []}
            skills={skills?.data || []}
            colleges={colleges?.data || []}
            specialities={specialities?.data || []}
        >
            {children}
        </SelectMenuClientProvider>
    );
}
