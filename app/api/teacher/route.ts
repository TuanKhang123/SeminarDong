import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
) {
    try {
        const { userId, sessionClaims } = auth();
        if (!userId || sessionClaims?.metadata === undefined || sessionClaims.metadata.role !== "teacher") {
            return NextResponse.json({
                "isTeacher": false,
            });
        }
        return NextResponse.json({
            "isTeacher": true,
        });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(
    req: Request,
) {
    try {
        const { userId, sessionClaims } = auth();
        // not a teacher yet
        if (!userId || sessionClaims?.metadata === undefined || sessionClaims.metadata.role !== "teacher") {

            const user = await clerkClient.users.updateUser(
                userId as string,
                {
                    publicMetadata: { role: "teacher" },
                }
            );

            return NextResponse.json({
                "status": "Successful!",
                "message": "You are became a teacher",
            });
        }


        return NextResponse.json({
            "status": "Failed!",
            "message": "You already is a teacher",
        });

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}