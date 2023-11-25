import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { GrStatusGood } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";

import Loader from "@/components/Loader/Loader";
import MorphingSvg from "@/components/MorphingSvg";
import Modal from "@/components/Popup/Modal";

import { auth, db, storage } from "@/util/firebase";

import PicturesLibrary from "./library";

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
    const [CurrentPassword, setCurrentPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [hasSpecialChars, setHasSpecialChars] = useState(false);
    const [isSignUpDisabled, setIsSignUpDisabled] = useState(true);

    const EventTypes = [
        t("eventTypes.noPoverty"),
        t("common:eventTypes:zeroHunger"),
        t("common:eventTypes:goodHealth"),
        t("common:eventTypes:qualityEducation"),
        t("common:eventTypes:cleanEnergy"),
        t("common:eventTypes:decentWork"),
        t("common:eventTypes:innovationInfrastructure"),
        t("common:eventTypes:reducedInequalities"),
        t("common:eventTypes:responsibleConsumption"),
        t("common:eventTypes:sustainableCities"),
        t("common:eventTypes:climateAction"),
        t("common:eventTypes:lifeBelowWater"),
        t("common:eventTypes:lifeOnLand"),
        t("common:eventTypes:peaceJustice"),
    ];
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
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
        setShowPopup(true);
        setModalContent(
            "Profile updated successfuly,you are being redirected to your profile",
        );
        setModalClassName(
            "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]",
        );
        setTimeout(() => {
            router.push("/profile");
        }, 3000);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;

        setConfirmPassword(newPassword);
        const minLength = 6;
        const containsSpecialCharacter =
            /[!@#$%^&*(),.?": '; = `{}|<>_ ~ \- +/ [\]]/;
        const isValidLength = confirmPassword.length >= minLength;
        const hasSpecialCharacter =
            containsSpecialCharacter.test(confirmPassword);
        setIsLengthValid(isValidLength);
        setHasSpecialChars(hasSpecialCharacter);

        const allConditionsMet = isLengthValid && hasSpecialChars;
        setIsSignUpDisabled(!allConditionsMet);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        const minLength = 6;
        const containsSpecialCharacter =
            /[!@#$%^&*(),.?": '; = `{}|<>_ ~ \- +/ [\]]/;
        const isValidLength = confirmPassword.length >= minLength;
        const hasSpecialCharacter =
            containsSpecialCharacter.test(confirmPassword);

        if (!isValidLength || !hasSpecialCharacter) {
            setShowPopup(true);
            setModalContent(
                "Password must be at least 6 characters and contain special characters",
            );
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]",
            );
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;

        const credential = EmailAuthProvider.credential(
            user.email,
            CurrentPassword,
        );

        try {
            // Change the user's password
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, confirmPassword);

            setShowPopup(true);
            setModalContent("Password updated successfully");
            setModalClassName(
                "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]",
            );
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);

            setConfirmPassword("");
        } catch (error) {
            if (error.code === "auth/weak-password") {
                setShowPopup(true);
                setModalContent("Password should be at least 6 characters");
            } else {
                setShowPopup(true);
                setModalContent("Error changing password. Please try again.");
            }

            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]",
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
            // Check file extension
            const allowedExtensions = ["jpg", "jpeg", "png"];
            const fileExtension = file.name.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                setShowPopup(true);
                setModalContent(
                    "Invalid file extension. Allowed extensions are: jpg, jpeg, and png",
                );
                setModalClassName(
                    "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]",
                );
                setTimeout(() => {
                    setShowPopup(false);
                }, 2000);
                e.target.value = null;
                return;
            }
            // Check file size
            const maxSize = 4 * 1024 * 1024; // 4MB
            if (file.size > maxSize) {
                setShowPopup(true);
                setModalContent("File size exceeds the allowed limit of 5MB");
                setModalClassName(
                    "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]",
                );
                setTimeout(() => {
                    setShowPopup(false);
                }, 2000);
                e.target.value = null;
                return;
            }
            try {
                const storageRef = ref(
                    storage,
                    `profilePictures/${currentUserId}`,
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
                    "Error uploading profile picture. Please try again.",
                );
                setModalClassName(
                    "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]",
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
                "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]",
            );
            setTimeout(() => {
                setShowPopup(false);
                window.location.reload();
            }, 2000);
        } catch (error) {
            setShowPopup(true);
            setModalContent(
                "Error updating profile picture. Please try again.",
            );
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]",
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
            <div className='pt-5 z-[555] flex min-h-screen flex-col items-center justify-center sm-types '>
                <h1 className='sm-text font-semibold text-lg md:text-4xl md:mt-5'>
                    {t("edit:editProfile")}
                </h1>
                <div
                    style={{
                        position: "absolute",
                        width: "screen",
                        height: "screen",
                    }}
                >
                    <MorphingSvg />
                </div>

                {/* Profile Picture /Change */}
                <form onSubmit={handleUpdateProfile} className='mt-4 z-10'>
                    <div className='flex flex-col md:flex-row items-center md:items-start justify-around'>
                        <div className='flex justify-center items-center lg:h-[35vh] sm:h-[25vh] h-[20vh] w-[40vw] sm:w-[30vw] lg:w-[20vw] rounded-full overflow-hidden'>
                            <Image
                                src={
                                    auth?.currentUser.photoURL !== null
                                        ? auth?.currentUser.photoURL
                                        : "/images/icon_default.png"
                                }
                                width={300}
                                height={300}
                                alt=''
                                className='h-full z-[20] w-full object-cover rounded-full'
                            />
                        </div>

                        {/* Change Picture */}
                        <div className='flex z-[20] flex-col mt-4 md:flex-row md:ml-10 md:mt-40 '>
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
                    <div className='flex z-50 flex-col flex-wrap items-center mt-4 md:flex-row md:justify-around md:gap-x-5 px-5'>
                        <div
                            className='morphingSVGHidden'
                            style={{
                                position: "absolute",
                                bottom: "140px",
                                width: "screen",
                                height: "screen",
                            }}
                        >
                            <MorphingSvg />
                        </div>
                        <div className='z-20'>
                            <h3 className='font-semibold text-md mt-3 w-70 md:mt-5 md:text-3xl'>
                                {t("edit:Name*")}
                            </h3>
                            <input
                                type='text'
                                placeholder='  Name'
                                className='outline outline-1 mt-2 lg:w-3/4 rounded md:mt-5'
                                name='name'
                                defaultValue={currentUser.Name}
                                onChange={(e) => setEditedName(e.target.value)}
                                required
                            ></input>
                        </div>
                        <div className='z-20'>
                            {" "}
                            <h3 className='font-semibold text-md mt-3 w-70 md:mt-5 md:text-3xl'>
                                {t("edit:Surname*")}
                            </h3>
                            <input
                                type='text'
                                placeholder='  Surname'
                                className='outline outline-1 mt-3 lg:w-3/4 rounded md:mt-5'
                                name='surname'
                                defaultValue={currentUser.Surename}
                                onChange={(e) =>
                                    setEditedSurname(e.target.value)
                                }
                                required
                            ></input>
                        </div>
                        <div className='z-20'>
                            <h3 className='font-semibold text-md mt-3 w-70 md:mt-5 md:text-3xl'>
                                {t("edit:Email*")}
                            </h3>
                            <input
                                type='email'
                                placeholder='  Email'
                                className='outline outline-1 mt-3 lg:w-3/4 rounded md:mt-5'
                                name='email'
                                defaultValue={currentUser.email}
                                onChange={(e) => setEditedEmail(e.target.value)}
                                required
                            ></input>
                        </div>

                        {/*  */}
                        <div className='z-20'>
                            <h3 className='font-semibold text-md mt-3 w-70 md:mt-5 md:text-3xl'>
                                {t("edit:Location")}
                            </h3>
                            <input
                                type='text'
                                placeholder='  Location'
                                className='outline outline-1 mt-3 lg:w-3/4 rounded md:mt-5'
                                name='location'
                                defaultValue={currentUser.Location}
                                onChange={(e) =>
                                    setEditedLocation(e.target.value)
                                }
                            ></input>
                        </div>
                    </div>
                    {/* Your Interests */}
                    <h3 className='font-semibold px-5 text-md mt-3 w-70 md:mt-5 md:text-3xl'>
                        {t("edit:interests")}
                    </h3>
                    <div className='grid px-5 grid-container grid-cols-1 gap-8 -ml-15 mt-3 text-center justify-evenly sm:grid-cols-2 sm:gap-4 md:grid-cols-3 text-xs md:w-full md:h-auto md:mt-8 md:text-3xl'>
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
                    <div className='  md:w-[700px] sm:w-[500px] w-[250px] bg-[#B4CD93] h-[360px] sm:h-[260px] mb-4'>
                        <h3 className='font-bold mt-5 text-center md:text-2xl'>
                            {t("edit:changePassword")}
                        </h3>
                        <form
                            onSubmit={handleChangePassword}
                            className='w-full flex gap-6 flex-col items-center justify-center'
                        >
                            <div className='flex items-center sm:flex-row flex-col gap-3 w-full sm:justify-around sm:gap-14 sm:px-10 relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t("edit:currentPassword")}
                                    value={CurrentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
                                    className='w-[40vw] md:w-[50vw]  sm:w-[30vw] h-8 px-3 rounded md:h-10'
                                    required
                                />
                                <div
                                    className='absolute -bottom-1.5 right-1 m-4 cursor-pointer'
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <BsEye /> : <BsEyeSlash />}
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t("edit:newPassword")}
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        handlePasswordChange(e);
                                    }}
                                    className='w-[40vw] md:w-[50vw]  sm:w-[30vw] h-8 px-3 rounded md:h-10'
                                    required
                                />
                            </div>
                            <div>
                                <p
                                    style={{
                                        color: hasSpecialChars
                                            ? "green"
                                            : "#FB923C",
                                        display: "flex",
                                        alignItems: "center",
                                        margin: "0",
                                        padding: "0",

                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {isLengthValid ? (
                                        <GrStatusGood size={20} />
                                    ) : (
                                        <TiDeleteOutline size={20} />
                                    )}
                                    <span
                                        style={{
                                            marginLeft: "0.6rem",
                                            marginRight: "-0.2rem",
                                        }}
                                    >
                                        {t("edit:passwordLengthRequirement")}
                                    </span>
                                </p>

                                <span
                                    style={{
                                        color: hasSpecialChars
                                            ? "green"
                                            : "#FB923C",
                                        display: "flex",
                                        alignItems: "center",
                                        margin: "0",
                                        padding: "0",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {hasSpecialChars ? (
                                        <GrStatusGood size={20} />
                                    ) : (
                                        <TiDeleteOutline size={20} />
                                    )}
                                    <span
                                        style={{
                                            marginLeft: "0.5rem",
                                            marginRight: "-0.2rem",
                                        }}
                                    >
                                        {t(
                                            "edit:passwordSpecialCharacterRequirement",
                                        )}
                                    </span>
                                </span>
                            </div>
                            <div className='flex sm:flex-row sm:justify-evenly flex-col gap-3 w-[80px] md:w-full sm:w-[180px] mt-0 mb-12'>
                                <button
                                    type='submit'
                                    className='bg-[#2E7EAA] text-center h-8 w-full md:w-32 text-xs text-white rounded shadow-md md:h-10 md:text-lg'
                                    disabled={isSignUpDisabled}
                                >
                                    {t("edit:submit")}
                                </button>
                                <button className='text-center h-8 w-full bg-white opacity-70 md:w-32 text-xs outline outline-1 rounded shadow-md md:h-10 md:text-lg'>
                                    {t("edit:cancel")}
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
