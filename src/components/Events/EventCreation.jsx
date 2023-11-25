import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/styles/EventCreation.module.css";

import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";

const EventCreation = () => {
    const { t } = useTranslation();
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let raindrops = [];

        const createRaindrop = () => {
            const x = Math.random() * canvas.width;
            const y = 0;
            const speed = Math.random() * 5 + 2;
            const size = Math.random() * 30 + 10;

            raindrops.push({ x, y, speed, size });
        };

        const updateRaindrops = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            raindrops.forEach((raindrop, index) => {
                raindrop.y += raindrop.speed;

                const raindropImage = new Image();
                raindropImage.src = "/Raindrop.png";

                ctx.drawImage(
                    raindropImage,
                    raindrop.x,
                    raindrop.y,
                    raindrop.size,
                    raindrop.size
                );

                if (raindrop.y > canvas.height) {
                    raindrops.splice(index, 1);
                }
            });

            requestAnimationFrame(updateRaindrops);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        const raindropInterval = setInterval(createRaindrop, 100);

        updateRaindrops();

        return () => {
            clearInterval(raindropInterval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <div className='relative flex items-left h-full overflow-hidden z-10 mb-[4rem]'>
                <div className='absolute w-full top-40 p-4 flex flex-col bg-white bg-opacity-70 border rounded-[8px]'>
                    <p className='text-red-600'>{t("events:pageTitle")}</p>

                    <div className='flex flex-col'>
                        <p className='text-green-400'>
                            {t("events:joinDescription")}
                        </p>
                        <div className='flex gap-12 justify-center items-center mx-auto mt-3'>
                            <div>
                                <Signin />
                            </div>
                            <Signup />
                        </div>
                    </div>
                </div>
                <canvas
                    ref={canvasRef}
                    className={`${styles.movingImage} shadow-2xl bg-cover bg-center bg-no-repeat w-full h-full z-[-10]`}
                    style={{
                        backgroundImage: `url('/Homepage/Oxfams-COVID-19-Relief-Efforts 2.png')`,
                    }}
                ></canvas>
            </div>
        </>
    );
};

export default EventCreation;
