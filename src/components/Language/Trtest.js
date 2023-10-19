import { useState } from "react";
import { useRouter } from "next/router";

const ChangeTurkishButton = () => {
    const [path, setPath] = useState("");
    const router = useRouter();

    const changeTurkish = () => {
        // Reset the path state
        setPath("");

        // Get the current path using router.pathname
        const currentPath = router.pathname;

        // Check if the current path starts with '/tr/'
        if (currentPath.startsWith("/tr/")) {
            // If it already starts with '/tr/', no need to update the path
            setPath(currentPath);
        } else {
            // Append '/tr/' to the current path
            const newPath = `/tr${currentPath}`;

            // Update the path state with the new path
            setPath(newPath);
        }
    };

    return (
        <div>
            <button onClick={changeTurkish}>Change to Turkish</button>
            <p>Current Path: {path}</p>
        </div>
    );
};

export default ChangeTurkishButton;
