import FormContainer from "@/features/auth/components/form-container";
import icons from "@/lib/icons";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Button from "@/components/ui/button";

export default function VerifiedPage() {
    const t = useTranslations();

    return (
        <FormContainer>
            <Image src={icons.done} alt="done" width={110} height={110} />
            <h1 className="text-3xl font-semibold">{t("auth.accountVerified")}</h1>
            <p className="max-w-sm text-center">{t("auth.accountVerifiedDescription")}</p>

            <Link href="/login">
                <Button>
                    {t("auth.login")} {t("common.now")}
                </Button>
            </Link>
        </FormContainer>
    );
}
