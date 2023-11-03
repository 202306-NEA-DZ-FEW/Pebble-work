import React from "react";
import { toast } from "react-toastify";

function MyComponent() {
    const handleClick = () => {
        toast.success("Email sent successfully!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    };

    return (
        <div>
            <button onClick={handleClick}>Show Toast</button>
        </div>
    );
}

export default MyComponent;
