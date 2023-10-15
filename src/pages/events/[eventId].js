import React from "react";
import Image from "next/image";
import { Rubik } from "next/font/google";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/util/firebase";

const rubik = Rubik({
    subsets: ["latin"],
    variable: "--font-rubik",
});

const EventsPage = ({ event }) => {
    const cellData = [
        "Mona M.",
        "Aether M.",
        "Jangis M.",
        "Lisa M.",
        "Diluc M.",
        "Dori S.",
    ];
    return (
        <>
            <div
                style={{ margin: "auto", width: "60%", paddingTop: "6rem" }}
                className={`${rubik.variable} font-sans`}
            >
                <h2
                    className='text-2xl font-bold'
                    style={{ marginBottom: "2rem" }}
                >
                    {event.title}
                </h2>
                <div
                    style={{ marginBottom: "6rem", gap: "4rem" }}
                    className='flex flex-col sm:flex-row mb-16 sm:mb-32 gap-4'
                >
                    <div
                        style={{ margin: "auto", width: "100%" }}
                        className={`sm:w-2/5 mx-auto`}
                    >
                        {event.image ? (
                            <Image
                                src={event.image}
                                width={450}
                                height={450}
                                alt='event pic'
                            />
                        ) : (
                            <Image
                                src={"/event_image.png"}
                                width={450}
                                height={450}
                                alt='event pic'
                            />
                        )}
                    </div>
                    <div style={{ width: "100%" }}>
                        <p>
                            <b>Location:</b> {event.location}
                            <br />
                            Time and date
                            <br />
                            <br />
                            <b>Attendees</b>
                            <br />
                            Organized by <b>Dude&apos;s name</b>
                        </p>

                        <button
                            className='btn btn-sm btn-wide'
                            style={{
                                marginTop: "1rem",
                                borderRadius: "8px",
                                background: "#FDA855",
                                border: 0,
                                color: "white",
                            }}
                        >
                            Join now
                        </button>
                    </div>
                </div>
                <div style={{ display: "flex", gap: "3rem" }}>
                    <div style={{ maxWidth: "500px" }}>
                        <h3 className='text-2xl font-bold'>
                            Event Description:
                        </h3>

                        {event ? (
                            <p>{event.description}</p>
                        ) : (
                            <p>
                                Loading... there might be no event description{" "}
                                {"):"}
                            </p>
                        )}
                    </div>

                    <div>
                        <h3 className='text-xl font-bold'>Attendees:</h3>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 20px)",
                                gap: "3rem",
                                marginTop: "1rem",
                            }}
                        >
                            {cellData.map((name, index) => (
                                <div key={index}>
                                    <div
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            background: "black",
                                            color: "white",
                                            textAlign: "center",
                                            padding: "8px",
                                        }}
                                    >
                                        {index + 1}
                                    </div>
                                    <div>{name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: "200px", marginTop: "4rem" }}></div>
        </>
    );
};

export async function getServerSideProps(context) {
    // Get the event ID from the URL
    const eventId = context.params.eventId;

    console.log("hiii");
    // Fetch the event data from Firebase
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);
    const event = eventDoc.data();

    return {
        props: {
            event,
        },
    };
}

export default EventsPage;
