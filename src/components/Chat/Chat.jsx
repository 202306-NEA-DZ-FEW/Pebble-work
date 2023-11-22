import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { auth, db } from "@/util/firebase";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = auth.currentUser;

    // Listen for new messages
    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("timestamp"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => doc.data()));
        });

        return unsubscribe;
    }, []);

    // Send a new message
    // Send a new message
    // Send a new message
    // Send a new message
    const sendMessage = async (e) => {
        e.preventDefault();

        if (user) {
            const chatRef = doc(db, "database", "Chat");

            const newMessageData = {
                text: newMessage,
                timestamp: new Date().getTime(),
                uid: user.uid,
            };

            // Add the new message to the database
            await updateDoc(chatRef, {
                messages: arrayUnion(newMessageData),
            });

            setNewMessage("");

            // Get the current chat data
            const chatDoc = await getDoc(chatRef);
            const chatData = chatDoc.data();

            // Filter out messages that are older than 40 seconds
            const validMessages = chatData.messages.filter((message) => {
                const messageAge = newMessageData.timestamp - message.timestamp;
                return messageAge <= 40000;
            });

            // Update the database with the valid messages
            await updateDoc(chatRef, { messages: validMessages });
        } else {
            console.log("you are not signed in");
        }
    };

    return (
        <>
            <div
                className='min-w-full'
                style={{ position: "relative", display: "inline-block" }}
            >
                <form onSubmit={sendMessage}>
                    <textarea
                        className='min-w-full resize-none scrollBar'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage(e);
                            }
                        }}
                        style={{
                            paddingRight: "30px",
                            height: "80px",
                        }}
                    ></textarea>
                    <button
                        className='w-6'
                        type='submit'
                        style={{
                            position: "absolute",
                            right: "4px",
                            top: "4px",
                        }}
                    >
                        <img src='/icons/message.svg' alt='Send' />
                    </button>
                </form>
            </div>
        </>
    );
};

export default Chat;
