import Image from "next/image";
import React from "react";
import { useTranslation } from "next-i18next";
import styles from "@/styles/about.module.css";
import Members from "@/components/Cards/Aboutus/Members";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const AboutPage = () => {
    const { t } = useTranslation();
    const members = [
        {
            imageSrc: "https://avatars.githubusercontent.com/u/137820288?v=4",
            name: "Halla Hamidi",
            google: "https://mail.google.com/mail/u/0/?fs=1&to=aniabisso.16@gmail.com&tf=cm",
            linkedin: "https://www.linkedin.com/in/halla-hamidi-989197229/",
            github: "https://github.com/Halla24",
        },
        {
            imageSrc: "https://avatars.githubusercontent.com/u/137835769?v=4",
            name: "Takieddine Dilmi",
            google: "https://mail.google.com/mail/u/0/?fs=1&to=angeldilmi@gmail.com&tf=cm",
            linkedin: "https://www.linkedin.com/in/takidilmi/",
            github: "https://github.com/takidilmi",
        },
        {
            imageSrc: "https://avatars.githubusercontent.com/u/95043080?v=4",
            name: "Manel H.Haddoud",
            google: "https://mail.google.com/mail/u/0/?fs=1&to=manelhasnahaddoud@gmail.com&tf=cm",
            linkedin:
                "https://www.linkedin.com/in/manel-hasna-haddoud-aa5095278/",
            github: "https://github.com/hasnahadd",
        },
        {
            imageSrc: "https://avatars.githubusercontent.com/u/64746106?v=4",
            name: "Youssouf Sergma",
            google: "https://mail.google.com/mail/u/0/?fs=1&to=sergmayoussouf@gmail.com&tf=cm",
            linkedin: "https://www.linkedin.com/in/sergma/",
            github: "https://github.com/ysergma",
        },
        {
            imageSrc: "https://avatars.githubusercontent.com/u/138169337?v=4",
            name: "Louisa Hamrit",
            google: "https://mail.google.com/mail/u/0/?fs=1&to=l19.45.127.0@gmail.com&tf=cm",
            linkedin: "https://www.linkedin.com/in/louisa-h-958733294/",
            github: "https://github.com/Polichinell",
        },
    ];

    return (
        <>
            <div
                className={`flex flex-col items-center justify-center overflow-hidden`}
            >
                <div
                    style={{
                        backgroundImage: `url(/images/AboutPebble.png)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className='2xl:max-w-[1440px] xl:h-[780px] lg:max-w-[1233px] lg:h-[630px] md:min-h-[575px] mb-10 pb-4 w-[100vw] min-h-[363px] flex flex-col items-center justify-center'
                >
                    {/* <Image
                        className={`${styles.topImage} xl:w-[1440px] xl:h-[780px] lg:w-[1233px] lg:h-[630px] md:h-[575px] w-[100vw] h-[363px]`}
                        src='/images/AboutPebble.png'
                        alt='Pebbles'
                        width={1440}
                        height={780}
                    /> */}

                    <div className={`flex flex-col flex-wrap items-center`}>
                        <h1
                            className={`${styles.text0} text-center ${styles.slideInFromRight1}`}
                        >
                            {t("about:about:title")}
                        </h1>
                        <p
                            className={`${styles.text1} ${styles.slideInFromRight1} flex text-center text-[#878787] px-4`}
                        >
                            {t("about:about.description")}
                        </p>
                    </div>
                </div>
                <div
                    className={`${styles.teamContainer} w-[1200px] pt-8 min-h-[500px] md:min-h-[800px] xl:min-h-[1050px] rounded-[20px] flex flex-col items-center bg-[#fbc495] bg-opacity-70 `}
                >
                    <h2
                        className={`${styles.teamText} text-[40px] text-[#1A1A1A]`}
                    >
                        {t("about:about:ourTeam")}
                    </h2>
                    <Members members={members} />
                </div>
                <div
                    id='tech-stack'
                    className={`${styles.slideInFromRight1} mb-10 mt-10 2xl:max-w-[1440px] lg:max-w-[1233px] flex flex-col items-center text-center`}
                >
                    <h6 className={`${styles.techText}`}>
                        {t("about:about:techStack")}
                    </h6>
                    <h5 className={`${styles.techText1}`}>
                        {t("about:about:techStackTitle")}
                    </h5>
                    <h2 className={`${styles.techText2}`}>
                        {t("about:about:techStackDescription")}
                    </h2>
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
