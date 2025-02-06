"use server";

type ExpertRegisterAction = {
    success: boolean;
    formData?: FormData;
};

export async function expertRegisterAction(
    _prevData: ExpertRegisterAction,
    formData: FormData
): Promise<ExpertRegisterAction> {
    console.log("data", Object.fromEntries(formData.entries()), formData.getAll("skills"));
    return { success: true, formData };
}
