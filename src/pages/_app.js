import { appWithTranslation } from "next-i18next";
import "typeface-rubik";
import { i18n } from "next-i18next.config";

import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp, { i18n });
