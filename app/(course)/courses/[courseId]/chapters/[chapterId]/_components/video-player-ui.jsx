'use client'
import PropTypes from "prop-types";
// import { Hls } from "hls.js"
// import { useRef } from "react";
// import { useEffect } from "react";
import { FaPlay } from "react-icons/fa";

import {
    MediaController,
    MediaControlBar,
    MediaTimeRange,
    MediaTimeDisplay,
    MediaVolumeRange,
    MediaPlayButton,
    MediaSeekBackwardButton,
    MediaSeekForwardButton,
    MediaMuteButton,
} from "media-chrome/dist/react";

// import "hls-video-element";

const mockApi = "https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg.m3u8";

const VideoPlayerUI = () => {
    return (
        <div className="wrapper">
            <media-controller className='wrapper-media'>
                <hls-video
                    // ref={videoRef}
                    src={mockApi}
                    slot="media"
                    crossorigin
                    muted
                ></hls-video>
                <media-play-button className='' slot="centered-chrome"></media-play-button>
                <media-loading-indicator slot="centered-chrome" noautohide></media-loading-indicator>
                <media-rendition-menu hidden id="menu1" anchor="menu-button1"></media-rendition-menu>
                <media-control-bar>
                    <media-play-button></media-play-button>
                    <media-seek-backward-button></media-seek-backward-button>
                    <media-seek-forward-button ></media-seek-forward-button>
                    <media-mute-button></media-mute-button>
                    <media-volume-range></media-volume-range>
                    <media-time-range></media-time-range>
                    <media-time-display showduration remaining></media-time-display>
                    <media-rendition-menu-button></media-rendition-menu-button>
                    <media-playback-rate-button></media-playback-rate-button>
                    <media-fullscreen-button></media-fullscreen-button>
                </media-control-bar>
            </media-controller>
        </div>
    );
}

export default VideoPlayerUI;