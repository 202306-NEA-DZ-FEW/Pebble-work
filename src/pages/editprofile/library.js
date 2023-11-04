import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db, auth, storage, firestore } from "../../util/firebase";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
} from "firebase/storage";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";

const PicturesLibrary = ({
    onClose,
    setSelectedImage,
    selectedImage,
    onHandleSave,
}) => {
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        const storage = getStorage();
        const imagesRef = ref(storage, `Profilepictureslibrary`);

        // List all the images in the folder.
        const res = await listAll(imagesRef);

        // Get the download URL for each image.
        const imageURLs = await Promise.all(
            res.items.map(async (itemRef) => await getDownloadURL(itemRef))
        );
        console.log(imageURLs);
        // Set the state variable with the image URLs.
        setImages(imageURLs);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    if (!images) {
        return <div>Loading</div>;
    }
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='modal-content bg-white p-8 rounded-lg'>
                <div className='library-images grid grid-cols-3 gap-4'>
                    {/* Display library images here */}
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt='Library Image'
                            onClick={() => setSelectedImage(image)}
                            className={`w-20 h-20 object-cover cursor-pointer ${
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
                        className='px-4 py-2 bg-green-500 text-white rounded'
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
