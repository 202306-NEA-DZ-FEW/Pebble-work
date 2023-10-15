import React, { useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db, storage } from "@/util/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EventCreationPage = () => {
    const formCollectionRef = collection(db, "events");
    const [input, setInput] = useState({
        location: "",
        type: "",
        title: "",
        description: "",
        attendees: [],
        organizer: "",
        image: "",
    });

    const [img, setImg] = useState("");

    const addEvent = async (input) => {
        // Create a new event document in Firestore
        const docRef = await addDoc(formCollectionRef, input);

        return docRef.id; // Return the ID of the created document
    };

    const imgUpload = async (eventId) => {
        const imgRef = ref(storage, `images/img${eventId}`);
        await uploadBytes(imgRef, img);

        const imageUrl = await getDownloadURL(imgRef);

        await updateDoc(doc(db, "events", eventId), {
            image: imageUrl,
        });
    };

    const addAndGoToEvent = async () => {
        const eventId = await addEvent(input);

        await imgUpload(eventId);

        //use getDownloadURL to get the url of the newly uploaded image

        //updateDoc to add the url to the docRef in image:''

        window.location.href = `/events/${eventId}`;
    };

    {
        /*const imgUpload = async (e) => {
        const imgRef = ref(storage, `images/img${eventId}`)
        await uploadBytes(imgRef, img)

        const imageUrl = await getDownloadURL(imgRef);

        await updateDoc(doc(db, "events", eventId), {
            image: imageUrl
        })
    } */
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [id]: value,
        }));
        console.log(input.location, input.type);
    };

    return (
        <div className='container ml-3  max-w-6xl mt-2 flex flex-col bg-white mx-auto '>
            {/* <form>
                <input type='file'
                    onChange={(e) => setImg(e.target.files[0])}
                    id='testimage' className='mt-3'></input>
                <button style={{ backgroundColor: 'orange', color: 'white' }} onClick={imgUpload}>test</button>
    </form> */}
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
                            id='location'
                            value={input.location}
                            onChange={handleInputChange}
                            placeholder='Set Location'
                            className='p-1  mt-4  rounded-md focus:outline-2 outline outline-1 w-2/4'
                        ></input>
                    </form>
                </div>

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
            <div className=' flex flex-col items-center ml-3 flex-wrap sm:flex sm:flex-col  sm:ml-3 sm:items-center   md:flex md:flex-col md:ml-3 md:items-center lg:flex lg:flex-col lg:mt-3 lg:mx-0 lg:items-start '>
                <h1 className='mt-5 text-xl font-semibold  '>
                    Choose Event Type:
                </h1>
                <p className='max-w-4xl mt-2 text-gray-500  '>
                    Every pebble event should serve at least one of the
                    sustainable development goals of United Nations. Which goal
                    do you want to help in? Select all that apply.
                </p>

                <select
                    id='type'
                    value={input.type}
                    onChange={(e) =>
                        setInput({ ...input, type: e.target.value })
                    }
                    className='mt-3 required outline outline-2 rounded outline-orange-600 font-semibold text-orange-600 text-md max-w-2xl'
                >
                    <option value='No Poverty'>No Poverty</option>
                    <option value='Zero Hunger'>Zero Hunger</option>
                    <option value='Good Health and Well-being'>
                        Good Health and Well-being
                    </option>
                    <option value='Gender Equality'>Gender Equality</option>
                    <option value='Clean Water and Sanitation'>
                        Clean Water and Sanitation
                    </option>
                    <option value='Affordable and Clean Energy'>
                        Affordable and Clean Energy
                    </option>
                    <option value='Decent Work and Economic Growth'>
                        Decent Work and Economic Growth
                    </option>
                    <option value='Industry, Innovation, and Infrastructure'>
                        Industry, Innovation, and Infrastructure
                    </option>
                    <option value='Reduced Inequalities'>
                        Reduced Inequalities
                    </option>
                    <option value='Sustainable Cities and Communitiese'>
                        Sustainable Cities and Communitiese
                    </option>
                    <option value='Responsible Consumption/Production'>
                        Responsible Consumption/Production
                    </option>
                    <option value='Climate Action'>Climate Action</option>
                    <option value='Life Below Water'>Life Below Water</option>
                    <option value='Life on Land'>Life on Land</option>
                    <option value='Peace, Justice and Strong Institutions'>
                        Peace, Justice and Strong Institutions
                    </option>
                    <option value='Other'>Other</option>
                </select>
            </div>

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
                        id='title'
                        value={input.title}
                        onChange={handleInputChange}
                        placeholder='Choose a title'
                        className=' p-1 font-semibold  mt-4   rounded-md focus:outline-2 outline outline-1   '
                    ></input>
                </form>
            </div>

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
                        id='description'
                        value={input.description}
                        onChange={handleInputChange}
                        placeholder='Please write 50 characters at least'
                        className='outline outline-1 mt-2 h-40 rounded w-7/12 font-semibold'
                    ></textarea>
                </form>
            </div>

            <div className='flex flex-col flex-wrap mt-0 w-screen'>
                <h1 className='mt-5 text-xl font-semibold align-left '>
                    Event Image:
                </h1>
                <p className='max-w-4xl mt-3 text-gray-500'>
                    We have found that listings with a photo attract more
                    interest.
                </p>
                <input
                    type='file'
                    onChange={(e) => setImg(e.target.files[0])}
                    id='eventimage'
                    className='mt-3'
                ></input>
            </div>

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

            <div className='flex items-center flex-row mt-3 rounded max-w-3xl'>
                <button
                    onClick={addAndGoToEvent}
                    className='px-8 py-3 outline outline-1 rounded font-semibold mx-auto my-8'
                >
                    Agree with terms and Create Event!
                </button>
            </div>
            <div style={{ height: "200px", marginTop: "4rem" }}></div>
        </div>
    );
};

export default EventCreationPage;
