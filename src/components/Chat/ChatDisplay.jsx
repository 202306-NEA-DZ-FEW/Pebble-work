import { useEffect, useState } from "react";
import { db, auth } from "../../util/firebase";
import { doc, onSnapshot, getDoc } from "firebase/firestore";

const ChatDisplay = () => {
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
                // Check if the message was sent more than 40 seconds ago
                const messageAge = currentTime - message.timestamp;
                return messageAge <= 40000; // 40000 milliseconds = 40 seconds
            });

            for (let message of validMessages) {
                message.userName = await getUserName(message.uid);
            }

            setMessages(validMessages);
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, [currentTime]); // Add currentTime as a dependency

    // Update the current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            {messages.map((message, i) => {
                // Calculate the age of the message in seconds
                const messageAge = (currentTime - message.timestamp) / 1000;

                // Calculate the opacity based on the age of the message
                let style = {};
                if (messageAge > 28) {
                    const transitionDuration = 40 - messageAge;
                    style = {
                        opacity: 0,
                        transition: `opacity ${transitionDuration}s linear`,
                    };
                }

                return (
                    <p key={i} style={style}>
                        <strong>{message.userName}</strong>: {message.text}
                    </p>
                );
            })}
        </div>
    );
};

export default ChatDisplay;
