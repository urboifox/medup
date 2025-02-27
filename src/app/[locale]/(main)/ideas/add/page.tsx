import FormContainer from "@/features/auth/components/form-container";
import AddIdeaForm from "@/features/ideas/components/add-idea-form";
import { useTranslations } from "next-intl";

export default function AddProjectPage() {
    const t = useTranslations();

    return (
        <FormContainer>
            <h1 className="text-3xl font-semibold capitalize">{t("ideas.addIdea")}</h1>
            <AddIdeaForm />
        </FormContainer>
    );
}
