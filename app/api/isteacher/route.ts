import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
) {
    try {
        const { userId, sessionClaims } = auth();
        if (!userId || sessionClaims?.metadata === undefined || sessionClaims.metadata.role !== "teacher") {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        return new NextResponse("Unauthorized", { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}