import React from "react";

const ImageSquareCard = () => {
    return (
        <div style={styles.container}>
            <div style={styles.gridContainer}>
                <div style={styles.imageWrapper}>
                    <img
                        src='/Homepage/Oxfams-COVID-19-Relief-Efforts 2.png'
                        style={styles.image}
                        alt='Image 1'
                    />
                </div>
                <div style={styles.imageWrapper}>
                    <img
                        src='/Homepage/Image.png'
                        style={styles.image}
                        alt='Image 2'
                    />
                </div>
                <div style={styles.imageWrapper}>
                    <img
                        src='/Homepage/Image (1).png'
                        style={styles.image}
                        alt='Image 3'
                    />
                </div>
                <div style={styles.imageWrapper}>
                    <img
                        src='/Homepage/Image (2).png'
                        style={styles.image}
                        alt='Image 4'
                    />
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: "100%",
        height: "100vh",
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "20px",
    },
    imageWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "580px",
        height: "307px",
        background:
            "linear-gradient(0deg, rgba(253, 168, 85, 0.20) 0%, rgba(253, 168, 85, 0.20) 100%)",
        borderRadius: "8px",
    },
};

export default ImageSquareCard;
