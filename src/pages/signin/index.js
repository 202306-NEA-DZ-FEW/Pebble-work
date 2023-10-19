import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { RiTwitterXFill } from "react-icons/ri";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../util/firebase";
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Modal from "@/components/Popup/Modal";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Translat from "@/util/Translat";

const SignInPage = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalClassName, setModalClassName] = useState("");
    const { t, dir } = Translat(props._nextI18Next.initialLocale);

    const handleSuccess = () => {
        setShowPopup(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setShowPopup(true);
            setModalContent("Congrats! You signed in/up successfully.");
            setModalClassName(
                "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
            setTimeout(() => {
                router.push("/events");
            }, 3000);
        } catch (error) {
            setShowPopup(true);
            setModalContent("Sign in/up failed.");
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
        }
    };
    const handelGoogle = async (e) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            setShowPopup(true);
            setModalContent("Congrats! You signed in/up successfully.");
            setModalClassName(
                "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
            setTimeout(() => {
                router.push("/events");
            }, 3000);
        } catch (error) {
            setShowPopup(true);
            setModalContent("Sign in/up failed.");
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
        }
    };

    return (
        <>
            <div
                className='flex justify-center items-center h-screen'
                dir={dir}
            >
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
                            Sign In
                        </h2>
                        <div className='mb-4'>
                            <button
                                className=' border px-4 py-2 mb-2 rounded-md shadow-md flex items-center justify-center'
                                style={{ height: "40px", width: "300px" }}
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
                                <div className='shrink basis-0 h-0.5 bg-stone-500 bg-opacity-25  border-t flex-grow'></div>
                            </div>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className='mb-4'>
                                <label
                                    className="block mb-2 text-stone-500 text-base font-normal font-['Rubik']"
                                    htmlFor='email'
                                >
                                    Email address
                                </label>
                                <input
                                    className='w-full px-3 py-2 border rounded'
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{ height: "40px", width: "300px" }}
                                />
                            </div>
                            <div className='mb-4 relative'>
                                <label
                                    className="block mb-2 text-stone-500 text-base font-normal font-['Rubik']"
                                    htmlFor='password'
                                >
                                    Your password
                                </label>
                                <input
                                    className='w-full px-3 py-2 border rounded'
                                    type={showPassword ? "text" : "password"}
                                    id='password'
                                    name='password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    style={{ height: "40px", width: "300px" }}
                                />

                                <div
                                    className='absolute top-0 right-0 m-3 cursor-pointer'
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
                                >
                                    Sign In
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
        </>
    );
};

export default SignInPage;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
