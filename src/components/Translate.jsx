import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

function HomePage() {
    const { t } = useTranslation();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className='pt-40'>
            <h1>{isClient ? "This is never prerendered" : "Prerendered"}</h1>
            <nav>
                <ul>
                    <li>{t("about")}</li>
                    <li>{t("contact")}</li>
                </ul>
            </nav>
        </div>
    );
}

export default HomePage;
