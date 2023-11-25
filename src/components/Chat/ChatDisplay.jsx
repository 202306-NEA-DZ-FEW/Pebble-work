import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import Chat from "./Chat";
import { auth, db } from "../../util/firebase";

const ChatDisplay = ({ onNewMessage }) => {
    const [messages, setMessages] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date().getTime());
    const getUserName = async (uid) => {
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);

        return userDoc.data().Name;
    };

    // Listen for new messages
    useEffect(() => {
        const chatRef = doc(db, "database", "Chat");

        const unsubscribe = onSnapshot(chatRef, async (docSnapshot) => {
            const chatData = docSnapshot.data();

            const validMessages = chatData.messages.filter((message) => {
                // Check if the message was sent more than 180 seconds ago
                const messageAge = currentTime - message.timestamp;
                return messageAge <= 180000;
            });

            for (let message of validMessages) {
                message.userName = await getUserName(message.uid);
            }

            // Check if there are new messages
            if (validMessages.length > messages.length) {
                onNewMessage(); // call the callback when a new message arrives
            }

            setMessages(validMessages);
        });

        return () => unsubscribe();
    }, [currentTime, messages.length]);

    // Update the current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div className='flex relative pl-2 justify-center max-h-full w-full scrollBar overflow-y-scroll'>
                <div className='w-full'>
                    {messages.map((message, i) => {
                        // Calculate the age of the message in seconds
                        const messageAge =
                            (currentTime - message.timestamp) / 1000;

                        // Calculate the opacity based on the age of the message
                        let style = {};
                        if (messageAge > 178) {
                            const transitionDuration = 181 - messageAge;
                            style = {
                                opacity: 0,
                                transition: `opacity ${transitionDuration}s linear`,
                            };
                        }

                        // Determine the alignment of the message based on the user
                        const alignment =
                            message.uid === auth.currentUser.uid
                                ? "chat chat-end"
                                : "chat chat-start";

                        return (
                            <div
                                key={i}
                                className={`overflow-hidden ${alignment}`}
                            >
                                <div
                                    className='chat-bubble overflow-x-hidden break-words'
                                    style={style}
                                >
                                    <strong>{message.userName}</strong>:{" "}
                                    {message.text}
                                </div>
                            </div>
                        );
                    })}
                    <Chat />
                </div>
            </div>
        </>
    );
};

export default ChatDisplay;
