import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Bubble.module.css";
import ChatDisplay from "./ChatDisplay";
import { IoChatbubblesOutline } from "react-icons/io5";

const Bubble = () => {
    const [expanded, setExpanded] = useState(false);
    const [newMessage, setNewMessage] = useState(false);
    const bubbleRef = useRef(null);

    const handleButtonClick = () => {
        setExpanded(!expanded);
        if (!expanded) {
            setNewMessage(false); // reset new message state when chat is opened
        }
    };
    const handleClickOutside = (event) => {
        if (bubbleRef.current && !bubbleRef.current.contains(event.target)) {
            setExpanded(false);
        }
    };
    useEffect(() => {
        // Add the event listener when the component mounts
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleNewMessage = () => {
        if (!expanded) {
            setNewMessage(true); // only set new message state if chat is not opened
        }
    };

    return (
        <div ref={bubbleRef} className='fixed -right-1 bottom-2'>
            <button
                className={`${styles.expandingButton} ${
                    newMessage ? styles.newMessage : ""
                }`}
                onClick={handleButtonClick}
            >
                <IoChatbubblesOutline size={15} />
            </button>
            <div
                className={`flex items-end absolute bottom-[100%] right-2 ${
                    styles.expandingDiv
                } ${expanded ? styles.expanded : ""}`}
            >
                <ChatDisplay onNewMessage={handleNewMessage} />
            </div>
        </div>
    );
};

export default Bubble;
