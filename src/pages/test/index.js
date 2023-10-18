import React, { useState, useEffect } from "react";
import styles from "@/styles/Pebble.module.css";

const Pebble = () => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Fetch or set your images data here
        const fetchedImages = [
            "/pebble.png",
            "/peb.png",
            "/pebbzea.png",
            "/pebbxxcve.png",
            "/pebbtreye.png",
            "/pebbrytrye.png",
            "/pebboiule.png",
            "/pebbrtygfhe.png",
            "/pebbfghe.png",
            "/pebbfghgfle.png",
            "/pebbuule.png",
            "/pebbtzele.png",
            "/pebblzzre.png",
            "/pebbeezale.png",
            "/pebblsdce.png",
            "/pebblwxbe.png",
            "/pebblzeteze.png",
            "/pebbeezale.png",
            "/pebblsdce.png",
            "/pebblwxbe.png",
            "/pebblzeteze.png",
            "/pebbeezale.png",
            "/pebblsdce.png",
            "/pebblwxbe.png",
            "/pebblzeteze.png",
        ];

        setImages(fetchedImages);
    }, []);

    const renderImages = () => {
        // Calculate the start and end index of the images to be rendered
        const startIndex = (currentPage - 1) * 6;
        const endIndex = startIndex + 6;

        return images
            .slice(startIndex, endIndex)
            .map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} />
            ));
    };

    return <div>{renderImages()}</div>;
};

export default Pebble;
