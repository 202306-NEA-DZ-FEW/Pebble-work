import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import emailjs from "emailjs-com";
import styles from "@/styles/ContactUs.module.css";
import { toast } from "react-toastify";

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

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmailInput("");
        setPhoneInput("");
        setMessage("");
    };

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
            setIsSubmitted(true);
            return;
        }

        // Get form data
        const formData = new FormData(event.target);
        const firstName = formData.get("firstname");
        const lastName = formData.get("lastname");
        const message = formData.get("message");

        // Use the email and phone values from state variables
        const email = userEmail || emailInput;
        const phone = userPhone || phoneInput;

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
            .then(() => {
                toast.success("Email sent successfully!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                // Reset the form after successful submission
                event.target.reset();
                resetForm();
            })
            .catch(() => {
                toast.error("Failed to send the Email", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
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
        const email = userEmail || emailInput;
        const phone = userPhone || phoneInput;
        return firstName && lastName && email && phone && message;
    };

    return (
        <div
            className={`${styles.formHeight} flex flex-col mt-[-150px] items-center mx-auto gap-4`}
        >
            <h2>Contact Us</h2>
            <form className='h-[40vh]' onSubmit={handleSubmit}>
                <div className='input-row'>
                    <input
                        style={{
                            background: "var(--fill-white, #FFF)",
                            border: "solid",
                            borderRadius: "4px",
                        }}
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
                        style={{
                            background: "var(--fill-white, #FFF)",
                            border: "solid",
                            borderRadius: "4px",
                        }}
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
                    style={{
                        background: "var(--fill-white, #FFF)",
                        border: "solid",
                        borderRadius: "4px",
                    }}
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Email'
                    value={userEmail || emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                <br />

                <input
                    style={{
                        background: "var(--fill-white, #FFF)",
                        border: "solid",
                        borderRadius: "4px",
                    }}
                    type='tel'
                    id='phone'
                    name='phone'
                    placeholder='Phone Number'
                    value={userPhone || phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                />
                <br />

                <textarea
                    style={{
                        background: "var(--fill-white, #FFF)",
                        border: "solid",
                        borderRadius: "4px",
                    }}
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
