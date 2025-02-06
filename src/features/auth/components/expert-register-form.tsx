"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { useSelectMenuStore } from "@/features/select-menu/store";
import { usePathname } from "@/i18n/routing";
import { getCitiesByCountry } from "@/services/select-menu-client";
import { useTranslations } from "next-intl";

export default function ExpertRegisterForm() {
    const t = useTranslations();
    const pathname = usePathname();

    const specialities = useSelectMenuStore((state) => state.specialities);
    const countries = useSelectMenuStore((state) => state.countries);
    const cities = useSelectMenuStore((state) => state.cities);
    const setCities = useSelectMenuStore((state) => state.setCities);

    const degreeOptions = [
        { value: "bachelor", label: "Bachelor" },
        { value: "master", label: "Master" },
        { value: "phd", label: "Doctor" }
    ];

    async function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const countryId = e.target.value;
        const cities = await getCitiesByCountry(countryId);
        setCities(cities.data || []);
    }

    return (
        <form className="w-full flex flex-col gap-4">
            <input type="hidden" name="type" value={pathname.includes("researcher") ? "4" : "1"} />
            <div className="flex items-center gap-4 flex-col sm:flex-row">
                <Input
                    label={t("labels.firstName")}
                    placeholder={t("placeholders.firstName")}
                    name="first_name"
                />
                <Input
                    label={t("labels.middleName")}
                    placeholder={t("placeholders.middleName")}
                    name="middle_name"
                />
            </div>
            <div className="flex items-center gap-4 flex-col sm:flex-row">
                <Input
                    label={t("labels.email")}
                    placeholder={t("placeholders.email")}
                    name="email"
                />
                <Input
                    label={t("labels.phone")}
                    placeholder={t("placeholders.phone")}
                    name="phone"
                />
            </div>
            <Input
                label={t("labels.password")}
                placeholder={t("placeholders.password")}
                name="password"
                type="password"
            />
            <Input
                label={t("labels.confirmPassword")}
                placeholder={t("placeholders.password")}
                name="password_confirmation"
                type="password"
            />

            <Select label={t("labels.degree")} name="degree">
                {degreeOptions.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    );
                })}
            </Select>
            <Select label={t("labels.speciality")} name="speciality_id">
                {specialities.map((speciality) => {
                    return (
                        <option key={speciality.id} value={speciality.id}>
                            {speciality.name}
                        </option>
                    );
                })}
            </Select>
            <Select label={t("labels.country")} name="country_id" onChange={handleCountryChange}>
                {countries.map((country) => {
                    return (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    );
                })}
            </Select>
            <Select label={t("labels.city")} name="city_id" disabled={cities.length === 0}>
                {cities.length === 0 && <option value="">{t("auth.pleaseSelectACountry")}</option>}
                {cities.map((city) => {
                    return (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    );
                })}
            </Select>

            <Button type="submit">{t("auth.register")}</Button>
        </form>
    );
}
