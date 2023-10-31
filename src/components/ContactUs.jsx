import React from "react";

const ContactForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
    };

    return (
        <div className='flex flex-col items-center justify-center mx-auto gap-4'>
            <h2>Contact Us</h2>
            <form className='h-[40vh]' onSubmit={handleSubmit}>
                <div className='input-row'>
                    <input
                        type='text'
                        id='fname'
                        name='firstname'
                        placeholder='First Name'
                    />
                    <input
                        type='text'
                        id='lname'
                        name='lastname'
                        placeholder='Last Name'
                    />
                </div>

                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Email'
                />
                <br />

                <input
                    type='tel'
                    id='phone'
                    name='phone'
                    placeholder='Phone Number'
                />
                <br />

                <textarea
                    id='message'
                    name='message'
                    placeholder='What can we do for you?'
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
