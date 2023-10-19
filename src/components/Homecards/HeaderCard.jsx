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
                            Medium title placeholder text
                        </h5>
                        <p className='text-[#878787] sm:text-[18px] text-[10px]  lg:text-[24px] font-[400] lg:leading-[30px] lg:tracking-[0.10px] break-words '>
                            Body placeholder for text paragraph. A paragraph is
                            a self-contained unit of text dealing with a
                            particular point or idea.
                        </p>
                        <button className='text-center bg-[#2F7DA9] hover:bg-[#38779b] sm:w-[88px] sm:h-[22px] w-[60px] h-[16px] sm:text-[13px] text-[10px] rounded-[8px] lg:w-[134px] lg:h-[30px] text-white lg:text-[18px]'>
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
// export default function HeaderCard() {
//     const cardStyle = {
//         backgroundColor: "#FFFFFF",
//         color: "#003F62",
//         maxWidth: "100%",
//         height: "auto",
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//     };

//     const handleButtonClick = () => {
//         window.location.href = "/target-page";
//     };

//     return (
//         <div className='flex items-center justify-center'>
//             <div
//                 className='relative flex rounded-xl text-custom-text-color shadow-lg'
//                 style={cardStyle}
//             >
//                 <div style={{wordWrap:"break-word",}} >
//                     <h5 className='mb-2 text-zinc-900 text-3xl md:text-5xl font-medium font-Rubik leading-[44px] tracking-tight'>
//                         Medium title placeholder text
//                     </h5>
//                     <p className='mb-4 text-zinc-500 text-xl md:text-2xl font-normal font-Rubik leading-[30px] tracking-tight'>
//                         Body placeholder for text paragraph. A paragraph is a
//                         self-contained unit of text dealing with a particular
//                         point or idea.
//                     </p>
//                     <button
//                         onClick={handleButtonClick}
//                         className='bg-blue-500 text-white font-medium text-[20px] md:text-xl leading-[30px] tracking-tight px-4 py-2 rounded-lg'
//                     >
//                         Get Started
//                     </button>
//                 </div>
//                 <div className='w-100'>
//                     <img
//                         className='h-full w-full rounded-none rounded-4-xl xl:h-[438px] xl:w-[638px]'
//                         src='https://s3-alpha-sig.figma.com/img/27d2/e137/8586fde64402db7f3c226adc7af9fe51?Expires=1698624000&Signature=DDB2wxBlKV77PTODVG9DJVvF3zqwvF0zOYb18VjrA9NeZFtz4ayIbO1QjsLQULj0fwpgDhdGFDAs7~H393B0h35d65C8bFdepBiwv4erKgi68FCumuf0~fcOFUjfhKeIQFNWjIZi3di8-tviz52sDAgzL6AFJezy0BWvLQx8U2Km9iRJOQHJZN4qnEXZyJQv8-VZ1DZcgLWoSMZ501wmX4yze~jUbEIomfXmZixoMl8ujIp8RYnn7mxv6--MJ7eQph-x-wbLc-xTgFxenAec~SYMikpgqsbKvVKUdcxuUAQh2q3u6IxfaHM9~veNa91U0F~nsVf4WGjdSX4uo9y8sQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
//                         alt='header'

//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }
