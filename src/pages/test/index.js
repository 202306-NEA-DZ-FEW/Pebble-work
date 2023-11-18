import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "@/styles/Wave.module.css";
const Wave = () => {
    return (
        <div className='wrapper'>
            <svg viewBox='0 0 1320 500' className={styles.svg}>
                /
                <path
                    fillOpacity='0.7'
                    d='M0,192 C220,100,440,100,660,192 C880,290,1100,290,1320,192 L1320 500 L0 500'
                    fill='#00d2d3'
                />
                <path
                    fillOpacity='0.5'
                    d='M0,192 C220,100,440,100,660,192 C880,290,1100,290,1320,192 L1320 500 L0 500'
                    fill='#00d2d3'
                />
                <path
                    fillOpacity='0.4'
                    d='M0,192 C220,100,440,100,660,192 C880,290,1100,290,1320,192 L1320 500 L0 500'
                    fill='#00d2d3'
                />
            </svg>
        </div>
    );
};

export default Wave;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "about"])),
            // Will be passed to the page component as props
        },
    };
}
