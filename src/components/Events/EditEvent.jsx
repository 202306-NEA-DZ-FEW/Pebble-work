import React from "react";

function EditEvent() {
    return (
        <>
            <div
                className={`bg-center bg-no-repeat w-screen h-[600px] `}
                style={{
                    backgroundImage: `url('/images/noAccess.jpg')`,
                    backgroundSize: "contain",
                }}
            >
                <p className='text-center text-xl text-red-600 px-5'>
                    You don&apos;t have the necessary permissions to access this
                    page.
                </p>
            </div>

            <div className='flex justify-center items-center mb-6'>
                <button
                    className="text-center mb-[2rem] cursor-pointer text-2xl font-medium font-'Rubik' leading-10 tracking-tight bg-cyan-700 text-white px-4 py-2 rounded-lg"
                    onClick={() => (window.location.href = `/`)}
                >
                    Homepage
                </button>
            </div>
        </>
    );
}

export default EditEvent;
