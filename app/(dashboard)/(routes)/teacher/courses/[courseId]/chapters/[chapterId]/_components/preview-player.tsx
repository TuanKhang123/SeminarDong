"use client"

import {
  MediaControlBar,
  MediaController,
  MediaPlayButton,
  MediaRenditionMenu,
  MediaRenditionMenuButton,
  MediaTimeRange,
  MediaVolumeRange
} from "media-chrome/react";
import { MediaProvider } from "media-chrome/react/media-store";
import HlsVideo from "./hls-video";

interface PreviewPlayerProps {
  videoId: string,
};

const PreviewPlayer = ({ videoId }: PreviewPlayerProps) => {
  return (
    <MediaProvider>
      <MediaController>
        <HlsVideo
          src={`http://localhost:5000/api/video/${videoId}`}
          slot="media"
          crossorigin
        />
        <MediaRenditionMenu hidden anchor="auto" />
        <MediaControlBar>
          <MediaPlayButton />
          <MediaVolumeRange/>
          <MediaTimeRange />
          <MediaRenditionMenuButton/>
        </MediaControlBar>
      </MediaController>
    </MediaProvider>
  );
}

export default PreviewPlayer;