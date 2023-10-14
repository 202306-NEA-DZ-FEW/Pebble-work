import React from "react";
import Link from "next/link";
import Image from "next/image";

const MembersCard = ({ imageSrc, name, google, linkedin, github }) => {
    return (
        <div
            data-testid='members-card'
            className='card flex xl:p-[20px] pt-2 xl:bg-[#BDD6D0] bg-[#29C5E6] flex-col xl:gap-5 gap-1 items-center xl:w-[300px] xl:h-[300px] md:w-[220px] md:h-[220px] h-[125px] w-[125px]'
        >
            <div className='rounded-image'>
                <img
                    className='md:object-contain xl:object-cover xl:w-[150px] xl:h-[150px] md:h-[125px] md:w-[125px] h-[50px] w-[50px] '
                    src={imageSrc}
                    alt='Profile'
                />
            </div>
            <h2 className='text-white'>{name}</h2>
            <div className='social-media-icons flex justify-center items-center gap-2 md:gap-10'>
                <Link href={google} key='index' className='social-media-icon'>
                    <Image
                        className='xl:w-[35px] xl:h-[35px] md:w-[30px] md:h-[30px] w-[18px] h-[18px]'
                        width={50}
                        height={50}
                        src='/icons/Google.png'
                        alt='Gmail'
                    />
                </Link>
                <Link href={linkedin} key='index' className='social-media-icon'>
                    <Image
                        className='xl:w-[35px] xl:h-[35px] md:w-[30px] md:h-[30px] w-[18px] h-[18px]'
                        width={50}
                        height={50}
                        src='/icons/Linkedin.png'
                        alt='Linkedin'
                    />
                </Link>
                <Link href={github} key='index' className='social-media-icon'>
                    <Image
                        className='xl:w-[35px] xl:h-[35px] md:w-[30px] md:h-[30px] w-[18px] h-[18px]'
                        width={50}
                        height={50}
                        src='/icons/Github.svg'
                        alt='Github'
                    />
                </Link>
            </div>

            <style jsx>{`
                .card {
                    border-radius: 25px;
                    text-align: center;
                }

                .rounded-image {
                    border-radius: 100%;
                    overflow: hidden;
                    cursor: pointer;
                }

                .rounded-image img {
                    filter: grayscale(0.4);
                    transition: 1s;
                }

                .rounded-image img:hover {
                    filter: grayscale(0);
                    transform: scale(1.3) rotate(7deg);
                }

                .social-media-icon {
                    display: inline-block;
                }
            `}</style>
        </div>
    );
};

export default MembersCard;
