import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ChatDisplay from "@/components/Chat/ChatDisplay";
import Chat from "@/components/Chat/Chat";

const Test = () => {
    return (
        <div>
            <ChatDisplay />
            <Chat />
        </div>
    );
};

export default Test;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "about"])),
            // Will be passed to the page component as props
        },
    };
}
