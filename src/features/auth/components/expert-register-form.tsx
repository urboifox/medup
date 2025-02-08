"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { useSelectMenuStore } from "@/features/select-menu/store";
import { usePathname } from "@/i18n/routing";
import { getCitiesByCountry } from "@/services/select-menu-client";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { expertRegisterAction } from "../actions";
import FileInput from "@/components/ui/file-input";
import MultiSelect from "@/components/ui/multi-select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ExpertRegisterForm() {
    const t = useTranslations();
    const pathname = usePathname();
    const locale = useLocale();
    const router = useRouter();

    const [state, action, pending] = useActionState(expertRegisterAction, {
        success: false,
        formData: new FormData()
    });

    const [cvFile, setCvFile] = useState<File>();
    const [avatarFile, setAvatarFile] = useState<File>();

    const skills = useSelectMenuStore((state) => state.skills);
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
        const cities = await getCitiesByCountry(countryId, { headers: { Locale: locale } });
        setCities(cities.data || []);
    }

    useEffect(() => {
        setCities([]);
    }, [pathname, setCities]);

    useEffect(() => {
        if (state.success) {
            router.push("/register/verify?handle=" + state.formData?.get("email"));
        }
        if (state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form
            className="w-full flex flex-col gap-4"
            action={(formData) => {
                if (cvFile) formData.set("cv", cvFile);
                if (avatarFile) formData.set("avatar", avatarFile);
                action(formData);
            }}
        >
            <input type="hidden" name="type" value={pathname.includes("researcher") ? "4" : "1"} />
            <div className="flex items-center gap-4 flex-col sm:flex-row">
                <Input
                    label={t("labels.firstName")}
                    placeholder={t("placeholders.firstName")}
                    name="first_name"
                    defaultValue={state.formData?.get("first_name") as string}
                    error={state.errors?.first_name}
                />
                <Input
                    label={t("labels.middleName")}
                    placeholder={t("placeholders.middleName")}
                    name="middle_name"
                    defaultValue={state.formData?.get("middle_name") as string}
                    error={state.errors?.middle_name}
                />
            </div>
            <div className="flex items-center gap-4 flex-col sm:flex-row">
                <Input
                    label={t("labels.email")}
                    placeholder={t("placeholders.email")}
                    name="email"
                    defaultValue={state.formData?.get("email") as string}
                    error={state.errors?.email}
                />
                <Input
                    label={t("labels.phone")}
                    placeholder={t("placeholders.phone")}
                    name="phone"
                    defaultValue={state.formData?.get("phone") as string}
                    error={state.errors?.phone}
                />
            </div>
            <Input
                label={t("labels.password")}
                placeholder={t("placeholders.password")}
                name="password"
                type="password"
                defaultValue={state.formData?.get("password") as string}
                error={state.errors?.password}
            />
            <Input
                label={t("labels.confirmPassword")}
                placeholder={t("placeholders.password")}
                name="password_confirmation"
                type="password"
                defaultValue={state.formData?.get("password_confirmation") as string}
                error={state.errors?.password_confirmation}
            />
            <FileInput
                accept="image/*"
                onFilesChange={(files) => setAvatarFile(files[0])}
                error={state.errors?.avatar}
                name="avatar"
                label={t("labels.image")}
                placeholderIcon={
                    <span className="text-primary-main text-xl">
                        <RxAvatar />
                    </span>
                }
            />

            <div className="flex items-center gap-4 flex-col sm:flex-row">
                <Select
                    label={t("labels.degree")}
                    error={state.errors?.degree}
                    name="degree"
                    defaultValue={state.formData?.get("degree") as string}
                    key={state.formData?.get("degree") as string}
                >
                    {degreeOptions.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        );
                    })}
                </Select>
                <Select
                    label={t("labels.speciality")}
                    error={state.errors?.speciality_id}
                    name="speciality_id"
                    defaultValue={state.formData?.get("speciality_id") as string}
                    key={`${state.formData?.get("speciality_id") as string}-speciality`}
                >
                    {specialities.map((speciality) => {
                        return (
                            <option key={speciality.id} value={speciality.id}>
                                {speciality.name}
                            </option>
                        );
                    })}
                </Select>
            </div>
            <MultiSelect
                error={state.errors?.skills}
                defaultValue={state.formData?.getAll("skills") as string[]}
                name="skills"
                options={skills.map((skill) => ({ label: skill.name, value: skill.id.toString() }))}
                label={t("labels.skills")}
            />
            <div className="flex items-center gap-4 flex-col sm:flex-row">
                <Select
                    label={t("labels.country")}
                    error={state.errors?.country_id}
                    name="country_id"
                    onChange={handleCountryChange}
                    defaultValue={state.formData?.get("country_id") as string}
                    key={`${state.formData?.get("country_id") as string}-country`}
                >
                    {countries.map((country) => {
                        return (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        );
                    })}
                </Select>
                <Select
                    label={t("labels.city")}
                    error={state.errors?.city_id}
                    name="city_id"
                    disabled={cities.length === 0}
                    defaultValue={state.formData?.get("city_id") as string}
                    key={`${state.formData?.get("city_id") as string}-city`}
                >
                    {cities.length === 0 && (
                        <option value="">{t("auth.pleaseSelectACountry")}</option>
                    )}
                    {cities.map((city) => {
                        return (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        );
                    })}
                </Select>
            </div>

            <FileInput
                error={state.errors?.cv}
                accept="application/pdf"
                onFilesChange={(files) => setCvFile(files[0])}
                name="cv"
                label={t("labels.cv")}
                placeholderIcon={
                    <span className="text-primary-main text-xl">
                        <FaFilePdf />
                    </span>
                }
            />

            <Button type="submit" disabled={pending}>
                {t("auth.register")} {t("common.as")}{" "}
                {t(pathname.includes("student") ? "common.researcher" : "common.expert")}
            </Button>
        </form>
    );
}
