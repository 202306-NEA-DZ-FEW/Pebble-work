import React, { useState } from "react";
import styles from "@/styles/Bubble.module.css";
import ChatDisplay from "./ChatDisplay";
import { IoChatbubblesOutline } from "react-icons/io5";

const Bubble = () => {
    const [expanded, setExpanded] = useState(false);
    const [newMessage, setNewMessage] = useState(false);

    const handleButtonClick = () => {
        setExpanded(!expanded);
        if (!expanded) {
            setNewMessage(false); // reset new message state when chat is opened
        }
    };
    const handleNewMessage = () => {
        if (!expanded) {
            setNewMessage(true); // only set new message state if chat is not opened
        }
    };

    return (
        <div>
            <button
                className={`${styles.expandingButton} ${
                    newMessage ? styles.newMessage : ""
                }`}
                onClick={handleButtonClick}
            >
                {expanded ? "Close Chat" : "Open Chat"}
            </button>
            <div
                className={`flex items-end ${styles.expandingDiv} ${
                    expanded ? styles.expanded : ""
                }`}
            >
                <ChatDisplay onNewMessage={handleNewMessage} />
            </div>
        </div>
    );
};

export default Bubble;
