"use-client"

import { useMediaSelector } from "media-chrome/react/media-store"
import { useEffect, useRef } from "react";

interface SaveProgressProps {
    callback: (body: any) => Promise<void>;
}

export const SaveProgress = ({ callback }: SaveProgressProps) => {
    const currentTime = useMediaSelector((state) => state.mediaCurrentTime);
    const timeRef = useRef<number>();
    timeRef.current = currentTime;

    useEffect(() => {
        const interval = setInterval(() => callback({
            time: timeRef.current,
        }), 10000);

        return () => {
            clearInterval(interval);
        }
    }, [callback]);

    return undefined;
}