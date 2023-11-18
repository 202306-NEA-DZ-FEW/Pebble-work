import styles from "@/styles/Wave.module.css";
const Wave = ({ height }) => {
    return (
        <>
            <div className='absolute bottom-0 z-[-1] w-screen'>
                <svg
                    viewBox='0 0 1320 500'
                    className={`h-[${height}px] w-[screen] ${styles.svg}`}
                >
                    /
                    <path
                        fillOpacity='0.4'
                        d='M0,192 C220,100,440,100,660,192 C880,290,1100,290,1320,192 L1320 500 L0 500'
                        fill='#2E7EAA'
                    />
                    <path
                        fillOpacity='0.3'
                        d='M0,192 C220,100,440,100,660,192 C880,290,1100,290,1320,192 L1320 500 L0 500'
                        fill='#2E7EAA'
                    />
                    <path
                        fillOpacity='0.2'
                        d='M0,192 C220,100,440,100,660,192 C880,290,1100,290,1320,192 L1320 500 L0 500'
                        fill='#2E7EAA'
                    />
                </svg>
            </div>
        </>
    );
};

export default Wave;
