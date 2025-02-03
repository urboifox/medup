import { create } from "zustand";
import { City, College, Country, Skill, Speciality } from "./types";

interface SelectMenuState {
    countries: Country[];
    cities: City[];
    skills: Skill[];
    colleges: College[];
    specialities: Speciality[];
    setCountries: (countries: Country[]) => void;
    setCities: (cities: City[]) => void;
    setSkills: (skills: Skill[]) => void;
    setColleges: (colleges: College[]) => void;
    setSpecialities: (specialities: Speciality[]) => void;
}

export const useSelectMenuStore = create<SelectMenuState>((set) => {
    return {
        countries: [],
        cities: [],
        skills: [],
        colleges: [],
        specialities: [],
        setCountries: (countries: Country[]) => set({ countries }),
        setCities: (cities: City[]) => set({ cities }),
        setSkills: (skills: Skill[]) => set({ skills }),
        setColleges: (colleges: College[]) => set({ colleges }),
        setSpecialities: (specialities: Speciality[]) => set({ specialities })
    };
});
