"use client"

import "hls-video-element";
import { useMediaRef } from "media-chrome/react/media-store";
import { createElement } from "react";


const HlsVideo = (props : any) => {
    const { children, component = "hls-video", ...restProps } = props;

    const mediaRefCallback = useMediaRef();

    return createElement(
        component,
        { ref: mediaRefCallback, ...restProps },
        children,
    );
}

export default HlsVideo;