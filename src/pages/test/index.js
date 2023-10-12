import { collection, addDoc } from "firebase/firestore";
import { db } from "@/util/firebase";
import React from "react";

function index() {
    const cookiesCollectionRef = collection(db, "cookies");
    const addCookie = async (e) => {
        e.preventDefault();

        await addDoc(cookiesCollectionRef, {
            cookie: "baked",
            frosting: "white",
            children: "in jail",
        });
    };

    return (
        <div style={{ width: "400px", alignContent: "center", margin: "auto" }}>
            <p>test page for Firebase</p>

            <div style={{ marginTop: "3rem" }}>
                <button
                    onClick={addCookie}
                    style={{
                        background: "blue",
                        height: "2rem",
                        width: "150px",
                        borderRadius: "8px",
                    }}
                >
                    Add a cookie
                </button>
            </div>
        </div>
    );
}

export default index;
