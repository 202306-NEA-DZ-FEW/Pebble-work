import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, auth, storage } from "@/util/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Modal from "@/components/Popup/Modal";
import PicturesLibrary from "./library";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { updateProfile } from "firebase/auth";
import Loader from "@/components/Loader/Loader";

const ProfilePage = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [userInterests, setUserInterests] = useState([]);
    const [isSaved, setIsSaved] = useState(false);

    /// Modal states
    const [showPopup, setShowPopup] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalClassName, setModalClassName] = useState("");

    /// PROFILE PICTURES LIBRARY STATES
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    // update profile inputs
    const [editedName, setEditedName] = useState("");
    const [editedSurname, setEditedSurname] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedLocation, setEditedLocation] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const EventTypes = [
        "No Poverty",
        "Zero Hunger",
        "Good Health and Well-being",
        "Quality Education",
        "Affordable and Clean Energy",
        "Decent Work and Economic Growth",
        "Industry, Innovation, and Infrastructurey",
        "Reduced Inequalities",
        "Sustainable Cities and Communities",
        "Responsible Consumption/Production",
        "Climate Action",
        "Life Below Water",
        "Life on Land",
        "Peace, Justice and Strong Institutions",
    ];

    const handleSuccess = () => {
        setShowPopup(true);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const userDocRef = doc(db, "users", authUser.uid);
                setCurrentUserId(authUser.uid);
                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setCurrentUser(userDoc.data());
                        setUserInterests(userDoc.data().interests);
                    } else {
                        return;
                    }
                } catch (error) {
                    return;
                }
            } else {
                router.push("/signin");
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // Handle user interests function

    const handleUpdateInterests = (interest, e) => {
        e.preventDefault();
        if (userInterests.includes(interest)) {
            setUserInterests(userInterests.filter((item) => item !== interest));
        } else {
            setUserInterests([...userInterests, interest]);
        }
    };

    // Handle edit profile function
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const userDocRef = doc(db, "users", currentUserId);
        // Update Firestore document with the new profile data
        // await updateDoc(userDocRef, { interests: userInterests });
        updateDoc(userDocRef, { interests: userInterests });

        await updateDoc(userDocRef, {
            Name: editedName.trim() !== "" ? editedName : currentUser.Name,
            Surename:
                editedSurname.trim() !== ""
                    ? editedSurname
                    : currentUser.Surename,
            email: editedEmail.trim() !== "" ? editedEmail : currentUser.email,
            Location:
                editedLocation.trim() !== ""
                    ? editedLocation
                    : currentUser.Location,
        });

        const nameDisplay =
            editedName.trim() !== "" ? editedName : currentUser.Name;
        const surnameDisplay =
            editedSurname.trim() !== "" ? editedSurname : currentUser.Surename;

        await updateProfile(auth.currentUser, {
            displayName: `${nameDisplay} ${surnameDisplay}`,
        });
        ///setIsSaved(true);
        setShowPopup(true);
        setModalContent(
            "Profile updated successfuly,you are being redirected to your profile"
        );
        setModalClassName(
            "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
        );
        setTimeout(() => {
            router.push("/profile");
        }, 3000);
    };

    // handle Change Password Function

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setShowPopup(true);
            setModalContent("Passwords do not match. Please try again.");
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);
            return;
        }

        try {
            // Change the user's password
            await updatePassword(auth.currentUser, newPassword);
            setShowPopup(true);
            setModalContent("Your password has been successfully updated");
            setModalClassName(
                "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);

            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            setShowPopup(true);
            setModalContent("Error changing password. Please try again.");
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);
        }
    };

    /// handle Upload Profile Picture Function

    const handleUploadProfilePicture = async (e) => {
        const file = e.target.files[0];

        if (file) {
            try {
                const storageRef = ref(
                    storage,
                    `profilePictures/${currentUserId}`
                );
                await uploadBytes(storageRef, file);

                const imageUrl = await getDownloadURL(storageRef);

                const userDocRef = doc(db, "users", currentUserId);
                await updateDoc(userDocRef, { imageURL: imageUrl });

                const auth = getAuth();
                await updateProfile(auth.currentUser, {
                    photoURL: imageUrl,
                });

                // Refresh the page to display the updated profile picture
                window.location.reload();
            } catch (error) {
                setShowPopup(true);
                setModalContent(
                    "Error uploading profile picture. Please try again."
                );
                setModalClassName(
                    "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
                );
                setTimeout(() => {
                    setShowPopup(false);
                }, 2000);
            }
        }
    };

    /// pictures library functionalities
    const handleOpenLibrary = () => {
        setIsLibraryOpen(true);
    };

    const handleCloseLibrary = () => {
        setIsLibraryOpen(false);
    };

    const handleSaveSelectedImage = async () => {
        if (selectedImage == "") {
            return;
        }
        try {
            // Update the user's "Image" field in Firestore with the selected photo's URL
            const auth = getAuth();
            await updateProfile(auth.currentUser, {
                photoURL: selectedImage,
            });

            // Profile photo updated successfully
            setModalContent("Profile photo updated successfully");
            setModalClassName(
                "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
            setTimeout(() => {
                setShowPopup(false);
                window.location.reload();
            }, 2000);
        } catch (error) {
            setShowPopup(true);
            setModalContent(
                "Error updating profile picture. Please try again."
            );
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);
        }
        setIsLibraryOpen(false);
    };

    if (isSaved) {
        router.push("/profile");
    }
    if (!currentUser) {
        return <Loader />;
    } else {
        return (
            <div className='pt-5 flex min-h-screen flex-col items-center justify-center sm-types '>
                <h1 className='sm-text font-semibold text-lg md:text-4xl md:mt-5'>
                    {t("edit:editProfile")}
                </h1>

                {/* Profile Picture /Change */}
                <form onSubmit={handleUpdateProfile} className='mt-4'>
                    <div className='flex flex-col md:flex-row items-center md:items-start justify-around'>
                        <div className='flex justify-center items-center h-2/12 w-4/12 rounded-full overflow-hidden md:w-4/12 h-5/12 mt-8 mb-6'>
                            <Image
                                src={
                                    auth?.currentUser.photoURL !== null
                                        ? auth?.currentUser.photoURL
                                        : "/images/icon_default.png"
                                }
                                width={300}
                                height={300}
                                alt=''
                                className='h-full w-full rounded-full'
                            />
                        </div>

                        {/* Change Picture */}
                        <div className='flex flex-col mt-4 md:flex-row md:ml-10 md:mt-40 '>
                            <input
                                type='file'
                                accept='image/*'
                                id='profilePictureInput'
                                style={{ display: "none" }}
                                onChange={handleUploadProfilePicture}
                            />

                            {/* Profile pic input */}
                            <label
                                htmlFor='profilePictureInput'
                                className='bg-[#2E7EAA] flex justify-center items-center mt-2 text-center px-2 text-xs text-white shadow-md md:mt-4 md:h-12 cursor-pointer rounded md:text-lg'
                            >
                                {t("edit:uploadNew")}
                            </label>

                            <button
                                className='librarybtn mt-2 text-center px-2 text-xs outline outline-1 rounded shadow-md md:text-lg md:ml-2'
                                type='button'
                                onClick={(e) => handleOpenLibrary(e)}
                            >
                                {t("edit:chooseFromLibrary")}
                            </button>

                            {isLibraryOpen && (
                                <PicturesLibrary
                                    isLibraryOpen={isLibraryOpen}
                                    selectedImage={selectedImage}
                                    setSelectedImage={setSelectedImage}
                                    onClose={handleCloseLibrary}
                                    onHandleSave={handleSaveSelectedImage}
                                    className='z-1000'
                                />
                            )}
                        </div>
                    </div>

                    {/* Edit Information */}
                    <div className='flex flex-col items-center mt-4 md:flex-row md:justify-around md:gap-x-5'>
                        <div className='w-[100 px] text-center'>
                            <h3 className='font-semibold text-lg text-gray-600'>
                                {t("edit:Name")}:
                            </h3>
                            <p className='mt-2 mb-4'>{currentUser.Name}</p>
                        </div>
                        <div className='w-[100 px] text-center'>
                            <h3 className='font-semibold text-lg text-gray-600'>
                                {t("edit:Surname")}:
                            </h3>
                            <p className='mt-2 mb-4'>{currentUser.Surename}</p>
                        </div>
                        <div className='w-[100 px] text-center'>
                            <h3 className='font-semibold text-lg text-gray-600'>
                                {t("edit:Email")}:
                            </h3>
                            <p className='mt-2 mb-4'>{currentUser.email}</p>
                        </div>
                        <div className='w-[100 px] text-center '>
                            <h3 className='font-semibold text-lg text-gray-600'>
                                {t("edit:Location")}:
                            </h3>
                            <p className='mt-2 mb-4'>{currentUser.Location}</p>
                        </div>
                    </div>
                    {/* Your Interests */}
                    <h3 className='font-semibold text-md mt-3 w-70 md:mt-5 md:text-3xl'>
                        {t("edit:Interests")}
                    </h3>
                    <div className='grid grid-container grid-cols-1 gap-8 -ml-15 mt-3 text-center justify-evenly sm:grid-cols-2 sm:gap-4 md:grid-cols-3 text-xs md:w-full md:h-auto md:mt-8 md:text-3xl'>
                        {EventTypes.map((type, index) => (
                            <button
                                key={index}
                                className={`outline outline-1 h-12 md:h-15 -mx-1 rounded outline-[#2E7EAA] font-semibold text-[#2E7EAA] whitespace-normal text-xs ${
                                    userInterests.includes(type)
                                        ? "text-white bg-[#2E7EAA]"
                                        : ""
                                }`}
                                onClick={(e) => handleUpdateInterests(type, e)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    {/* Save Interests Button */}
                    <div className='mt-4 flex flex-col items-center md:mx-auto'>
                        <button
                            type='submit'
                            className='mt-7 bg-[#2E7EAA]  text-center h-10 w-30  px-4 py-2 text-xs text-white shadow-md md:h-14 md:w-45 md:h-13 md:font-bold md:text-xl '
                        >
                            {t("edit:saveChanges")}
                        </button>
                    </div>
                </form>
                {/* Change Password */}
                <div className='flex mt-6 justify-center'>
                    <div className='md:w-[700px] sm:w-[500px] w-[250px] bg-[#B4CD93] h-[250px] sm:h-[200px] mb-4'>
                        <h3 className='font-bold mt-5 text-center md:text-2xl'>
                            {t("edit:changePassword")}
                        </h3>
                        <form
                            onSubmit={handleChangePassword}
                            className='w-full flex gap-6 flex-col items-center justify-center'
                        >
                            <div className='flex items-center sm:flex-row flex-col gap-3 w-full sm:justify-around sm:gap-14 sm:px-10'>
                                <input
                                    type='password'
                                    placeholder='New Password'
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    className='w-[40vw] sm:w-[50vw] h-8 px-3 rounded md:h-10'
                                    required
                                />
                                <input
                                    type='password'
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className='w-[40vw] sm:w-[50vw] h-8 px-3 rounded md:h-10'
                                    required
                                />
                            </div>
                            <div className='flex sm:flex-row sm:justify-evenly flex-col gap-3 w-[80px] sm:w-full'>
                                <button
                                    type='submit'
                                    className='bg-[#2E7EAA] text-center h-8 w-full md:w-32 text-xs text-white rounded shadow-md md:h-10 md:text-lg'
                                >
                                    {t("edit:Submit")}
                                </button>
                                <button className='text-center h-8 w-full bg-white opacity-70 md:w-32 text-xs outline outline-1 rounded shadow-md md:h-10 md:text-lg'>
                                    {t("edit:Cancel")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {showPopup && (
                    <Modal
                        message={modalContent}
                        onClose={handleSuccess}
                        className={modalClassName}
                    />
                )}
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
            ])),
            // Will be passed to the page component as props
        },
    };
}
