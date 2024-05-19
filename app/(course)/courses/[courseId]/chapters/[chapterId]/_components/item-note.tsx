"use client";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from '@/components/ui/button';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { ConfirmModal } from "@/components/modals/confirm-modal";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

interface ItemNoteProps {
    note: any;
    onSeek:  (time: number) => void;
};

export const ItemNote = ({
    note,
    onSeek
}: ItemNoteProps) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [openQuill, setOpenQuill] = useState<boolean>(false)
    const [quillContent, openQuillContent] = useState(note?.content || '')

    const handleQuillChange = (content: string) => {
        openQuillContent(content)
    }
    const {  handleSubmit, control } = useForm();
    const FormSchema = z.object({
        bio: z
            .string()
            .min(1, {
                message: "Bio must be at least 1 characters.",
            })
            .max(160, {
                message: "Bio must not be longer than 30 characters.",
            }),
    })
    const ReactQuill = dynamic(() => import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading...</p>, // Hiển thị khi component đang load
    });
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const customizeTime = (time: number) => {
        const roundedTime = Math.floor(time)

        let minutes = Math.floor(roundedTime / 60)
        let seconds = roundedTime % 60;
        const formatMinutes = minutes.toString().padStart(2, '0')
        const formatSeconds = seconds.toString().padStart(2, '0')

        return `${formatMinutes}:${formatSeconds}`
    }

    const handleUpdate = () => {
        setOpenQuill(!openQuill)
    }

    const onDelete = async () => {
        try {

            await axios.delete(`/api/courses/${note?.courseId}/chapters/${note?.chapterId}/note/${note?.id}`);
            toast.success("Note deleted");
            router.refresh();
        } catch (e) {
            console.log(e);

            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    const onSubmit = async (data: any) => {
        try {
            console.log(data.bio);
            if (data?.bio === '<p><br></p>') {
                toast.error("Must be at least 1 characters");
            }
            else {
                await axios.patch(`/api/courses/${note?.courseId}/chapters/${note?.chapterId}/note/${note?.id}`, data)
                toast.success("Note updated");
                router.refresh();
                setOpenQuill(!openQuill)
            }
        } catch (error) {
            console.log(error);
        }
    }

   
    return (
        <div className="mt-8">
            <div className="flex items-center justify-between align">

                <Button onClick={() => onSeek(note?.time)} className='bg-red-600 w-15 h-7 rounded-2xl hover:bg-red-400'>{customizeTime(note?.time)}</Button>

                <div className="flex gap-3 items-center ">
                    <Button size="sm" variant="secondary" onClick={() => handleUpdate()} >
                        <Pencil
                            className="h-4 w-4"
                        />
                    </Button>

                    <ConfirmModal onConfirm={onDelete}>
                        <Button variant="secondary" size="sm" disabled={isLoading}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </ConfirmModal>

                </div>
            </div>
            {
                openQuill
                    ?
                    (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
                            <Controller
                                control={control}
                                name="bio"
                                render={({ field }) => (
                                    <ReactQuill
                                        theme="snow"
                                        defaultValue={note?.content}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                            <div className="flex justify-end gap-5">
                                <Button type="button" variant='secondary' onClick={() => setOpenQuill(!openQuill)}>Cancel</Button>
                                <Button type="submit">Update</Button>
                            </div>
                        </form>
                    )
                    : (<div
                        className={`bg-gray-100 rounded-sm p-5 mt-4 `}
                        dangerouslySetInnerHTML={{ __html: note?.content }}
                    >
                    </div>)
            }
        </div>
    )
}