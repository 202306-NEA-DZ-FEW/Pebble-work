import * as React from "react";
import Navbar from "@/components/Navbar/Navbar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
