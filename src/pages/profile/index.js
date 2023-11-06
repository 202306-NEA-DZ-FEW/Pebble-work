import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db, auth, storage, firestore } from "../../util/firebase";
import { app } from "../../util/firebase";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ProfilePage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [usersData, setUsersData] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userInterests, setUserInterests] = useState([]);
    const EventTypes = [
        "No Poverty",
        "Zero Hunger",
        "Good Health and Well-being",
        "Quality Education",
        "Affordable and Clean Energy",
        "Decent Work and Economic Growth",
        "Industry, Innovation, and Infrastructure",
        "Reduced Inequalities",
        "Sustainable Cities and Communities",
        "Responsible Consumption/Production",
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
                    } else {
                        console.log("User document does not exist.");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
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

                    {/* Profile  Picture /Change */}
                    <div className=' ml-5 flex flex-row mt-4 md:w-full md:gap-10  '>
                        <div className='flex items-center h-4/12 w-4/12 rounded-full outline outline-2  overflow-hidden md:w-2/12 h-5/12 md:mt-8'>
                            <Image
                                src={currentUser.Image}
                                width={200}
                                height={200}
                                alt=''
                                className=' '
                            />
                        </div>

                        {/* Change  Picture */}
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

                    {/* Edit  Information */}
                    <div className='flex flex-col mt-9 w-70 sm:items-center  md:items-start md:mt-14 md:ml-10'>
                        <h3 className='font-semibold text-md w-70 text-gray-600'>
                            {t("profile:nameRequired")}:
                        </h3>
                        <p className=' mt-2 mb-4 w-3/4  '>{currentUser.Name}</p>
                        <h3 className='font-semibold text-md w-70 text-gray-600'>
                            {t("profile:surnameRequired")}:
                        </h3>
                        <p className=' mt-2 mb-4 w-3/4  '>
                            {currentUser.Surename}
                        </p>
                        <h3 className='font-semibold text-md w-70 text-gray-600'>
                            {t("profile:emailRequired")}:
                        </h3>
                        <p className=' mt-2 mb-4 w-3/4  '>
                            {currentUser.email}
                        </p>
                        <h3 className='mt-1 mb-1 font-semibold text-md  w-70 text-gray-600'>
                            {t("profile:locationRequired")}:
                        </h3>
                        <p className=' mt-2  w-3/4 '>{currentUser.Location}</p>

                        {/* Your Interests */}
                        <h3 className='mt-3 mb-2 font-semibold text-md  w-70  text-gray-600'>
                            {t("profile:interests")}:
                        </h3>
                        <div
                            className=' -ml-15 mt-5 grid grid-container text-center justify-evenly  text-xs md:w-full md:h-auto  md:mt-8 md:text-3xl '
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr 1fr",
                                gap: "1rem",
                                height: "300px",
                            }}
                        >
                            {EventTypes.map((type, index) => (
                                <button
                                    key={index}
                                    className={`outline outline-1 rounded outline-orange-600 font-semibold text-orange-600  text-xs whitespace-normal ${
                                        userInterests.includes(type)
                                            ? "text-white bg-orange-400"
                                            : ""
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        {/* Save Interests Button */}
                        <div className='mt-0 flex flex-col items-end  mx-auto'>
                            <button
                                className='mt-12 bg-orange-400  text-center h-8  px-4 py-2 text-xs text-white font-bold shadow-md md:h-14 mb-12 md:w-40 md:text-xl '
                                onClick={handleEditProfile}
                            >
                                {t("profile:editProfile")}
                            </button>
                        </div>
                    </div>
                    {/* Change Password  */}
                    {/* <div className='mt-5 pt-0 mx-auto pb-5 flex flex-col  bg-cyan-100  rounded mb-20 md:mx-auto md:mt-8 md:ml-20 '>
                    <h3 className='font-bold mt-5 ml-4'>Change Password</h3>
                    <div className='flex flex-row ml-6 mt-3 gap-x-5 items-center justify-items-center '>
                        <input
                            type='password'
                            placeholder=' Password'
                            className=' w-5/12 h-8 rounded'
                        ></input>
                        <input
                            type='password'
                            placeholder=' Retype password'
                            className='w-5/12 h-9 rounded'
                        ></input>
                    </div>
                    <div className='flex flex-row  mt-4 pb-3 gap-4 items-end  ml-20'>
                        <button className='bg-orange-400  text-center h-8 w-3/12   text-xs text-white  shadow-md '>
                            Submit
                        </button>
                        <button className=' text-center h-8 w-4/12 text-xs  outline outline-1 rounded shadow-md'>
                            Cancel
                        </button>
                    </div> */}
                    {/* </div> */}
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
