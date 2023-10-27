import styles from "@/styles/Homepage.module.css";

export default function HeaderCard() {
    return (
        <>
            <div
                className={`${styles.change} flex flex-row bg-white shadow-lg items-center justify-center gap-2 mb-8 xl:w-[1222px] xl:h-[750px] lg:w-[960px] lg:h-[500px] md:w-[777px] md:h-[370px] sm:w-[666px] sm:h-[330px] w-[466px] h-[300px] `}
            >
                <div className={`${styles.text}`}>
                    <div
                        style={{ wordWrap: "break-word" }}
                        className='flex flex-col justify-center items-start gap-3 lg:w-[488px] w-[150px] sm:w-[318px] sm:h-[218px] md:w-[388px] md:h-[274px] lg:h-[374px] overflow-clip'
                    >
                        <h5 className='text-[#1A1A1A] sm:text-[32px] text-[13px] lg:text-[48px] sm:leading-[32px] sm:tracking-[0.11px] font-[500] lg:leading-[44px] lg:tracking-[0.18px] break-words '>
                            Making a change, <br />
                            Together
                        </h5>
                        <p className='text-[#878787] sm:text-[18px] text-[10px]  lg:text-[24px] font-[400] lg:leading-[30px] lg:tracking-[0.10px] break-words '>
                            We believe that anyone has the power to make an
                            impact: Through this platform we strive to create a
                            place where people come together and work to change
                            the world. This is PebbleWork.
                        </p>
                        <button className='text-center bg-[#2F7DA9] hover:bg-[#38779b] sm:w-[88px] sm:h-[22px] w-[60px] h-[16px] sm:text-[13px] text-[10px] rounded-[8px] lg:w-[134px] lg:h-[30px] text-white lg:text-[18px] mt-3'>
                            Get Started
                        </button>
                    </div>
                </div>
                <div
                    className={`${styles.slideleft} ${styles.image} xl:h-[638px] xl:w-[638px] lg:w-[418px] md:w-[318px] w-[278px] flex items-center justify-center`}
                >
                    <img
                        className={`${styles.img}`}
                        src='/Homepage/Square.png'
                    ></img>
                </div>
            </div>
        </>
    );
}
