import React from "react";

const GalleryCard = () => {
    const images = [
        "IMG1.png",
        "IMG2.png",
        "IMG3.png",
        "IMG4.png",
        "IMG5.png",
        "IMG6.png",
        "IMG7.png",
        "IMG8.png",
        "IMG9.png",
        "IMG10.png",
        "IMG11.png",
        "IMG12.png",
        "IMG13.png",
        "IMG14.png",
        "IMG15.png",
        "IMG16.png",
        "IMG17.png",
        "IMG18.png",
    ];

    return (
        <div
            className='flex justify-center items-center'
            style={{ maxWidth: "100%", margin: "0 auto" }}
        >
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className='bg-gray-100 p-2 md:p-4 flex items-center justify-center'
                    >
                        <img
                            src={`/images/${image}`}
                            alt={`Image ${index + 1}`}
                            className='max-w-full h-auto'
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryCard;
