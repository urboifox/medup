"use client";

import { useEffect } from "react";
import { useSelectMenuStore } from "./store";
import { City, College, Country, Skill, Speciality } from "./types";

interface Props extends React.PropsWithChildren {
    countries: Country[];
    cities: City[];
    skills: Skill[];
    colleges: College[];
    specialities: Speciality[];
}

export default function SelectMenuClientProvider({
    children,
    countries,
    cities,
    skills,
    colleges,
    specialities
}: Props) {
    const { setCountries, setCities, setSkills, setColleges, setSpecialities } =
        useSelectMenuStore();

    useEffect(() => {
        setCountries(countries);
        setCities(cities);
        setSkills(skills);
        setColleges(colleges);
        setSpecialities(specialities);
    }, []);

    return children;
}
