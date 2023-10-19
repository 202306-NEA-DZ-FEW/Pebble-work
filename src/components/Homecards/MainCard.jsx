import React from "react";

const FeatureCard = ({ title, description, buttonText, imageUrl, link }) => {
    const handleButtonClick = () => {
        window.location.href = link;
    };

    return (
        <div className='w-full sm:w-1/2 md:w-1/3 p-4 flex flex-col justify-between items-center'>
            <div className='w-[216px] h-[245.75px]'>
                <img src={imageUrl} alt='Card Image' className='w-full' />
            </div>
            <div className='w-full text-center'>
                <div className="text-zinc-900 text-[32px] font-medium font-['Rubik'] leading-[44px] tracking-tight">
                    {title}
                </div>
                <div className="text-zinc-500 text-xl font-normal font-['Rubik'] leading-[30px] tracking-tight">
                    {description}
                </div>
            </div>
            <a
                href='#'
                className="w-[163px] h-[52px] py-[11px] justify-start items-center gap-2.5 inline-flex text-zinc-900 text-[22px] font-medium font-['Rubik'] leading-[30px] tracking-tight"
                onClick={handleButtonClick}
            >
                {buttonText}
                <div className='w-6 h-6 relative' />
            </a>
        </div>
    );
};

const MainCard = () => (
    <div className='w-full bg-white flex flex-wrap justify-start items-start'>
        <FeatureCard
            title='Register'
            description='Body placeholder for text paragraph, a paragraph is a self-contained unit of text description.'
            buttonText='Sign up'
            imageUrl='https://media.discordapp.net/attachments/1133546889762054286/1162843586514129078/Screenshot_2023-10-14_210347.png?ex=653d697b&is=652af47b&hm=796f2ecf0efff84380e0a6aad11020ae8298e1c7909a48c23c04512cf6801fab&=&width=487&height=402'
            link='/register-page'
        />
        <FeatureCard
            title='Attend events'
            description='Body placeholder for text paragraph, a paragraph is a self-contained unit of text description.'
            buttonText='View events'
            imageUrl='https://media.discordapp.net/attachments/1133546889762054286/1162843632341090404/Screenshot_2023-10-14_210407.png?ex=653d6986&is=652af486&hm=a21ad59893ca460fbf98ac9d378c768d0d918f22b631d57620c85168231df7f9&=&width=519&height=414'
            link='/events-page'
        />
        <FeatureCard
            title='Organize your own!'
            description='Body placeholder for text paragraph, a paragraph is a self-contained unit of text description.'
            buttonText='Get started'
            imageUrl='https://media.discordapp.net/attachments/1133546889762054286/1162843674783264798/Screenshot_2023-10-14_210443.png?ex=653d6990&is=652af490&hm=a187793847859b11ebefa769e5277d6562e7dd5d55592e291a09110f93e21a0f&=&width=450&height=438'
            link='/get-started-page'
        />
    </div>
);

export default MainCard;
