import {
    createUserWithEmailAndPassword,
    isSignInWithEmailLink,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    updateProfile,
} from "firebase/auth";
import {
    GoogleAuthProvider,
    signInWithPopup,
    TwitterAuthProvider,
} from "firebase/auth";
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { GrStatusGood } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";

import BtnGoogle from "@/components/BtnTwitter&Google/ButtonGoogle";
import ButtonTwitter from "@/components/BtnTwitter&Google/ButtonTwitter";
import Modal from "@/components/Popup/Modal";

import { auth } from "../../util/firebase";
import { db } from "../../util/firebase";
const checkUserAuth = (router) => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            router.replace("/profile");
        }
    });
};

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Surename, setSurename] = useState("");
    const [password, setPassword] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalClassName, setModalClassName] = useState("");
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [hasSpecialChars, setHasSpecialChars] = useState(false);
    const [hasalphabetValid, setalphabetValid] = useState(false);
    const [isSignUpDisabled, setIsSignUpDisabled] = useState(true);
    const [isAllconditionMet, setisAllconditionMet] = useState(true); // New state

    useEffect(() => {
        checkUserAuth(router);
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSuccess = () => {
        setShowPopup(true);
    };
    const checkIfEmailExists = async (email) => {
        const users = collection(db, "users");
        const queryEmail = query(users, where("email", "==", email));
        const result = await getDocs(queryEmail);
        return !result.empty;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        const lengthValid = newPassword.length >= 6;
        const specialCharsValid =
            /[!@#$%^&*(),.?": '; = `{}|<>_ ~ \- +/ [\]]/.test(newPassword);
        const alphabetValid = /[a-zA-Z]/.test(newPassword);
        setIsLengthValid(lengthValid);
        setHasSpecialChars(specialCharsValid);
        setalphabetValid(alphabetValid);
        const allConditionsMet =
            lengthValid && specialCharsValid && alphabetValid;
        setIsSignUpDisabled(!allConditionsMet);
        setisAllconditionMet(allConditionsMet);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        const emailExists = await checkIfEmailExists(email);
        if (emailExists) {
            setShowPopup(true);
            setModalContent("Sign in/up failed.");
            setModalContent("This email is already in use.");
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px] mb-4   "
            );
            return;
        }
        // if (password.length < 6) {
        //     setShowPopup(true);
        //     setModalContent("6 characters needed for password.");
        //     setModalClassName(
        //         "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px] mb-4   "
        //     );
        //     return;
        // }

        const emailRegex = /^(.+)@(gmail|yahoo|outlook)\.(com|co\.uk|fr)$/;
        if (!emailRegex.test(email)) {
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
                Name
            );
            const user = userCredential.user;
            const usersCollection = collection(db, "users");

            //user's UID becomes the doc's ID
            const userDocRef = doc(usersCollection, user.uid);

            await setDoc(userDocRef, {
                Name: Name,
                Surename: Surename,
                email: email,
                interests: [],
                eventsCreated: [],
                eventsJoined: [],
            });

            await updateProfile(user, { displayName: Name });

            setShowPopup(true);
            setModalContent("Congrats! You signed in/up successfully.");
            setModalClassName(
                "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px] mb-4 "
            );
            setTimeout(() => {
                router.push("/editprofile");
            }, 1500);
        } catch (error) {
            setShowPopup(true);
            setModalContent("Sign in/up failed.");
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px] mb-4 "
            );
        }
    };
    const handelGoogle = async (e) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // Extract first and last names from displayName
            const displayName = result.user.displayName;
            const [firstName, lastName] = displayName.split(" ");

            // Create user object with name, surename, and email
            const user = {
                Name: firstName,
                Surename: lastName,
                email: result.user.email,
                interests: [],
                eventsCreated: [],
                eventsJoined: [],
            };

            // Get the user UID
            const userUID = result.user.uid;

            // Get a reference to the "users" collection
            const usersCollectionRef = collection(db, "users");

            // Add the user object to the "users" collection with the user UID as the document ID
            await setDoc(doc(usersCollectionRef, userUID), user);

            setShowPopup(true);
            setModalContent("Congrats! Sign-in link sent to your email.");
            setModalClassName(
                "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px] mb-4  "
            );
            setTimeout(() => {
                router.push("/editprofile");
            }, 1500);
        } catch (error) {
            setShowPopup(true);
            setModalContent("Sign in/up failed.");
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px] mb-4  "
            );
        }
    };

    const handelTwitter = async (e) => {
        e.preventDefault();
        try {
            const provider = new TwitterAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // Extract first and last names from displayName
            const displayName = result.user.displayName;
            const [firstName, lastName] = displayName.split(" ");

            // Retrieve email from additionalUserInfo
            const email = result._tokenResponse.email;

            // Create user object with name, surename, and email
            const user = {
                Name: firstName,
                Surename: lastName,
                email: email,
                interests: [],
                eventsCreated: [],
                eventsJoined: [],
            };

            const userUID = result.user.uid;

            // Get a reference to the "users" collection
            const usersCollectionRef = collection(db, "users");

            // Add the user object to the "users" collection with the user UID as the document ID
            await setDoc(doc(usersCollectionRef, userUID), user);

            setShowPopup(true);
            setModalContent("Congrats! You signed in/up successfully.");
            setModalClassName(
                "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px] mb-4"
            );
            setTimeout(() => {
                router.push("/editprofile");
            }, 1500);
        } catch (error) {
            setShowPopup(true);
            setModalContent("Sign in/up failed.");
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex items-center w-1/2'>
                <div className='mr-10'>
                    <Image
                        src='/images/Sitting.png'
                        alt='Sitting'
                        width={1920}
                        height={1080}
                        layout='responsive'
                        objectFit='cover'
                    />
                </div>
                <div>
                    <h2 className="text-zinc-800 text-[32px] font-medium font-['Rubik'] mb-4">
                        Sign Up
                    </h2>
                    <div className='mb-4'>
                        <ButtonTwitter onClick={handelTwitter} />
                        <BtnGoogle onClick={handelGoogle} />

                        <div className='flex items-center mb-4 mt-4'>
                            <div className='   shrink basis-0 h-0.5 bg-stone-500 bg-opacity-25 border-t flex-grow'></div>
                            <div className="text-stone-500 text-lg font-normal font-['Rubik'] px-4">
                                OR
                            </div>
                            <div className='   shrink basis-0 h-0.5 bg-stone-500 bg-opacity-25  border-t flex-grow'></div>
                        </div>
                    </div>
                    <form onSubmit={handleSignup}>
                        <div className='mb-4'>
                            <input
                                className='w-full px-3 py-2 border rounded'
                                type='text'
                                id='text'
                                name='text'
                                placeholder='Name'
                                required
                                style={{ height: "40px", width: "150px" }}
                                value={Name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                className='w-full px-3 py-2 border rounded ml-4'
                                type='text'
                                id='text'
                                name='text'
                                placeholder='Surename'
                                required
                                style={{ height: "40px", width: "150px" }}
                                value={Surename}
                                onChange={(e) => setSurename(e.target.value)}
                            />
                        </div>

                        <div className='mb-4'>
                            <input
                                className={`w-full px-3 py-2 border rounded ${
                                    formSubmitted ? "border-red-500" : ""
                                }`}
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Email address'
                                value={email}
                                required
                                style={{ height: "40px", width: "320px" }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-4 relative'>
                            <input
                                className='w-full px-3 py-2 border rounded'
                                type={showPassword ? "text" : "password"}
                                id='password'
                                name='password'
                                placeholder='Your password'
                                required
                                style={{ height: "40px", width: "320px" }}
                                value={password}
                                onChange={handlePasswordChange}
                            />

                            <div
                                className='absolute -bottom-1.5 right-1 m-4 cursor-pointer'
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <BsEye /> : <BsEyeSlash />}
                            </div>
                        </div>
                        <div>
                            <span
                                style={{
                                    color: isLengthValid ? "green" : "#FB923C",
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "0",
                                    padding: "0",
                                    lineHeight: "0.05",
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
                                        marginLeft: "0.5rem",
                                        marginRight: "-0.2rem",
                                    }}
                                >
                                    At least 6 characters
                                </span>
                            </span>
                            <br />
                            <span
                                style={{
                                    color: hasSpecialChars
                                        ? "green"
                                        : "#FB923C",
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "0",
                                    padding: "0",
                                    lineHeight: "0.05",
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
                                    Contains special characters
                                </span>
                            </span>
                            <br />
                            <span
                                style={{
                                    color: hasalphabetValid
                                        ? "green"
                                        : "#FB923C",
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "0",
                                    padding: "0",
                                    lineHeight: "0.05",
                                    fontSize: "0.9rem",
                                }}
                            >
                                {hasalphabetValid ? (
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
                                    Contains alphabets
                                </span>
                            </span>
                        </div>

                        <div>
                            <div className="text-stone-500 text-sm font-normal font-['Rubik'] mt-4">
                                Dont have an account?
                                <Link
                                    href='/signin'
                                    className='text-orange-400 ml-1'
                                >
                                    Sign
                                </Link>
                            </div>
                        </div>
                        <div className='flex justify-start'>
                            <button
                                className=' px-4 py-2 bg-orange-400 text-white rounded  transform hover:scale-110 transition-transform duration-300 '
                                type='submit'
                                disabled={isSignUpDisabled}
                            >
                                Sign Up
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
};

export default SignUpPage;
