"use client";

import { useEffect } from "react";
import { useSelectMenuStore } from "./store";
import { College, Country, Skill, Speciality } from "./types";

interface Props extends React.PropsWithChildren {
    countries: Country[];
    skills: Skill[];
    colleges: College[];
    specialities: Speciality[];
}

export default function SelectMenuClientProvider({
    children,
    countries,
    skills,
    colleges,
    specialities
}: Props) {
    const { setCountries, setSkills, setColleges, setSpecialities } = useSelectMenuStore();

    useEffect(() => {
        setCountries(countries);
        setSkills(skills);
        setColleges(colleges);
        setSpecialities(specialities);
    }, [
        setCountries,
        setSkills,
        setColleges,
        setSpecialities,
        countries,
        skills,
        colleges,
        specialities
    ]);

    return children;
}
