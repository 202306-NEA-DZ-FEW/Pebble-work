import { appWithTranslation } from "next-i18next";
import "typeface-rubik";

import "@/styles/globals.css";

import Layout from "@/layout/Layout";

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default appWithTranslation(MyApp);
