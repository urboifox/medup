import AddArticleForm from "@/features/articles/components/add-article-form";
import FormContainer from "@/features/auth/components/form-container";
import { useTranslations } from "next-intl";

export default function AddArticlePage() {
    const t = useTranslations();

    return (
        <FormContainer>
            <h1 className="text-3xl font-semibold capitalize">{t("articles.addArticleTitle")}</h1>
            <AddArticleForm />
        </FormContainer>
    );
}
