import React from "react";
import { Heading } from "@/components/HomeCards";

function guidelines() {
    const Subtitle = ({ text }) => (
        <h3 className='text-center lg:text-[28px] md:text-[24px] sm:text-[20px] text-[18px] mt-4 sm:mt-8 md:mt-12 lg:mt-16 text-black font-[500]'>
            {text}
        </h3>
    );

    const Title = ({ text }) => (
        <h3 className='text-center lg:text-[30px] md:text-[28px] sm:text-[24px] text-[20px] mt-4 sm:mt-8 md:mt-12 lg:mt-16 text-black font-[500]'>
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

            <Title text='Event Creation' />
            <div className='text-center px-5'>
                The following are guidelines that users ought to follow when
                creating an event on PebbleWork. <br />
                While the overall structure of the event is open to changes and
                users&apos; creativity, the following must be adhered to.
            </div>

            <div className='flex flex-row flex-wrap mb-[5rem] px-5'>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Subtitle text='Transparency' />
                    All events regardless of nature or type are required to
                    prioritize transparency in the details and intentions shared
                    when creating the event. Transparency brings and strenghtens
                    the sense of purpose of the possible attendees, making them
                    more likely to engage and participate actively in the event
                    and attain its goal regardless of its scale, be it small or
                    large.
                </div>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Subtitle text='Genuine Interaction' />
                    Whether the event is online-based or conducted in person, it
                    should always aim to promote real, genuine human
                    interactions. This can be achieved by creating an
                    environment that encourages meaningful conversations, and/or
                    a space promoting collaboration and prompring attendees to
                    share experiences. The participants&apos; full immersion is
                    important to foster trust and fulfill the event&apos;s
                    purpose.
                </div>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Subtitle text='Host' />
                    Lastly, the host, as central figure of the event, must
                    always be present. Having the organizer present not only
                    sets the tone, but enhances the overall experience of the
                    participants by facilitating discussions. The host&apos;s
                    presence in all events is crucial.
                </div>
            </div>

            <hr />

            <Title text='Code of Conduct' />
            <div className='text-center px-5 '>
                The Code of Conduct is an extension of PebbleWork&apos;s
                Guidelines. <br />
                The Code addresses the general user behavior while using
                PebbleWork and interacting with other users.
            </div>

            <div className='flex flex-row flex-wrap mb-[5rem] px-5'>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Subtitle text='Hateful content' />
                    Events interfering with the Sustainable Development goals or
                    causing harm to a group of people are prohibited. PebbleWork
                    aims to provide a space for people regardless of their
                    origin, gender, religion, nationality, orientation and
                    beliefs. Adding to this, events promoting dangerous or
                    illegal activities are unauthorized and will be deleted.
                </div>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Subtitle text='Misinformation' />
                    Misinformation involves any misleading or deceptive content.
                    Events that do not reflect genuine and real causes are not
                    allowed on PebbleWork. This includes events with false
                    information, events with technically manipulated content or
                    ambiguous aims, or impersonation and fraudulent use of real
                    organizations and people.
                </div>
                <div className='lg:basis-1/3 md:basis-1/2 sm:basis-full px-5'>
                    <Subtitle text='Respectful interactions' />
                    We value open discussion and diverse perspectives, but we
                    also emphasize the importance of maintaining a positive and
                    constructive environment. For this reason, please ensure the
                    use of neutral and respectful langage when engaging with
                    other users. Personal attacks, harassment, or any form of
                    discrimination will not be tolerated.
                </div>
            </div>
            <hr />
            <div className='px-5 mx-4 text-lg mt-[3rem] mb-5'>
                <b>Reporting Violations:</b> <br />
                If you encounter or experience any behavior that violates these
                guidelines, please report it to our team. We are committed to
                maintaining a respectful and kind community and will take
                appropriate measures to address such disruptive conduct.
            </div>
        </>
    );
}

export default guidelines;
