import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

export default function HomePage(props) {
    const { initialLocale } = props._nextI18Next;
    const { t } = useTranslation("common");

    return (
        <>
            <main
                className='mt-20'
                dir={initialLocale === "ar" ? "rtl" : "ltr"}
            >
                <p className='text-3xl font-futuraBlack'>{t("test")}</p>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                    }}
                >
                    <Link href='/' locale='en'>
                        English
                    </Link>
                    <Link href='/' locale='ar'>
                        العربية
                    </Link>
                </div>
            </main>
        </>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
