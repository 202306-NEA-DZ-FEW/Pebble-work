import React from "react";
import Link from "next/link";

const Signup = () => {
    return (
        <>
            <Link href='/signup'>
                <button
                    className={`w-[52px] bg-blue-400 text-white text-[10px] hover:bg-blue-500 xl:text-[15px] md:text-[12px] rounded-[4px] h-[16px] xl:w-[127px] xl:h-[41px] sm:w-[72.23px] sm:h-[25.5px]`}
                >
                    Sign Up
                </button>
            </Link>
        </>
    );
};

export default Signup;
