import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_URL } from "@/constants";

export async function POST() {
    const cookieStore = await cookies();
    let token = cookieStore.get("token")?.value;

    const res = await fetch(API_URL + "/api/broadcasting/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    const json = await res.json();
    return NextResponse.json(json);
}
