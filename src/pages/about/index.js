import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useCallback, useEffect, useRef } from "react";

import styles from "@/styles/about.module.css";

import Members from "@/components/Cards/Aboutus/Members";
import TechStack from "@/components/Cards/Aboutus/TechStack";
import Wave from "@/components/Wave";

const AboutPage = () => {
    const { t } = useTranslation();
    const members = [
        {
            imageSrc: "https://avatars.githubusercontent.com/u/137820288?v=4",
            description:
                "I'am a passionate Frontend Web Developer and freelance translator. I have a proven track record of building various websites that captivate users.",
            name: "Halla Hamidi",
            google: "https://mail.google.com/mail/u/0/?fs=1&to=aniabisso.16@gmail.com&tf=cm",
            linkedin: "https://www.linkedin.com/in/halla-hamidi-989197229/",
            github: "https://github.com/Halla24",
        },
        {
            imageSrc: "https://avatars.githubusercontent.com/u/137835769?v=4",
            name: "Takieddine Dilmi",
            description:
                "I am an aspiring Frontend Developer, passionate about honing my skills in frontend development and contributing to the ever-evolving digital landscape.",
            google: "https://mail.google.com/mail/u/0/?fs=1&to=angeldilmi@gmail.com&tf=cm",
            linkedin: "https://www.linkedin.com/in/takidilmi/",
            github: "https://github.com/takidilmi",
        },
        {
            imageSrc: "https://avatars.githubusercontent.com/u/64746106?v=4",
            name: "Youssouf Sergma",
            description:
                "I'm a front-end developer, problem-solving, organized, and detail-oriented professional with a proven track record of success in both web development and administrative roles. ",
            google: "https://mail.google.com/mail/u/0/?fs=1&to=sergmayoussouf@gmail.com&tf=cm",
            linkedin: "https://www.linkedin.com/in/sergma/",
            github: "https://github.com/ysergma",
        },
        {
            imageSrc: "https://avatars.githubusercontent.com/u/95043080?v=4",
            name: "Manel H.Haddoud",
            description:
                "I'm a front-end developer with a background in networking and computer science. I am very passionate about technology, organizing and encouraging teamwork.",
            google: "https://mail.google.com/mail/u/0/?fs=1&to=manelhasnahaddoud@gmail.com&tf=cm",
            linkedin:
                "https://www.linkedin.com/in/manel-hasna-haddoud-aa5095278/",
            github: "https://github.com/hasnahadd",
        },
        {
            imageSrc: "https://avatars.githubusercontent.com/u/138169337?v=4",
            name: "Louisa Hamrit",
            description:
                "I'm a front-end developer with a certain interest for crafting engaging and appealing digital experiences.",
            google: "https://mail.google.com/mail/u/0/?fs=1&to=l19.45.127.0@gmail.com&tf=cm",
            linkedin: "https://www.linkedin.com/in/louisa-h-958733294/",
            github: "https://github.com/Polichinell",
        },
    ];
    const scrollContainerRef = useRef();
    let lastScrollTop = 0;
    const onScroll = useCallback((e) => {
        let st = e.target.scrollTop;
        if (st < lastScrollTop) {
            e.target.scrollTop = lastScrollTop;
        } else {
            lastScrollTop = st;
        }
    }, []);

    useEffect(() => {
        scrollContainerRef.current.addEventListener("scroll", onScroll);

        return () => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.removeEventListener(
                    "scroll",
                    onScroll,
                );
            }
        };
    }, [onScroll]);

    return (
        <>
            <div
                className={`flex flex-col text-justify items-center justify-center overflow-hidden z-[5] relative`}
            >
                <Wave height={850} />

                <div
                    style={{
                        backgroundImage: `url(/images/AboutPebble.png)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                        zIndex: 0,
                    }}
                    className='2xl:max-w-[1440px] xl:h-[780px] lg:max-w-[1233px] lg:h-[630px] md:min-h-[575px] mb-10 pb-4 w-[100vw] min-h-[363px] flex flex-col items-center justify-center'
                >
                    <div className={`flex flex-col flex-wrap items-center`}>
                        <h1
                            className={`${styles.text0} ${styles.slideInFromRight1}`}
                        >
                            {t("about:about:title")}
                        </h1>
                        <p
                            className={`${styles.text1} ${styles.slideInFromRight1} flex px-4 mt-[2rem] bg-[#e6f5e4] bg-opacity-50 p-10 mx-5 rounded-xl`}
                        >
                            <span className='text-black'>
                                {" "}
                                {t("about:about.description")}
                            </span>
                        </p>
                    </div>
                </div>
                <div
                    ref={scrollContainerRef}
                    className={`md:w-[755px] sm:w-[630px] w-[80vw] lg:h-[600px] sm:h-[400px] h-[800px] rounded-[8px] flex flex-col items-center`}
                >
                    <h2
                        className={`${styles.teamText} text-[40px] text-[#1A1A1A]`}
                    >
                        {t("about:about:ourTeam")}
                    </h2>
                    <p className='text-center'>{t("about:about:teamIntro")}</p>
                    <Members
                        members={members}
                        scrollContainerRef={scrollContainerRef}
                    />
                </div>
                <div
                    id='tech-stack'
                    className={`${styles.slideInFromRight1} text-center relative h-[550px] w-96 flex justify-center flex-col items-center`}
                >
                    <TechStack />
                    <div style={{ position: "absolute" }}>
                        <h6 className={`${styles.techText} mb-5`}>
                            {t("about:about:techStack")}
                        </h6>
                        <h5 className={`${styles.techText1}`}>
                            {t("about:about:techStackTitle")}
                        </h5>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "about"])),
            // Will be passed to the page component as props
        },
    };
}
