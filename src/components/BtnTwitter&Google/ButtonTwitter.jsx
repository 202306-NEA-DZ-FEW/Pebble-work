import React from "react";
import { RiTwitterXFill } from "react-icons/ri";

const ButtonTwitter = () => {
    return (
        <button
            className=' border px-4 py-2 mb-2 rounded-md shadow-md flex items-center justify-center'
            style={{ height: "40px", width: "300px" }}
            // onClick={onClick}
        >
            <RiTwitterXFill className='ml-2 mr-1' />
            <span>Continue with Twitter</span>
        </button>
    );
};

export default ButtonTwitter;
