import Router from "next/router"; // import Router
import { appWithTranslation } from "next-i18next";
import { i18n } from "next-i18next.config";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

import Loader from "@/components/Loader/Loader"; // import your Loader component

import Layout from "@/layout/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = () => setLoading(true);
        const end = () => setLoading(false);

        // add event listeners for route changes
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);

        return () => {
            // remove event listeners if component unmounts
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);

    return (
        <>
            <Layout>
                {loading && <Loader />} {/* show Loader when loading */}
                <ToastContainer />
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default appWithTranslation(MyApp, { i18n });
