"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { useSelectMenuStore } from "@/features/select-menu/store";
import { getCitiesByCountry } from "@/services/select-menu-client";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import FileInput from "@/components/ui/file-input";
import MultiSelect from "@/components/ui/multi-select";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { Expert } from "../types";
import { expertBasicProfileAction } from "../actions";
import Textarea from "@/components/ui/textarea";

interface Props {
    expert: Expert;
}

export default function ExpertBasicProfileForm({ expert }: Props) {
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();

    const [state, action, pending] = useActionState(expertBasicProfileAction, {
        success: false,
        formData: new FormData()
    });

    const [cvFile, setCvFile] = useState<File | null>(null);

    const skills = useSelectMenuStore((state) => state.skills);
    const specialities = useSelectMenuStore((state) => state.specialities);
    const countries = useSelectMenuStore((state) => state.countries);
    const cities = useSelectMenuStore((state) => state.cities);
    const setCities = useSelectMenuStore((state) => state.setCities);

    const stateSkills = state.formData?.getAll("skills");
    const initialSkills =
        stateSkills.length > 0
            ? (stateSkills as string[])
            : expert.skills.map((skill) => skill.id.toString());

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
        async function getInitialCities() {
            const cities = await getCitiesByCountry(expert.city.country.id.toString(), {
                headers: { Locale: locale }
            });
            setCities(cities.data || []);
        }

        getInitialCities();
    }, []);

    useEffect(() => {
        if (state.success) {
            toast.success(t("common.changesSaved"));
        }
        if (state.message) {
            toast.error(state.message);
        }
    }, [state, router]);

    return (
        <form
            className="w-full flex flex-col gap-4"
            action={(formData) => {
                if (cvFile) formData.set("cv", cvFile);
                action(formData);
            }}
        >
            <Textarea
                label={t("labels.bio")}
                name="headline"
                placeholder={t("placeholders.bio")}
                error={state.errors?.headline}
                defaultValue={(state.formData?.get("headline") as string) || expert.headline}
                className="min-h-32"
            />
            <div className="flex items-center gap-4 flex-col sm:flex-row">
                <Select
                    label={t("labels.degree")}
                    error={state.errors?.degree}
                    name="degree"
                    defaultValue={(state.formData?.get("degree") as string) || expert.degree}
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
                    defaultValue={
                        (state.formData?.get("speciality_id") as string) ||
                        expert.speciality?.id.toString()
                    }
                    key={`${(state.formData?.get("speciality_id") as string) || specialities?.length.toString()}-speciality`}
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
            <div className="flex items-center gap-4 flex-col sm:flex-row">
                <Input
                    label={t("labels.graduationYear")}
                    type="number"
                    name="graduation_year"
                    defaultValue={
                        (state.formData?.get("graduation_year") as string) || expert.graduation_year
                    }
                    error={state.errors?.graduation_year}
                />
                <Input
                    label={t("labels.educationBackground")}
                    placeholder={t("placeholders.education")}
                    name="education"
                    defaultValue={(state.formData?.get("education") as string) || expert.education}
                    error={state.errors?.education}
                />
            </div>
            <MultiSelect
                error={state.errors?.skills}
                defaultValue={initialSkills}
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
                    defaultValue={
                        (state.formData?.get("country_id") as string) ||
                        expert.city.country?.id.toString()
                    }
                    key={`${(state.formData?.get("country_id") as string) || countries.length.toString()}-country`}
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
                    defaultValue={
                        (state.formData?.get("city_id") as string) || expert.city.id.toString()
                    }
                    key={`${(state.formData?.get("city_id") as string) || cities.length.toString()}-city`}
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
                label={t("labels.updateCv")}
                placeholderIcon={
                    <span className="text-primary-main text-xl">
                        <FaFilePdf />
                    </span>
                }
            />

            <Button type="submit" disabled={pending}>
                {pending ? t("common.loading") : t("common.save")}
            </Button>
        </form>
    );
}
