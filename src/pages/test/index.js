import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { db, auth } from "../../util/firebase";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    arrayUnion,
    updateDoc,
    deleteDoc,
    getDoc,
} from "firebase/firestore";

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
    const sendMessage = async (e) => {
        e.preventDefault();

        if (user) {
            const chatRef = doc(db, "database", "Chat");

            const newMessageData = {
                text: newMessage,
                timestamp: new Date().getTime(),
                uid: user.uid,
            };

            await updateDoc(chatRef, {
                messages: arrayUnion(newMessageData),
            });

            setNewMessage("");

            // Schedule the deletion of the message after 40 seconds
            setTimeout(async () => {
                const chatDoc = await getDoc(chatRef);
                const chatData = chatDoc.data();
                const updatedMessages = chatData.messages.filter(
                    (message) => message.timestamp !== newMessageData.timestamp
                );

                await updateDoc(chatRef, { messages: updatedMessages });
            }, 40000);
        } else {
            console.log("you are not signed in");
        }
    };

    return (
        <div>
            {messages.map((message, i) => (
                <p key={i}>{message.text}</p>
            ))}
            <form onSubmit={sendMessage}>
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type='submit'>Send</button>
            </form>
        </div>
    );
};

export default Chat;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "about"])),
            // Will be passed to the page component as props
        },
    };
}
