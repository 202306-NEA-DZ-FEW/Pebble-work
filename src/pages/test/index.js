import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ChatDisplay from "@/components/Chat/ChatDisplay";
import Bubble from "@/components/Chat/Bubble";

const Test = () => {
    return (
        <div className='min-h-screen'>
            {/* <ChatDisplay /> */}
            <Bubble />
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
