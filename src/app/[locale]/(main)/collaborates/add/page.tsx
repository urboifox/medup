import FormContainer from "@/features/auth/components/form-container";
import AddProjectForm from "@/features/collaborates/components/add-project-form";
import { useTranslations } from "next-intl";

export default function AddProjectPage() {
    const t = useTranslations();

    return (
        <FormContainer>
            <h1 className="text-3xl font-semibold capitalize">{t("collaborate.addProject")}</h1>
            <AddProjectForm />
        </FormContainer>
    );
}
