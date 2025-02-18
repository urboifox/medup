"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useSelectMenuStore } from "@/features/select-menu/store";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { expertEditExperienceProfileAction } from "../actions";
import Textarea from "@/components/ui/textarea";
import Select from "@/components/ui/select";
import { getCitiesByCountry } from "@/services/select-menu-client";
import { ExpertExperience } from "../types";

export default function ExpertEditExperienceProfileForm({
    experience
}: {
    experience: ExpertExperience;
}) {
    const t = useTranslations();
    const router = useRouter();
    const locale = useLocale();

    const [state, action, pending] = useActionState(expertEditExperienceProfileAction, {
        success: false,
        formData: new FormData()
    });

    const countries = useSelectMenuStore((state) => state.countries);
    const cities = useSelectMenuStore((state) => state.cities);
    const setCities = useSelectMenuStore((state) => state.setCities);

    async function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const countryId = e.target.value;
        const cities = await getCitiesByCountry(countryId, { headers: { Locale: locale } });
        setCities(cities.data || []);
    }

    useEffect(() => {
        if (state.success) {
            toast.success(t("common.changesSaved"));
        }
        if (state.message) {
            toast.error(state.message);
        }
    }, [state, router]);

    useEffect(() => {
        async function getInitialCities() {
            const cities = await getCitiesByCountry(experience.city.country.id.toString(), {
                headers: { Locale: locale }
            });
            setCities(cities.data || []);
        }

        getInitialCities();
    }, []);

    const workTypeOptions = [
        { value: 0, label: t("common.fullTime") },
        { value: 1, label: t("common.partTime") },
        { value: 2, label: t("common.remotely") }
    ];

    return (
        <form
            className="w-full flex flex-col gap-4"
            action={(fd) => {
                if (experience.id) {
                    fd.set("id", experience.id.toString());
                }
                action(fd);
            }}
        >
            <Input
                label={t("labels.hospitalName")}
                name="hospital_name"
                defaultValue={
                    (state.formData?.get("hospital_name") as string) || experience.hospital_name
                }
                error={state.errors?.hospital_name}
            />
            <Input
                label={t("labels.jobTitle")}
                name="job_title"
                defaultValue={(state.formData?.get("job_title") as string) || experience.job_title}
                error={state.errors?.job_title}
            />
            <Select
                label={t("labels.workType")}
                error={state.errors?.work_type}
                name="work_type"
                defaultValue={(state.formData?.get("work_type") as string) || experience.work_type}
                key={state.formData?.get("work_type") as string}
            >
                {workTypeOptions.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    );
                })}
            </Select>
            <Textarea
                label={t("labels.description")}
                name="content"
                defaultValue={(state.formData?.get("content") as string) || experience.content}
                error={state.errors?.content}
                className="min-h-32"
            />
            <div className="flex items-center gap-4 flex-col sm:flex-row">
                <Input
                    label={t("labels.startDate")}
                    name="start_date"
                    defaultValue={
                        (state.formData?.get("start_date") as string) || experience.start_date
                    }
                    type="date"
                    error={state.errors?.start_date}
                />
                <Input
                    label={t("labels.endDate")}
                    name="end_date"
                    defaultValue={
                        (state.formData?.get("end_date") as string) || experience.end_date
                    }
                    type="date"
                    error={state.errors?.end_date}
                />
            </div>
            <div className="flex items-center gap-4 flex-col sm:flex-row">
                <Select
                    label={t("labels.country")}
                    error={state.errors?.country_id}
                    name="country_id"
                    onChange={handleCountryChange}
                    defaultValue={
                        (state.formData?.get("country_id") as string) ||
                        experience?.city?.country?.id
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
                        (state.formData?.get("city_id") as string) || experience?.city?.id
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

            <Button type="submit" disabled={pending}>
                {pending ? t("common.loading") : t("common.save")}
            </Button>
        </form>
    );
}
