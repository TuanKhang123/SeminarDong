"use client"

import { MediaProvider, useMediaRef, useMediaSelector } from "media-chrome/react/media-store";
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
import { useState } from "react";

interface VideoPlayerProps {
  videoId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

const VideoPlayer = ({
  videoId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [openVolume, setOpenVolume] = useState<boolean>(false)

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  }
  console.log(openVolume);

  console.log(`video ID: ${videoId}`);

  return (
    <div className="relative aspect-video">
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            This chapter is locked
          </p>
        </div>
      )}
      {!isLocked && (
        <MediaProvider >
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
        </MediaProvider>
      )}
    </div>

  );
}

export default VideoPlayer;