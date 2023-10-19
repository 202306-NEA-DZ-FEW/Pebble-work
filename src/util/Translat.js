import { useRouter } from "next/router";
import en from "@/components/locales/en/en";
import ar from "@/components/locales/ar/ar";

const Translat = (initialLocale) => {
    const router = useRouter();
    const { locale } = router;
    const t = locale === "en" ? en : ar;
    const dir = initialLocale === "ar" ? "rtl" : "ltr";

    return { t, dir };
};

export default Translat;
