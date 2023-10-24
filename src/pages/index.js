import Link from "next/link";

import * as React from "react";

import HomeCards from "@/components/HomeCards";

export default function HomePage() {
    return (
        <main>
            <HomeCards /> {/* Render the HomeCards component here */}
            <i class='fa-solid fa-language fa-2xl'></i>
        </main>
    );
}
