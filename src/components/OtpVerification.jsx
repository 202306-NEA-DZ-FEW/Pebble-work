import { useRef, useState } from "react";

import styles from "@/styles/EventCreation.module.css";

const OtpInput = ({ onKeyDown, onChange, length }) => {
    const [inputValues, setInputValues] = useState(Array(length).fill(""));
    const inputRefs = useRef([]);

    const handleInputChange = (index, inputValue) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = inputValue;
        setInputValues(newInputValues);

        const otp = newInputValues.join("");
        onChange(otp);

        // Move focus to the next input field
        if (inputValue !== "" && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace" && inputValues[index] === "") {
            const newInputValues = [...inputValues];
            newInputValues[index - 1] = "";
            setInputValues(newInputValues);

            // Move focus to the previous input field
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    return (
        <>
            <div className={styles.otpContainer} onKeyDown={onKeyDown}>
                {inputValues.map((inputValue, index) => (
                    <input
                        key={index}
                        type='text'
                        value={inputValue}
                        onChange={(e) =>
                            handleInputChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        maxLength={1}
                        autoFocus={index === 0}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                    />
                ))}
            </div>
            <style jsx>{`
                input {
                    background-color: white;
                }
            `}</style>
        </>
    );
};

export default OtpInput;
