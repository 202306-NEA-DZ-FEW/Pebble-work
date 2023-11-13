import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/Dropdown.module.css";

const Dropdown = ({ options, selectedOption, setSelectedOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return (
        <div
            className={`text-xl bg-transparent font-bold sm:text-[14px] xl:text-[18px] ${styles.dropdown}`}
            ref={ref}
        >
            <button onClick={toggleOpen}>{selectedOption}</button>
            {isOpen && (
                <ul className={styles.dropdownMenu}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setSelectedOption(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
