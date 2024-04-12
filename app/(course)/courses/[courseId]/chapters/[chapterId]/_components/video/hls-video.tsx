"use client"

import "hls-video-element";
import { MediaActionTypes, useMediaDispatch, useMediaRef, useMediaSelector } from "media-chrome/react/media-store";
import { DetailedHTMLProps, VideoHTMLAttributes, createElement, useCallback, useEffect, useRef } from "react";



const HlsVideo = (props: DetailedHTMLProps<
    VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
> ) => {
    const mediaRefCallback = useMediaRef();

    return createElement(
        "hls-video",
        {
            ...props,
            ref: mediaRefCallback,
        }
    );
}

export default HlsVideo;