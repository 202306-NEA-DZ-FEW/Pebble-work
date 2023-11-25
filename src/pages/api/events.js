import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { db } from "@/util/firebase";
export default async function handler(req, res) {
    try {
        let { type, location, date } = req.query;

        // Split the type and date parameters back into arrays
        type = type ? type.split(",") : [];
        date = date ? date.split(",") : [];

        let eventsQuery = collection(db, "events");

        // Adjust the queries to use 'in' instead of '=='
        if (type.length > 0) {
            eventsQuery = query(eventsQuery, where("type", "in", type));
        }

        if (location) {
            eventsQuery = query(eventsQuery, where("location", "==", location));
        }
        // Order by timestamp in descending order
        eventsQuery = query(eventsQuery, orderBy("timestamp", "desc"));

        const eventsSnapshot = await getDocs(eventsQuery);
        let eventsData = eventsSnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });

        if (date.length > 0) {
            // Split the date array into chunks of 30 dates or less because of the firebase "in" limitation
            const dateChunks = chunkArray(date, 30);

            eventsData = eventsData.filter((event) =>
                dateChunks.some((dateChunk) => dateChunk.includes(event.date)),
            );
        }

        res.status(200).json(eventsData);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

// split an array into chunks
function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}
