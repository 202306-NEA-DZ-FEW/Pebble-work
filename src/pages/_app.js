import { appWithTranslation } from "next-i18next";
import "typeface-rubik";
import { i18n } from "next-i18next.config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

import Layout from "@/layout/Layout";

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <ToastContainer />
            <Component {...pageProps} />
        </Layout>
    );
}

export default appWithTranslation(MyApp, { i18n });
