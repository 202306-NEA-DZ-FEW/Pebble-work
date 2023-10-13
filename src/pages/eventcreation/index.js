import React from "react";

const EventCreationPage = () => {
    return (
        <div className='container ml-3  max-w-6xl mt-2 flex flex-col bg-white mx-auto '>
            {/* location container */}
            <div className='flex flex-col  md:space-x-20  md:flex-row'>
                <div>
                    <h3 className='mt-5 font-semibold align-left'>
                        Choose Location:
                    </h3>
                    <p className='max-w-sm mt-2 text-gray-500'>
                        Pebble events can be both local or online. Choose where
                        you want to host your event.
                    </p>
                    <form className='max-w-1/2'>
                        <input
                            placeholder='Set Location'
                            className='p-1  mt-4  rounded-md focus:outline-2 outline outline-1 w-2/4'
                        ></input>
                    </form>
                </div>
                {/* location preview */}
                <div className='my-auto lg:flex lg:flex-col md:flex-col md:bt-5 sm:flex sm:flex-col sm:flex-wrap sm:mt-5 md:mt-3 '>
                    <p className='font-bold text-5xl sm:inline-block '>Izmir</p>
                    <a
                        href='#'
                        className='mt-2 underline text-md text-blue-600 font-bold decoration-inherit'
                    >
                        Change Location
                    </a>
                </div>
            </div>
            {/* Event Type Section */}
            <div className=' flex flex-col items-center ml-3 flex-wrap sm:flex sm:flex-col  sm:ml-3 sm:items-center   md:flex md:flex-col md:ml-3 md:items-center lg:flex lg:flex-col lg:mt-3 lg:mx-0 lg:items-start '>
                <h1 className='mt-5 text-xl font-semibold  '>
                    Choose Event Type:
                </h1>
                <p className='max-w-4xl mt-2 text-gray-500  '>
                    Every pebble event should serve at least one of the
                    sustainable development goals of United Nations. Which goal
                    do you want to help in? Select all that apply.
                </p>
                {/* Event Type Options */}
                {/* 
            
                <div className="mt-5 flex flex-row flex-wrap    align-center items-start gap-4 max-w-5xl  ">

                    
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 text-sm">No Poverty</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 text-sm">Zero Hunger</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 text-center w-1/4  text-sm">Good Health and 
Well-being</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 w-1/4 text-sm whitespace-normal">Quality Education</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 w-1/4 text-sm whitespace-normal">Gender Equality</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 w-1/4 text-sm whitespace-normal">Clean Water and Sanitation</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 w-1/4 text-sm whitespace-normal">No Poverty Affordable and 
Clean Energy</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 w-1/4 text-sm whitespace-normal">Decent Work and Economic Growth</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 w-1/4 whitespace-normal text-sm">Industry, Innovation, and Infrastructurey</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 w-1/4 text-sm">Reduced Inequalities</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 w-1/4 whitespace-normal text-left text-sm">Sustainable Cities and Communities</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 w-1/4 whitespace-normal  align-text-top  text-sm">Responsible Consumption/Production</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 w-1/4 text-sm">Climate Action</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 w-1/4 text-sm">Life Below Water</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 w-1/4 text-sm">Life on Land</button>
                    <button className="px-10 py-3 outline outline-1 rounded outline-orange-600 font-semibold text-orange-600 w-1/4 text-sm">Peace, Justice and Strong Institutions</button>
                    
                </div>
                */}
                {/* Event Type Options */}

                <select
                    id='eventtype'
                    className='mt-3 required outline outline-2 rounded outline-orange-600 font-semibold text-orange-600 text-md max-w-2xl'
                >
                    <option value=''>No Poverty</option>
                    <option value=''>Zero Hunger</option>
                    <option value=''>Good Health and Well-being</option>
                    <option value=''>Gender Equality</option>
                    <option value=''>Clean Water and Sanitation</option>
                    <option value=''>Affordable and Clean Energy</option>
                    <option value=''>Decent Work and Economic Growth</option>
                    <option value=''>
                        Industry, Innovation, and Infrastructure
                    </option>
                    <option value=''>Reduced Inequalities</option>
                    <option value=''>
                        Sustainable Cities and Communitiese
                    </option>
                    <option value=''>Responsible Consumption/Production</option>
                    <option value=''>Climate Action</option>
                    <option value=''>Life Below Water</option>
                    <option value=''>Life on Land</option>
                    <option value=''>
                        Peace, Justice and Strong Institutions
                    </option>
                    <option value=''>Other</option>
                </select>
            </div>
            {/* Event Title Section */}

            <div className='flex l flex-col  mx-auto   flex-wrap sm:flex sm:flex-col  sm:ml-3 sm:items-center   md:flex md:flex-col md:ml-3 md:items-center lg:flex lg:flex-col lg:mt-3 lg:mx-0 lg:items-start'>
                <h1 className='mt-5 text-xl font-semibold align-left '>
                    Event Title:
                </h1>
                <p className='max-w-4xl mt-2 text-gray-500'>
                    Choose a title that will give people a clear idea of what
                    the event is about. Feel free to be creative! You canedit
                    this later if you change your mind.
                </p>
                <form className=''>
                    <input
                        placeholder='Izmir Clean Energy Brainstorm meeting'
                        className=' p-1 font-semibold  mt-4   rounded-md focus:outline-2 outline outline-1   '
                    ></input>
                </form>
            </div>
            {/* Event Description Section */}
            <div className='flex flex-col flex-wrap mt-2 w-screen'>
                <h1 className='mt-5 text-xl font-semibold align-left '>
                    Event Description:
                </h1>
                <p className='max-w-4xl mt-2 text-gray-500'>
                    Describe the purpose of your event. Who should join and what
                    will you do at the event?
                </p>
                <form id='eventdescription' className='mt-1 '>
                    <textarea
                        placeholder='Please write 50 characters at least'
                        className='outline outline-1 mt-2 h-40 rounded w-7/12 font-semibold'
                    ></textarea>
                </form>
            </div>
            {/* Event Image Section */}
            <div className='flex flex-col flex-wrap mt-0 w-screen'>
                <h1 className='mt-5 text-xl font-semibold align-left '>
                    Event Image:
                </h1>
                <p className='max-w-4xl mt-3 text-gray-500'>
                    We have found that listings with a photo attract more
                    interest.
                </p>
                <input type='file' id='eventimage' className='mt-3'></input>
            </div>
            {/* Guidelines Section */}
            <div className='flex flex-col flex-wrap mt-0 w-screen'>
                <h1 className='mt-5 text-xl font-semibold align-left '>
                    Almost Done! Just take a minute to review our guidlines.
                </h1>
                <p className='max-w-4xl mt-1 text-gray-500'>
                    Pebble is all about helping people with the help of
                    volunteers like you. This means that all events should:
                </p>
                <ul className='list-disc ml-6 mt-1 text-black text-sm font-semibold'>
                    <li>Be transparent about the events intentions</li>
                    <li>
                        Encourage real human interactions in person or online
                    </li>
                    <li>Have the host present in all events</li>
                </ul>
                <p className='max-w-4xl mt-1 text-gray-500'>
                    You can read more about all of this in our{" "}
                    <a href='#' className='underline text-md text-blue-600'>
                        community guidelines.
                    </a>
                </p>
            </div>
            {/*  Agree button */}
            <div className='flex items-center flex-row mt-3 rounded max-w-3xl'>
                <button className='px-8 py-3 outline outline-1 rounded font-semibold mx-auto my-8'>
                    Agree with terms and Create Event!
                </button>
            </div>
        </div>
    );
};

export default EventCreationPage;
