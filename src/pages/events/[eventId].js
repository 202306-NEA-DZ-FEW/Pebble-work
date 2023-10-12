import React from "react";
import Image from "next/image";
import { Rubik } from "next/font/google";

const rubik = Rubik({
    subsets: ["latin"],
    variable: "--font-rubik",
});

const EventsPage = () => {
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
                style={{ margin: "auto", width: "60%" }}
                className={`${rubik.variable} font-sans`}
            >
                <h2
                    className='text-2xl font-bold'
                    style={{ marginBottom: "2rem" }}
                >
                    Event long and nice title
                </h2>
                <div
                    style={{ marginBottom: "6rem", gap: "4rem" }}
                    className='flex flex-col sm:flex-row mb-16 sm:mb-32 gap-4'
                >
                    <div
                        style={{ margin: "auto", width: "100%" }}
                        className={`sm:w-2/5 mx-auto`}
                    >
                        <Image
                            src={"/event_image.png"}
                            width={450}
                            height={450}
                        />
                    </div>
                    <div style={{ width: "100%" }}>
                        <p>
                            <b>Location</b>
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
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse in vestibulum ligula. Sed quis mi
                            auctor, congue tortor in, tincidunt justo. Nullam
                            nec purus a ex rhoncus suscipit. Aenean vel
                            tristique massa, ac fermentum tortor. <br />
                            Duis eleifend, quam in congue viverra, urna massa
                            bibendum nulla, non tincidunt justo ex eget sapien.
                            Nulla facilisi. Vestibulum nec ex in orci accumsan
                            condimentum. <br />
                            Integer hendrerit bibendum nisl, nec interdum
                            libero. Sed vel tincidunt lorem, vel malesuada est.
                            Proin et est a orci scelerisque scelerisque. <br />
                            Phasellus euismod purus vel urna condimentum, a
                            bibendum mi faucibus.
                        </p>
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
        </>
    );
};

export default EventsPage;
