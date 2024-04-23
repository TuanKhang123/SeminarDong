import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string, noteId: string, } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deleteNote = await db.note.delete({
            where: {
                id: params?.noteId
            }
        });

        return NextResponse.json(deleteNote);
    } catch (error) {
        console.log("[NOTE_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string, noteId: string } }
) {
    try {
        const { userId } = auth();
        const { noteId } = params;
        const values = await req.json();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const noteUpdate = await db.note.update({
            where: {
                id: noteId,
                userId
            },
            data: {
                content: values?.bio
            }
        });
        return NextResponse.json(noteUpdate);
    } catch (error) {
        console.log("[COURSE_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}