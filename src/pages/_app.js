import { config } from "@fortawesome/fontawesome-svg-core";
import Router from "next/router";
import { appWithTranslation } from "next-i18next";
import { i18n } from "next-i18next.config";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false; //fixing the problem with icons not showing after adding <Head></Head>

import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

import Loader from "@/components/Loader/Loader";

import Layout from "@/layout/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let msg = "PebbleWork";
        let position = 0;

        function scrolltitle() {
            document.title = msg.substring(0, position);
            position++;
            if (position > msg.length) {
                // Reset title and stop scrolling
                document.title = "PebbleWork";
                return;
            }
            window.setTimeout(scrolltitle, 250);
        }

        scrolltitle();
    }, []);

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
            <NextSeo
                title='PebbleWork - Make a Difference'
                description='Join PebbleWork to participate in local volunteer events and make a difference in your community.'
                canonical='https://pebble-work.vercel.app/'
                openGraph={{
                    url: "https://pebble-work.vercel.app/",
                    title: "PebbleWork - Make a Difference",
                    description:
                        "Join PebbleWork to participate in local volunteer events and make a difference in your community.",
                    images: [
                        {
                            url: "/Volunteer.jpg",
                            width: 800,
                            height: 600,
                            alt: "Volunteer Image",
                        },
                        {
                            url: "/Homapage/Image (2).png",
                            width: 900,
                            height: 800,
                            alt: "Homepage Image",
                        },
                    ],
                    site_name: "PebbleWork",
                }}
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
                additionalMetaTags={[
                    {
                        name: "viewport",
                        content: "initial-scale=1.0, width=device-width",
                    },
                    {
                        name: "charset",
                        content: "utf-8",
                    },
                ]}
                additionalLinkTags={[
                    {
                        rel: "icon",
                        href: "/logo/Logo.png",
                    },
                ]}
            />
            <Layout>
                {loading && <Loader />}
                <ToastContainer />
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default appWithTranslation(MyApp, { i18n });
