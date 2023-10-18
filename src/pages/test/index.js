import React, { useState, useEffect } from "react";

const fetchedImages = [
    "/images/AboutPebble.png",
    "/peb.png",
    "/pebbzea.png",
    "/pebbxxcve.png",
    "/pebbtreye.png",
    "/images/AboutPebble.png",
    "/pebbrytrye.png",
    "/pebboiule.png",
    "/pebbrtygfhe.png",
    "/pebbfghe.png",
    "/pebbfghgfle.png",
    "/images/AboutPebble.png",
    "/pebbuule.png",
    "/pebbtzele.png",
    "/pebblzzre.png",
    "/pebbeezale.png",
    "/images/AboutPebble.png",
    "/pebblsdce.png",
    "/pebblwxbe.png",
    "/pebblzeteze.png",
    "/pebbeezale.png",
    "/pebblsdce.png",
    "/pebblwxbe.png",
    "/pebblzeteze.png",
    "/images/AboutPebble.png",
    "/pebbeezale.png",
    "/pebblsdce.png",
    "/pebblwxbe.png",
    "/images/AboutPebble.png",
    "/pebblzeteze.png",
];

const InfiniteScrollImages = () => {
    const [images, setImages] = useState([]); // State to store the fetched images
    const [page, setPage] = useState(1); // State to keep track of the current page
    const [loading, setLoading] = useState(false); // State to indicate if new images are being fetched

    // Function to fetch images based on the page number
    const fetchImages = (page) => {
        const startIndex = (page - 1) * 3; // Calculate the start index of the images to fetch
        const endIndex = startIndex + 3; // Calculate the end index of the images to fetch
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fetchedImages.slice(startIndex, endIndex)); // Return a subset of the fetchedImages array
            }, 1000); // Simulate a delay of 1 second
        });
    };

    // Function to fetch more images when scrolling to the bottom
    const fetchMoreImages = async () => {
        setLoading(true); // Set loading state to true
        const newImages = await fetchImages(page); // Fetch new images based on the current page
        setImages((prevImages) => [...prevImages, ...newImages]); // Append the new images to the existing images
        setPage((prevPage) => prevPage + 1); // Increment the page number
        setLoading(false); // Set loading state to false
    };

    useEffect(() => {
        // Event listener for scrolling
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                fetchMoreImages(); // Fetch more images when scrolling to the bottom of the page
            }
        };

        window.addEventListener("scroll", handleScroll); // Add scroll event listener
        return () => {
            window.removeEventListener("scroll", handleScroll); // Remove scroll event listener on component unmount
        };
    }, []);

    useEffect(() => {
        fetchMoreImages(); // Fetch initial set of images
    }, []);
    return (
        <div>
            {images.map((image, index) => (
                <img
                    className='w-56 h-56'
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                />
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default InfiniteScrollImages;
