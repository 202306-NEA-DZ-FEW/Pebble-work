import React, { useState } from "react";
import styles from "@/styles/Bubble.module.css";
import ChatDisplay from "./ChatDisplay";

const Bubble = () => {
    const [expanded, setExpanded] = useState(false);

    const handleButtonClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <button
                className={styles.expandingButton}
                onClick={handleButtonClick}
            >
                {expanded ? "Close Chat" : "Open Chat"}
            </button>
            <div
                className={`flex items-end ${styles.expandingDiv} ${
                    expanded ? styles.expanded : ""
                }`}
            >
                <ChatDisplay />
            </div>
        </div>
    );
};

export default Bubble;
