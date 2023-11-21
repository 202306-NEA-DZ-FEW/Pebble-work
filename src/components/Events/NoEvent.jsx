import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import YouTube from "react-youtube";

import styles from "@/styles/NoEvent.module.css";

const NoEvent = () => {
    const router = useRouter();

    const { t } = useTranslation("noEvent");

    const videoOptions = {
        playerVars: {
            autoplay: 1,
            volume: 40,
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
                {t("events:noFoundPageTitle")}
            </div>
            <h1>{t("events:notFoundTitle")}</h1>
            <p>{t("events:notFoundDescription1")}</p>
            <p>{t("events:notFoundDescription2")}</p>
            <p>{t("events:notFoundSuggestions")}</p>
            <ul>
                <li>{t("events:suggestion1")}</li>
                <li>{t("events:suggestion2")}</li>
                <li>{t("events:suggestion3")}</li>
            </ul>
            <p>{t("events:catVideoDescription")}</p>
            <YouTube
                videoId='J---aiyznGQ'
                opts={videoOptions}
                onReady={onReady}
            />
        </div>
    );
};

export default NoEvent;
