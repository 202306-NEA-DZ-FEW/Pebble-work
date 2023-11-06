import { appWithTranslation } from "next-i18next";
import "typeface-rubik";
import { i18n } from "next-i18next.config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import Layout from "@/layout/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Layout>
                <ToastContainer />
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}

export default appWithTranslation(MyApp, { i18n });
