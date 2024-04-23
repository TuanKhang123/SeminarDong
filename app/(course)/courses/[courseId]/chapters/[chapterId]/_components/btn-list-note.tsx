"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import dynamic from 'next/dynamic';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { ItemNote } from "./item-note";
import { MediaActionTypes, useMediaDispatch } from "media-chrome/react/media-store";

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>, // Hiển thị khi component đang load
});

const FormSchema = z.object({
    bio: z
        .string()
        .min(10, {
            message: "Bio must be at least 10 characters.",
        })
        .max(160, {
            message: "Bio must not be longer than 30 characters.",
        }),
})

interface ButtonListNotesProps {
    chapterId: string;
    courseId: string;
    notes: any;
};

export const ButtonListNotes = ({
    courseId,
    chapterId,
    notes,
}: ButtonListNotesProps) => {
    const dispatch = useMediaDispatch()

    const onSeek = (time: number): void => dispatch({ type: MediaActionTypes.MEDIA_SEEK_REQUEST, detail: time });
    return (
        <Dialog>
            <DialogTrigger asChild >
                <Button variant="secondary">List Note</Button>
            </DialogTrigger>

            <DialogContent className="bottom-0 top-0 right-0 max-w-2xl flex flex-col overflow-x-auto" >
                <p className="text-center font-semibold text-3xl">MY NOTES</p>
                {
                    notes.sort((a: any, b: any) => a.time - b.time).map((note: any, index: number) => (
                        <ItemNote key={index} note={note} onSeek={onSeek}></ItemNote>
                    ))
                }
            </DialogContent>
        </Dialog>
    )
}