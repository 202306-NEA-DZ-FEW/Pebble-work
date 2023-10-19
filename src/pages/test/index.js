import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Translat from "../../util/Translat";

const HomePage = (props) => {
    const { t, dir } = Translat(props._nextI18Next.initialLocale);

    return (
        <div className='pt-40' dir={dir}>
            <p className='text-3xl font-futuraBlack'>{t.test}</p>
            <p className='text-3xl font-futuraBlack'>{t.player}</p>
            <p className='text-3xl font-futuraBlack'>{t.about}</p>
        </div>
    );
};

export default HomePage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
