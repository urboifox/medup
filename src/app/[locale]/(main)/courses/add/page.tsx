import FormContainer from "@/features/auth/components/form-container";
import AddCourseForm from "@/features/courses/components/add-course-form";
import { useTranslations } from "next-intl";

export default function AddProjectPage() {
    const t = useTranslations();

    return (
        <FormContainer>
            <h1 className="text-3xl font-semibold capitalize">{t("courses.addCourse")}</h1>
            <AddCourseForm />
        </FormContainer>
    );
}
