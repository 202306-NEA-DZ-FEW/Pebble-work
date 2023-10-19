export default function HeaderCard() {
    const cardStyle = {
        backgroundColor: "#FFFFFF",
        color: "#003F62",
        maxWidth: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    };

    const textContainerStyle = {
        width: "100%",
        padding: "4%",
    };

    const imageStyle = {
        width: "100%",
        height: "auto",
    };

    const handleButtonClick = () => {
        window.location.href = "/target-page";
    };

    return (
        <div className='flex items-center justify-center'>
            <div
                className='relative flex rounded-xl text-custom-text-color shadow-lg'
                style={cardStyle}
            >
                <div style={textContainerStyle}>
                    <h5 className='mb-2 text-zinc-900 text-3xl md:text-5xl font-medium font-Rubik leading-[44px] tracking-tight'>
                        Medium title placeholder text
                    </h5>
                    <p className='mb-4 text-zinc-500 text-xl md:text-2xl font-normal font-Rubik leading-[30px] tracking-tight'>
                        Body placeholder for text paragraph. A paragraph is a
                        self-contained unit of text dealing with a particular
                        point or idea.
                    </p>
                    <button
                        onClick={handleButtonClick}
                        className='bg-blue-500 text-white font-medium text-xl md:text-2xl leading-[30px] tracking-tight px-4 py-2 rounded-lg'
                    >
                        Get Started
                    </button>
                </div>
                <div className='w-100'>
                    <img
                        className='h-full w-full rounded-none rounded-4-xl'
                        src='https://s3-alpha-sig.figma.com/img/27d2/e137/8586fde64402db7f3c226adc7af9fe51?Expires=1698624000&Signature=DDB2wxBlKV77PTODVG9DJVvF3zqwvF0zOYb18VjrA9NeZFtz4ayIbO1QjsLQULj0fwpgDhdGFDAs7~H393B0h35d65C8bFdepBiwv4erKgi68FCumuf0~fcOFUjfhKeIQFNWjIZi3di8-tviz52sDAgzL6AFJezy0BWvLQx8U2Km9iRJOQHJZN4qnEXZyJQv8-VZ1DZcgLWoSMZ501wmX4yze~jUbEIomfXmZixoMl8ujIp8RYnn7mxv6--MJ7eQph-x-wbLc-xTgFxenAec~SYMikpgqsbKvVKUdcxuUAQh2q3u6IxfaHM9~veNa91U0F~nsVf4WGjdSX4uo9y8sQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                        alt=''
                        style={imageStyle}
                    />
                </div>
            </div>
        </div>
    );
}
