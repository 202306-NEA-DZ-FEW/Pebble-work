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
            <div className='pt-5 flex flex-col items-center justify-center'>
                <h1 className='font-semibold text-lg md:text-4xl md:mt-5'>
                    {t("profile:yourProfile")}
                </h1>

                <div className='flex flex-row mt-4'>
                    <div className='flex flex-col ml-4 mt-4 md:w-full md:gap-10'>
                        {/* Row to be changed Start */}
                        <div className='flex flex-col md:flex-row items-center justify-around'>
                            {" "}
                            {/* Updated */}
                            <div className='flex justify-center items-center h-2/12 w-4/12 rounded-full outline outline-2 overflow-hidden md:w-4/12 h-5/12 md:mt-8 mb-[3rem]'>
                                <Image
                                    src={
                                        auth?.currentUser.photoURL !== null
                                            ? auth?.currentUser.photoURL
                                            : "/images/icon_default.png"
                                    }
                                    width={300}
                                    height={300}
                                    alt='profile'
                                    className='h-full w-full rounded-full'
                                />
                            </div>
                            <div className='flex flex-row items-center justify-around gap-x-[5rem] pr-7'>
                                {/* Name and Surname */}
                                <div className='md:w-3/12 md:mt-10'>
                                    <h3 className='font-semibold text-lg text-gray-600'>
                                        {t("profile:Name")}:
                                    </h3>
                                    <p className='mt-2 mb-4'>
                                        {currentUser.Name}
                                    </p>
                                    <h3 className='font-semibold text-lg text-gray-600'>
                                        {t("profile:Surname")}:
                                    </h3>
                                    <p className='mt-2 mb-4'>
                                        {currentUser.Surename}
                                    </p>
                                </div>

                                {/* Email and Location */}
                                <div className='md:w-3/12 md:mt-10'>
                                    <h3 className='font-semibold text-lg text-gray-600'>
                                        {t("profile:Email")}:
                                    </h3>
                                    <p className='mt-2 mb-4'>
                                        {currentUser.email}
                                    </p>
                                    <h3 className='font-semibold text-lg text-gray-600'>
                                        {t("profile:Location")}:
                                    </h3>
                                    <p className='mt-2 mb-4'>
                                        {currentUser.Location}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Row to be changed END */}

                        {/* Your Interests */}
                        <h3 className='mt-8 font-semibold text-2xl text-gray-600 mb-2'>
                            {t("profile:interests")}:
                        </h3>
                        <div className='grid grid-container grid-cols-2 gap-8 md:grid-cols-3 text-center justify-evenly md:w-full md:h-auto md:mt-1 md:text-3xl'>
                            {EventTypes.map((type, index) => (
                                <button
                                    key={index}
                                    className={`outline outline-1 h-12 md:h-15 -mx-1 rounded outline-orange-600 font-semibold text-orange-600 whitespace-normal text-xs ${
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
                </div>

                {/* Save Interests Button */}
                <div className='mt-10'>
                    <button
                        className='bg-orange-400 text-center h-10 w-30 px-4 py-2 text-xs text-white font-bold shadow-md md:h-14 mb-12 md:w-40 md:text-xl'
                        onClick={handleEditProfile}
                    >
                        {t("profile:editProfile")}
                    </button>
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
