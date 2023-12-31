import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";

const PicturesLibrary = ({
    isLibraryOpen,
    onClose,
    setSelectedImage,
    selectedImage,
    onHandleSave,
}) => {
    const libraryRef = useRef(null);

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const storage = getStorage();
            const imagesRef = ref(storage, `Profilepictureslibrary`);

            // List all the images in the folder.
            const res = await listAll(imagesRef);

            // Get the download URL for each image.
            for (const itemRef of res.items) {
                const imageURL = await getDownloadURL(itemRef);

                // Update the state only if the image URL is not already in the state.
                setImages((prevImages) => {
                    if (!prevImages.includes(imageURL)) {
                        return [...prevImages, imageURL];
                    } else {
                        return prevImages;
                    }
                });
            }
        };

        fetchImages();

        /// a function to close the library when the user clicks outside it

        const handleClickOutside = (event) => {
            if (isLibraryOpen) {
                const isInsideModal = event.target.closest(".modal-content");
                const isLibraryButton =
                    event.target.classList.contains("librarybtn");

                if (!isInsideModal && !isLibraryButton) {
                    onClose();
                }
            }
        };

        if (isLibraryOpen) {
            document.addEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isLibraryOpen]);

    if (!images) {
        return <div>Loading</div>;
    }
    return (
        <div
            ref={libraryRef}
            className='absolute inset-10 md:inset-72 z-50 flex items-center justify-center bg-opacity-50 h-screen place-items-center'
        >
            <div className='modal-content bg-[#B4CD93] p-8 rounded-lg'>
                <div className='library-images grid grid-cols-3 gap-4'>
                    {/* Display library images here */}
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt='Library Image'
                            onClick={() => setSelectedImage(image)}
                            className={`w-20 h-20 object-cover cursor-pointer md:h-40 md:w-40 ${
                                selectedImage === image
                                    ? "border-2 border-blue-500"
                                    : ""
                            }`}
                        />
                    ))}
                </div>
                <div className='mt-4 flex justify-center'>
                    <button
                        className='mr-2 px-4 py-2 bg-red-500 text-white rounded'
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className='px-4 py-2 bg-[#2E7EAA] text-white rounded'
                        onClick={onHandleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PicturesLibrary;
