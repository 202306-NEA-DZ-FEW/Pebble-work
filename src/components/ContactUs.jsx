import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import emailjs from "emailjs-com";
import styles from "@/styles/ContactUs.module.css";

const ContactForm = () => {
    const auth = getAuth();
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
                setUserPhone(user.phoneNumber);
            } else {
                setUserEmail("");
                setUserPhone("");
            }
        });

        return () => unsubscribe();
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateInput()) {
            // If any required field is empty, set isSubmitted to true to trigger the flashing red border
            setIsSubmitted(true);
            // Return early to prevent the form from being submitted
            return;
        }

        // Get form data
        const formData = new FormData(event.target);
        const firstName = formData.get("firstname");
        const lastName = formData.get("lastname");
        const email = userEmail || emailInput;
        const phone = userPhone || phoneInput;
        const message = formData.get("message");

        // Compose the email parameters
        const emailParams = {
            from_name: `${firstName} ${lastName}`,
            to_name: "Pebble Team",
            subject: "New Form Submission",
            message: `Email: ${email}\nPhone: ${phone}\n\n${message}`,
        };

        // Send the email using EmailJS
        emailjs
            .send(
                "service_0fjrhbf",
                "template_h17hsb1",
                emailParams,
                "BYaRB-Pd4x_cssRgf"
            )
            .then((response) => {
                console.log("Email sent successfully!", response.text);
                // Reset the form after successful submission
                event.target.reset();
            })
            .catch((error) => {
                console.error("Error sending email:", error);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail("");
            }
        });

        return () => unsubscribe();
    }, []);
    const validateInput = () => {
        return firstName && lastName && userEmail && userPhone && message;
    };

    return (
        <div
            className={`${styles.formHeight} flex flex-col items-center justify-center mx-auto gap-4`}
        >
            <h2>Contact Us</h2>
            <form className='h-[40vh]' onSubmit={handleSubmit}>
                <div className='input-row'>
                    <input
                        type='text'
                        id='fname'
                        name='firstname'
                        placeholder='First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={
                            !firstName && isSubmitted
                                ? `${styles.emptyInput}`
                                : ""
                        }
                    />
                    <input
                        type='text'
                        id='lname'
                        name='lastname'
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={
                            !lastName && isSubmitted
                                ? `${styles.emptyInput}`
                                : ""
                        }
                    />
                </div>

                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Email'
                    value={userEmail || emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                <br />

                <input
                    type='tel'
                    id='phone'
                    name='phone'
                    placeholder='Phone Number'
                    value={userPhone || phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                />
                <br />

                <textarea
                    id='message'
                    name='message'
                    placeholder='What can we do for you?'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={
                        !message && isSubmitted ? `${styles.emptyInput}` : ""
                    }
                ></textarea>
                <br />

                <input type='submit' value='Submit' />

                <style jsx>{`
                    .input-row {
                        display: flex;
                        justify-content: space-between;
                    }

                    .input-row > input {
                        width: 48%;
                    }
                    #message {
                        max-height: 300px;
                    }

                    input[type="email"],
                    input[type="tel"],
                    textarea {
                        width: 100%;
                        margin-top: 1em;
                    }

                    input,
                    textarea {
                        padding: 12px;
                        box-sizing: border-box;
                    }

                    input[type="submit"] {
                        background-color: #4caf50;
                        color: white;
                        padding: 14px 20px;
                        border: none;
                        cursor: pointer;
                        margin-top: 1em;
                        width: 100%;
                    }

                    input[type="submit"]:hover {
                        background-color: #45a049;
                    }
                `}</style>
            </form>
        </div>
    );
};

export default ContactForm;
