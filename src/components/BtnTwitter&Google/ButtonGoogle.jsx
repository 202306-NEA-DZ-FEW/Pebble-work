import React from "react";
import { FcGoogle } from "react-icons/fc";

const BtnGoogle = ({ onClick }) => {
    return (
        <button
            className=' border px-4 py-2 mb-2 rounded-md shadow-md flex items-center justify-center'
            style={{ height: "40px", width: "300px" }}
            onClick={onClick}
        >
            <FcGoogle className='ml-2 mr-1' />
            <span>Continue with Google</span>
        </button>
    );
};

export default BtnGoogle;
