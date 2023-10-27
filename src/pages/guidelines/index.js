import React from "react";
import { Heading } from "@/components/HomeCards";

function guidelines() {
    const Title = ({ text }) => (
        <h3 className='text-center lg:text-[30px] md:text-[24px] sm:text-[20px] text-[18px] mt-4 sm:mt-8 md:mt-12 lg:mt-16 text-black font-[500]'>
            {text}
        </h3>
    );
    return (
        <>
            <Heading text='Community Guidelines' />
            <img src='/images/Guidelines.png' />

            <div className='px-5 mx-4 text-lg'>
                In PebbleWork, we believe that creating a healthy and prosperous
                world starts by creating a trustworthy and kind community. Our
                policies aim to foster a safe platform while giving users the
                freedom and space to share a broad range of opinions and
                experiences.
            </div>
            <div className='px-5 mx-4 text-lg mt-2'>
                Below you&apos;ll find a set of guidelines that ensures a safe
                experience of PebbleWork for every user. Repeated violations of
                these Guidelines will induce a termination of your account.
            </div>

            <div className='flex flex-row flex-wrap mb-5 px-5'>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Title text='Hateful content' />
                    Events interfering with the Sustainable Development goals or
                    causing harm to a group of people are prohibited. PebbleWork
                    aims to provide a space for people regardless of their
                    origin, gender, religion, nationality, orientation and
                    beliefs. Adding to this, events promoting dangerous or
                    illegal activities are unauthorized and will be deleted.
                </div>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Title text='Misinformation' />
                    Misinformation involves any misleading or deceptive content.
                    Events that do not reflect genuine and real causes are not
                    allowed on PebbleWork. This includes events with false
                    information, events with technically manipulated content or
                    ambiguous aims, or impersonation and fraudulent use of real
                    organizations and people.
                </div>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Title text='Respectful interactions' />
                    We value open discussion and diverse perspectives, but we
                    also emphasize the importance of maintaining a positive and
                    constructive environment. For this reason, please ensure the
                    use of neutral and respectful langage when engaging with
                    other users. Personal attacks, harassment, or any form of
                    discrimination will not be tolerated.
                </div>
            </div>

            <div className='px-5 mx-4 text-lg mt-[3rem] mb-5'>
                <b>Reporting Violations:</b> <br />
                If you encounter any behavior that violates these guidelines,
                please report it to our team. We are committed to maintaining a
                respectful and kind community and will take appropriate measures
                to address such disruptive conduct.
            </div>
        </>
    );
}

export default guidelines;
