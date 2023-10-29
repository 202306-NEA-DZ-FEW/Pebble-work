import { useState } from "react";

const OtpInput = ({ value, onChange, length }) => {
    const [inputValues, setInputValues] = useState(Array(length).fill(""));

    const handleInputChange = (index, inputValue) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = inputValue;
        setInputValues(newInputValues);

        const otp = newInputValues.join("");
        onChange(otp);
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace" && inputValues[index] === "") {
            const newInputValues = [...inputValues];
            newInputValues[index - 1] = "";
            setInputValues(newInputValues);
        }
    };

    return (
        <div className='otp-container'>
            {inputValues.map((inputValue, index) => (
                <input
                    key={index}
                    type='text'
                    value={inputValue}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={10}
                    autoFocus={index === 0}
                />
            ))}
        </div>
    );
};

export default OtpInput;
