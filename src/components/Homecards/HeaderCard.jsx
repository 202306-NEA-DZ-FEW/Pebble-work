import styles from "@/styles/Homepage.module.css";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function HeaderCard() {
    const { t } = useTranslation();

    return (
        <>
            <div
                className={`${styles.change} flex flex-row shadow-md items-center justify-center gap-2 mb-8 xl:w-[1222px] xl:min-h-[750px] lg:w-[960px] lg:min-h-[500px] md:w-[777px] md:min-h-[370px] sm:w-[666px] sm:min-h-[330px] w-[466px] min-h-[300px] `}
            >
                <div className={`${styles.text}`}>
                    <div
                        style={{ wordWrap: "break-word" }}
                        className={`${styles.text} flex flex-col justify-center items-start gap-3 lg:w-[488px] w-[150px] sm:w-[318px] sm:min-h-[218px] md:w-[388px] md:min-h-[274px] lg:min-h-[374px] overflow-clip`}
                    >
                        <h5 className='text-[#1A1A1A] md:text-[32px] sm:text-[24px] text-[13px] lg:text-[48px] sm:leading-[32px] sm:tracking-[0.11px] font-[500] lg:leading-[44px] lg:tracking-[0.18px] break-words '>
                            {t("common:headerCard:title")}
                        </h5>
                        <p className='text-[#878787] md:text-[18px] sm:text-[16px] text-[10px]  lg:text-[24px] font-[400] lg:leading-[30px] lg:tracking-[0.10px] break-words '>
                            {t("common:headerCard:description")}
                        </p>
                        <button className='text-center bg-[#2F7DA9] hover:bg-[#38779b] sm:w-[88px] sm:h-[22px] w-[60px] h-[16px] sm:text-[13px] text-[10px] rounded-[4px] lg:w-[120px] lg:h-[30px] text-white lg:text-[18px] mt-3'>
                            {t("common:headerCard:button")}
                        </button>
                    </div>
                </div>
                <div
                    className={`${styles.slideleft} ${styles.image} xl:h-[638px] xl:w-[638px] lg:w-[418px] md:w-[318px] w-[278px] flex items-center justify-center`}
                >
                    <Image
                        width={638}
                        height={638}
                        alt='homeCard'
                        fetchpriority='high'
                        className={`${styles.img}`}
                        src='/Homepage/Square.png'
                    ></Image>
                </div>
            </div>
        </>
    );
}
