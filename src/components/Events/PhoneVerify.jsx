import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "@/util/firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import {
    RecaptchaVerifier,
    getAuth,
    PhoneAuthProvider,
    linkWithCredential,
    signInWithPhoneNumber,
} from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import OtpInput from "@/components/OtpVerification";
import { useTranslation } from "react-i18next";

const PhoneVerify = () => {
    const [otp, setOtp] = useState("");
    const [pn, setPn] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const { t } = useTranslation("verify");

    useEffect(() => {
        const recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {},
            },
            auth
        );
        recaptchaVerifier.render();
    }, []);

    const onSignup = () => {
        setLoading(true);
        const appVerifier = new RecaptchaVerifier("recaptcha-container");
        const formatPh = "+" + pn;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success(t("otpSent"));
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const onOTPVerify = async () => {
        setLoading(true);
        const currentUser = getAuth().currentUser;

        if (!currentUser || !currentUser.email || !currentUser.displayName) {
            console.log(t("verify:noCurrentUser"));
            return;
        }

        try {
            const phoneCredential = PhoneAuthProvider.credential(
                window.confirmationResult.verificationId,
                otp
            );

            await linkWithCredential(currentUser, phoneCredential);
            console.log(t("verify:phoneNumberLinked"));

            const db = getFirestore();
            const userDoc = doc(db, "users", currentUser.uid);
            const formatPh = "+" + pn;

            await updateDoc(userDoc, {
                phoneNumber: formatPh,
            });

            setTimeout(() => {
                location.reload();
            }, 2000);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            if (showOTP) {
                onOTPVerify();
            } else {
                onSignup();
            }
        }
    };

    return (
        <>
            <section className='bg-[#FDA855] bg-opacity-50 flex items-center justify-center h-screen'>
                <div>
                    <Toaster toastOptions={{ duration: 4000 }} />
                    <div id='recaptcha-container'></div>
                    {user ? (
                        <h2 className='text-center text-white font-medium text-2xl'>
                            👍 {t("verify:loginSuccess")}
                        </h2>
                    ) : (
                        <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
                            <h1 className='text-center leading-normal text-white font-medium text-3xl mb-6'>
                                {t("verify:verifyPhoneNumber")}
                            </h1>
                            {showOTP ? (
                                <>
                                    <div className='bg-white text-orange-500 w-fit mx-auto p-4 rounded-full'>
                                        <BsFillShieldLockFill size={30} />
                                    </div>
                                    <label
                                        htmlFor='otp'
                                        className='font-bold text-xl text-white text-center'
                                    >
                                        {t("verify:enterOTP")}
                                    </label>

                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        length={6}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button
                                        onClick={onOTPVerify}
                                        className='bg-[#FDA855] hover:bg-orange-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'
                                    >
                                        {loading && (
                                            <CgSpinner
                                                size={20}
                                                className='mt-1 animate-spin'
                                            />
                                        )}
                                        <span>{t("verify:verifyOTP")}</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className='bg-white text-orange-500 w-fit mx-auto p-4 rounded-full'>
                                        <BsTelephoneFill size={30} />
                                    </div>
                                    <label
                                        htmlFor='phoneNumber'
                                        className='font-bold text-xl text-white text-center'
                                    >
                                        {t("verify:verifyPhoneNumberLabel")}
                                    </label>
                                    <PhoneInput
                                        country={"dz"}
                                        value={pn}
                                        onChange={setPn}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button
                                        onClick={onSignup}
                                        className='bg-[#FDA855] ml-5 hover:bg-orange-700 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'
                                    >
                                        {loading && (
                                            <CgSpinner
                                                size={20}
                                                className='mt-1 animate-spin'
                                            />
                                        )}
                                        <span>
                                            {t("verify:sendCodeViaSMS")}
                                        </span>
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default PhoneVerify;
