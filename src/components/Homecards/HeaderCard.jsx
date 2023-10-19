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
                        src='https://media.discordapp.net/attachments/1133546889762054286/1162163860539715604/Screenshot_2023-10-13_000245.png?ex=653af070&is=65287b70&hm=f3c34570a0de3e824cbdf21dca8b332e677295a6779544b6fac54d74ef1be7b9&=&width=567&height=556'
                        alt=''
                        style={imageStyle}
                    />
                </div>
            </div>
        </div>
    );
}
