import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import styles from "@/styles/NoEvent.module.css";
import { useRouter } from "next/router";

const NoEvent = () => {
    const router = useRouter();
    const videoOptions = {
        playerVars: {
            autoplay: 1,
            volume: 40,
            // mute:1,
        },
    };

    const onReady = (event) => {
        event.target.playVideo();
    };
    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            router.push("/events");
        }, 10000);

        return () => clearTimeout(redirectTimeout);
    }, [router]);
    return (
        <div
            className={`${styles.container} flex h-screen flex-col justify-center items-center`}
        >
            <div
                className={`${styles.background} text-red-600 text-center text-[100px]`}
            >
                Event deleted or never existed
            </div>
            <h1>Oops! Page Not Found</h1>

            <p>Looks like you ve stumbled upon a page that doesnt exist.</p>
            <p>Dont worry, even the best developers get lost sometimes!</p>
            <p>Here are a few things you can try:</p>
            <ul>
                <li>Double-check the URL for any typos.</li>
                <li>Go back to the previous page and try again.</li>
                <li>
                    Click on the navigation menu to find what you are looking
                    for.
                </li>
            </ul>
            <p>
                If all else fails, take a break and enjoy this funny cat video:
            </p>
            <YouTube
                videoId='J---aiyznGQ'
                opts={videoOptions}
                onReady={onReady}
            />
        </div>
    );
};

export default NoEvent;
