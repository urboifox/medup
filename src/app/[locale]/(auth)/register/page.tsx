"use client";
import Button from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import icons from "@/lib/icons";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

type UserType = "student" | "trainee" | "expert";

export default function RegisterPage() {
    const t = useTranslations();
    const [userType, setUserType] = useState<UserType>("student");

    return (
        <div className="py-40">
            <div className="container flex flex-col gap-14">
                <div className="flex flex-col gap-4 items-center text-center">
                    <Link href="/">
                        <h1 className="text-4xl font-semibold">{t("auth.preRegisterTitle")}</h1>
                    </Link>
                    <p className="text-dark-300 max-w-2xl">{t("auth.preRegisterDescription")}</p>
                </div>

                <div className="flex items-center gap-10 justify-center flex-wrap">
                    <UserTypeCard
                        isSelected={userType === "student"}
                        onClick={() => setUserType("student")}
                        icon={
                            <Image
                                src={icons.student}
                                alt={t("common.student")}
                                width={40}
                                height={40}
                            />
                        }
                        title={t("common.student")}
                        description={t("common.studentDescription")}
                    />
                    <UserTypeCard
                        isSelected={userType === "trainee"}
                        onClick={() => setUserType("trainee")}
                        icon={
                            <Image
                                src={icons.trainee}
                                alt={t("common.trainee")}
                                width={40}
                                height={40}
                            />
                        }
                        title={t("common.trainee")}
                        description={t("common.traineeDescription")}
                    />
                    <UserTypeCard
                        isSelected={userType === "expert"}
                        onClick={() => setUserType("expert")}
                        icon={
                            <Image
                                src={icons.expert}
                                alt={t("common.expert")}
                                width={40}
                                height={40}
                            />
                        }
                        title={t("common.expert")}
                        description={t("common.expertDescription")}
                    />
                </div>

                <div className="flex flex-col items-center gap-6">
                    <Link href={`/register/${userType}`}>
                        <Button>
                            {t("auth.joinAs")} {t(`common.${userType}`)}
                        </Button>
                    </Link>
                    <p className="text-sm">
                        {t("auth.alreadyHaveAnAccount")}{" "}
                        <Link href="/login" className="text-primary-main font-semibold underline">
                            {t("auth.login")}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

interface UserTypeCardProps {
    onClick: () => void;
    isSelected: boolean;
    title: string;
    description: string;
    icon: React.ReactNode;
}

function UserTypeCard({ onClick, isSelected, title, description, icon }: UserTypeCardProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col gap-10 p-8 rounded-lg border border-dark-100 transition-all duration-200 w-full md:w-80",
                isSelected && "border-primary-100 shadow-md"
            )}
        >
            <div className="flex items-center justify-between gap-4 w-full">
                <span>{icon}</span>
                <span
                    className={cn(
                        "rounded-full w-7 h-7 border border-dark-200 transition-colors duration-20",
                        isSelected && "bg-primary-200 border-primary-200"
                    )}
                />
            </div>
            <div className="flex flex-col gap-2 items-start text-start">
                <p>{title}</p>
                <p className="text-dark-300 text-sm">{description}</p>
            </div>
        </button>
    );
}
