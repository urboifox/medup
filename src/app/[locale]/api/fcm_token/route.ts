import { cookies } from "next/headers";

export const POST = async (request: Request) => {
    const cookiesStore = await cookies();
    const { token } = await request.json();
    cookiesStore.set("fcm-token", token, { path: "/" });
    return new Response(null, { status: 204 });
};
