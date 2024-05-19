import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string } }
) {
    try {
        const { userId, sessionClaims } = auth();
        const data = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const note = await db.note.create({
            data: {
                userId: userId,
                chapterId: params?.chapterId,
                content: data?.content,
                time: data?.createAt
            }
        })

        return NextResponse.json(note);
    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

