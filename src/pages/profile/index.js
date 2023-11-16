import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../util/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ProfilePage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [currentUser, setCurrentUser] = useState(null);
    const [userInterests, setUserInterests] = useState([]);
    const [joinedEvents, setJoinedEvents] = useState([]);

    const EventTypes = [
        "No Poverty",
        "Zero Hunger",
        "Good Health and Well-being",
        "Quality Education",
        "Affordable and Clean Energy",
        "Decent Work and Economic Growth",
        "Industry, Innovation, and Infrastructure",
        "Reduced Inequalities",
        "Responsible Consumption/Production",
        "Sustainable Cities and Communities",
        "Climate Action",
        "Life Below Water",
        "Life on Land",
        "Peace, Justice and Strong Institutions",
    ];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const userDocRef = doc(db, "users", authUser.uid);

                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setCurrentUser(userDoc.data());
                        setUserInterests(userDoc.data().interests);

                        // Set joined events
                        setJoinedEvents(userDoc.data().eventsJoined || []);
                    } else {
                        return;
                    }
                } catch (error) {
                    return;
                }
            } else {
                setCurrentUser(null);
                router.push("/signup");
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleEditProfile = () => {
        router.push("/editprofile"); // Redirect to the Edit Profile page
    };

    if (!currentUser) {
        return <p>Loading</p>;
    } else {
        return (
            <div className='container ml-8 mt-8 mx-0 w-80 justify-start sm:items-center  md:items-start md:text-2xl md:mx-auto md:w-auto '>
                <div className='flex flex-col sm:items-center md:items-start md:w-12/12 '>
                    <h1 className=' font-semibold text-lg md:text-4xl md:ml-10 md:mt-5'>
                        {t("profile:yourProfile")}
                    </h1>

                    {/* Profile Picture /Change */}
                    <div className=' ml-5 flex flex-row mt-4 md:w-full md:gap-10  '>
                        <div className='flex justify-center items-center h-4/12 w-4/12 rounded-full outline outline-2  overflow-hidden md:w-2/12 h-5/12 md:mt-8'>
                            <Image
                                src={
                                    auth?.currentUser.photoURL !== null
                                        ? auth?.currentUser.photoURL
                                        : "/images/icon_default.png"
                                }
                                width={200}
                                height={200}
                                alt='profile'
                                className='h-full w-full'
                            />
                        </div>

                        {/* Change Picture */}
                        <div className='flex flex-row ml-4 -mt-4 w-full md:ml-5  md:mt-20 '>
                            {/* <h1 className=' mt-10 text-center h-8 w-35 ml-0 px-4 py-2 text-lg font-bold  md:text-3xl md:w-3/12 md:h-12  text-gray-600'>
                            John Doe
                        </h1> */}
                            {/* <button className='bg-orange-400 mt-10 text-center h-8 w-35 ml-0 px-4 py-2 text-xs text-white  shadow-md md:text-lg md:w-3/12 md:h-12'>
                            {t("uploadNew")}
                        </button>
                        <button className='mt-10 text-center h-8 w-6/12  ml-3  text-xs   outline outline-1 rounded shadow-md md:w-4/12 md:h-12 md:ml-8 md:text-lg'>
                            {t("chooseFromLibrary")}
                        </button> */}
                        </div>
                    </div>

                    {/* Edit Information */}
                    <div className='flex flex-col mt-9 w-70 sm:items-center  md:items-start md:mt-14 md:ml-10'>
                        <h3 className='font-semibold text-md w-70 text-gray-600'>
                            {t("profile:Name")}:
                        </h3>
                        <p className=' mt-2 mb-4 w-3/4  '>{currentUser.Name}</p>
                        <h3 className='font-semibold text-md w-70 text-gray-600'>
                            {t("profile:Surname")}:
                        </h3>
                        <p className=' mt-2 mb-4 w-3/4  '>
                            {currentUser.Surename}
                        </p>
                        <h3 className='font-semibold text-md w-70 text-gray-600'>
                            {t("profile:Email")}:
                        </h3>
                        <p className=' mt-2 mb-4 w-3/4  '>
                            {currentUser.email}
                        </p>
                        <h3 className='mt-1 mb-1 font-semibold text-md  w-70 text-gray-600'>
                            {t("profile:Location")}:
                        </h3>
                        <p className=' mt-2  w-3/4 '>{currentUser.Location}</p>

                        {/* Your Interests */}
                        <h3 className='mt-3 mb-2 font-semibold text-md  w-70  text-gray-600'>
                            {t("profile:interests")}:
                        </h3>
                        <div className='grid grid-container grid-cols-2 gap-8 -ml-15 mt-3 text-center justify-evenly  md:grid-cols-3 text-xs md:w-full md:h-auto  md:mt-8 md:text-3xl '>
                            {EventTypes.map((type, index) => (
                                <button
                                    key={index}
                                    className={`outline outline-1 h-12 md:h-15 -mx-1 rounded outline-orange-600 font-semibold text-orange-600 whitespace-normal  text-xs  ${
                                        userInterests.includes(type)
                                            ? "text-white bg-orange-400"
                                            : ""
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='mt-3 mb-2 font-semibold text-md w-70 text-gray-600'>
                        {t("profile:joinedEvents")}:
                    </div>
                    <div className='flex flex-wrap max-h-40 overflow-auto'>
                        {joinedEvents.map((event, index) => (
                            <div
                                key={index}
                                className='mr-3 mb-2 p-4 border rounded-md bg-white w-40 sm:w-60 md:w-80'
                            >
                                {/* Card Content */}
                                {event.title}
                            </div>
                        ))}
                    </div>
                    {/* Save Interests Button */}
                    <div className='mt-10 flex flex-col items-end mx-auto'>
                        <button
                            className='bg-orange-400 text-center h-10 w-30 px-4 py-2 text-xs text-white font-bold shadow-md md:h-14 mb-12 md:w-40 md:text-xl'
                            onClick={handleEditProfile}
                        >
                            {t("profile:editProfile")}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProfilePage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "about",
                "edit",
                "profile",
            ])),
            // Will be passed to the page component as props
        },
    };
}
