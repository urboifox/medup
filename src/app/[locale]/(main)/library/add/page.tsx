import FormContainer from "@/features/auth/components/form-container";
import AddLibrarryItemForm from "@/features/library/components/add-book-form";
import { useTranslations } from "next-intl";

export default function AddProjectPage() {
    const t = useTranslations();

    return (
        <FormContainer>
            <h1 className="text-3xl font-semibold capitalize">{t("library.addBook")}</h1>
            <AddLibrarryItemForm />
        </FormContainer>
    );
}
