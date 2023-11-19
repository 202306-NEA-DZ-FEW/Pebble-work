import { useState, useEffect } from "react";
import { appWithTranslation } from "next-i18next";
import "typeface-rubik";
import { i18n } from "next-i18next.config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import Router from "next/router"; // import Router

import Layout from "@/layout/Layout";
import Loader from "@/components/Loader/Loader"; // import your Loader component

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
                <ToastContainer />
                {loading && <Loader />} {/* show Loader when loading */}
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default appWithTranslation(MyApp, { i18n });
