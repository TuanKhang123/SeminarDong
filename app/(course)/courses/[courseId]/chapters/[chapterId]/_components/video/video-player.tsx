"use client";

import {
  MediaProvider,
  useMediaRef,
  useMediaSelector,
  useMediaDispatch,
  MediaActionTypes,
} from "media-chrome/react/media-store";
import HlsVideo from "./hls-video";
import {
  MediaControlBar,
  MediaController,
  MediaPlayButton,
  MediaTimeRange,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaVolumeRange,
  MediaTimeDisplay,
  MediaFullscreenButton,
  MediaSettingsMenuButton,
  MediaSettingsMenu,
  MediaSettingsMenuItem,
  MediaPlaybackRateMenu,
  MediaRenditionMenu,
} from "media-chrome/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useForm, Controller } from "react-hook-form";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { ButtonListNotes } from "../btn-list-note";
const ReactQuill = dynamic(() => import("react-quill"), {
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
});

interface ButtonAddNoteProps {
  chapterId: string;
  courseId: string;
  setTimeNote: any;
}
const customizeTime = (time: any) => {
  const roundedTime = Math.floor(time);

  let minutes = Math.floor(roundedTime / 60);
  let seconds = roundedTime % 60;
  const formatMinutes = minutes.toString().padStart(2, "0");
  const formatSeconds = seconds.toString().padStart(2, "0");

  return `${formatMinutes}:${formatSeconds}`;
};
const ButtonAddNote = ({
  courseId,
  chapterId,
  setTimeNote,
}: ButtonAddNoteProps) => {
  const router = useRouter();

  const currentTime = useMediaSelector((state) => state.mediaCurrentTime);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const TimeCustomize = customizeTime(currentTime);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { handleSubmit, control, setValue } = useForm();

  const onSubmit = async (data: any) => {
    setTimeNote(3);
    try {
      console.log(data);

      if (currentTime !== undefined) {
        if (data?.bio !== undefined && data?.bio !== "") {
          const response = await axios.post(
            `/api/courses/${courseId}/chapters/${chapterId}/note`,
            {
              content: data?.bio,
              createAt: parseFloat(currentTime?.toFixed(1)),
            }
          );
          toast.success("Note created");
          setIsDialogOpen(!isDialogOpen);
          setValue("bio", "");
          router.refresh();
        } else {
          toast.error("Content must be at least 1 characters.");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(!isDialogOpen)}>Add note</Button>
      </DialogTrigger>

      <DialogContent className="max-w-7xl bottom-0 translate-x-[-50%] left-[50%]">
        <p className="text-lg">
          {`Add note at:`} <strong>{`${TimeCustomize}`}</strong>{" "}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
          <Controller
            control={control}
            name="bio"
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                defaultValue=""
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          <div className="flex justify-end gap-5">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDialogOpen(!isDialogOpen)}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface VideoPlayerProps {
  videoId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  notes: any;
}

const VideoPlayer = ({
  videoId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
  notes,
}: VideoPlayerProps) => {
  const [timeNote, setTimeNote] = useState();

  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="relative aspect-video">
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MediaProvider>
          <MediaController className="w-full h-full">
            <HlsVideo
              // src={`http://localhost:5000/api/video/${videoId}`}
              src="https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg.m3u8"
              slot="media"
              onEnded={onEnd}
              preload="metadata"
            />

            <MediaSettingsMenu hidden anchor="auto">
              <MediaSettingsMenuItem>
                Speed
                <MediaPlaybackRateMenu slot="submenu" hidden>
                  <div slot="title">Speed</div>
                </MediaPlaybackRateMenu>
              </MediaSettingsMenuItem>
              <MediaSettingsMenuItem>
                Quality
                <MediaRenditionMenu slot="submenu" hidden>
                  <div slot="title">Quality</div>
                </MediaRenditionMenu>
              </MediaSettingsMenuItem>
            </MediaSettingsMenu>

            <MediaControlBar>
              <MediaPlayButton />
              <MediaSeekBackwardButton />
              <MediaSeekForwardButton />
              <MediaMuteButton />
              <MediaVolumeRange />
              <MediaTimeRange />
              <MediaTimeDisplay showduration />
              <MediaSettingsMenuButton />
              <MediaFullscreenButton />
            </MediaControlBar>
          </MediaController>
          <div className="flex justify-end gap-5 mt-10">
            <ButtonListNotes
              chapterId={chapterId}
              courseId={courseId}
              notes={notes}
            ></ButtonListNotes>

            <ButtonAddNote
              chapterId={chapterId}
              courseId={courseId}
              setTimeNote={setTimeNote}
              // currentTime={currentTime ? currentTime : 0}
            ></ButtonAddNote>
          </div>
        </MediaProvider>
      )}
    </div>
  );
};

export default VideoPlayer;
