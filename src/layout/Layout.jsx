import * as React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function Layout({ children, initialLocale }) {
    return (
        <>
            <Navbar />

            <main dir={initialLocale === "ar" ? "rtl" : "ltr"}>{children}</main>
            <Footer />
        </>
    );
}
