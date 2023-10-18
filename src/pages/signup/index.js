import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { RiTwitterXFill } from "react-icons/ri";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../util/firebase";
import { db } from "../../util/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import {
    GoogleAuthProvider,
    signInWithPopup,
    TwitterAuthProvider,
} from "firebase/auth";
const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Surename, setSurename] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password, Name)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: Name,
                });
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };
    const handelGoogle = async (e) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);

            router.push("/editprofile");
        } catch (error) {
            console.error("Error signing up with Google", error);
        }
    };
    const handelTwitter = async (e) => {
        e.preventDefault();
        try {
            const provider = new TwitterAuthProvider();
            await signInWithPopup(auth, provider);
            router.push("/editprofile");
        } catch (error) {
            console.error("Error signing up with Google", error);
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
                        <button
                            className=' border px-4 py-2 mb-2 rounded-md shadow-md flex items-center justify-center'
                            style={{ height: "40px", width: "300px" }}
                            onClick={handelTwitter}
                        >
                            <RiTwitterXFill className='ml-2 mr-1' />
                            <span>Continue with Twitter</span>
                        </button>
                        <button
                            className=' border px-4 py-2 mb-2 rounded-md shadow-md flex items-center justify-center'
                            style={{ height: "40px", width: "300px" }}
                            onClick={handelGoogle}
                        >
                            <FcGoogle className='ml-2 mr-1' />
                            <span>Continue with Google</span>
                        </button>
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
                                className='w-full px-3 py-2 border rounded'
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
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <div
                                className='absolute -bottom-1.5 right-1 m-4 cursor-pointer'
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <BsEye /> : <BsEyeSlash />}
                            </div>
                        </div>

                        <div>
                            <div className="text-stone-500 text-sm font-normal font-['Rubik'] mt-4">
                                Dont have an account?
                                <Link
                                    href='/signup'
                                    className='text-orange-400 ml-1'
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                        <div className='flex justify-start'>
                            <button
                                className=' px-4 py-2 bg-orange-400 text-white rounded  transform hover:scale-110 transition-transform duration-300 '
                                type='submit'

                                // onClick={handleSignup}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
