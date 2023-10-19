import React from "react";
import Link from "next/link";

const FeatureCard = ({ title, description, buttonText, imageUrl, link }) => {
    const handleButtonClick = () => {
        window.location.href = link;
    };

    return (
        <div className='w-1/3 sm:w-1/2 md:w-1/3 flex flex-col justify-evenly items-center'>
            <div className='xl:w-[216px] xl:h-[245.75px] lg:w-[177px] lg:h-[200px] md:w-[131px] md:h-[145px] sm:w-[100px] sm:h-[110px] w-[80px] h-[80px] '>
                <img src={imageUrl} alt='Card Image' />
            </div>
            <div className='w-full text-center px-2'>
                <div className="text-zinc-900 w- lg:text-[32px] md:text-[24px] sm:text-[20px] font-medium font-['Rubik'] sm:leading-[44px] tracking-[0.10px]">
                    {title}
                </div>
                <div className="text-zinc-500 lg:text-[18px] md:text-[15px] sm:text-[13px] text-[10px] font-normal font-['Rubik'] sm:leading-[30px] tracking-[0.10px]">
                    {description}
                </div>
            </div>
            <Link
                href=''
                className="xl:w-[163px] xl:h-[52px] justify-start items-center gap-2.5 inline-flex text-zinc-900 lg:text-[22px] sm:text-[16px] font-medium font-['Rubik'] leading-[30px] tracking-tight"
                onClick={handleButtonClick}
            >
                {buttonText}
                {/* <div className='w-6 h-6 relative' /> */}
            </Link>
        </div>
    );
};

const MainCard = () => (
    <div className='w-full bg-white flex flex-wrap justify-start items-start'>
        <FeatureCard
            title='Join the community!'
            description='Body placeholder for text paragraph, a paragraph is a self-contained unit of text description.'
            buttonText='Sign up'
            imageUrl='/Homepage/ManTop.png'
            link='/signup'
        />
        <FeatureCard
            title='Attend events'
            description='Body placeholder for text paragraph, a paragraph is a self-contained unit of text description.'
            buttonText='View events'
            imageUrl='/Homepage/attend.png'
            link='/events'
        />
        <FeatureCard
            title='Host your event!'
            description='Body placeholder for text paragraph, a paragraph is a self-contained unit of text description.'
            buttonText='Get started'
            imageUrl='/Homepage/Girl.png'
            link='/get-started-page'
        />
    </div>
);

export default MainCard;
