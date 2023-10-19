import React from "react";

const ImageSquareCard = () => {
    return (
        <div style={styles.container}>
            <div style={styles.gridContainer}>
                <div style={styles.imageWrapper}>
                    <img
                        src='https://s3-alpha-sig.figma.com/img/4db9/fd07/53407faccbb8d5404b15b7777558bbc1?Expires=1698624000&Signature=iPg9~ymyaUPLwWeu6YD2tyuOKNYvmuBWQZXjX3YdNCe6eLM9x6AcTgIu4LdPmoKjhhf5EVHU1IYD9XQ2TxTuXNLvRAbdS6G-o~FWJeLuVEs~zv5puaIPfx~xOb24x57NfheCBEcRD3To0xVG-PQGGcHC2zCLg8nDs5pbXFtW2KGLaYoMSBWfF-q4LSda79B9aPWNkZ~ANWqt-TDaQY6qEsl-SmrEIXhS00LtF2AE9lyc~BSpokHrHuU9AS-h8IhjYhaUUCIWvz2GaGlw~p8k1RpEUxon7ETGl82WsYwCerzMTXhkY72mMMd6CPemZWYvt9r1AO0vky18G6m129fCYg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                        style={styles.image}
                        alt='Image 1'
                    />
                </div>
                <div style={styles.imageWrapper}>
                    <img
                        src='https://s3-alpha-sig.figma.com/img/4ff3/78a5/a98c78da2810812b42676787c5862607?Expires=1698624000&Signature=Zd-ZCKuZkfEeWzopMIw0kdGeWJmN-fU8TXbii82xYNiQQKZfr-Rn1EfjUV~sz~4MasD-D3Z0neJa3lwhmk~CHvW1iORAOROVtf5fzBZcAdbUnTTsjL4F3Ulg3cXJpGcFZ5yffXyJLU4L3shDhHZZkhOGZWpiNQadPjP9Orb80EjkQyP2ZzhmenslXICn17pajW2LptjOm3txAtm1-mlEwzGcOwbVIPbJflAxICFKW-gMKWGmWkv8nTxxetu-lbPD03-yozv7roWutsihe3HSfgm3fOFB3ts1VL6xUjit7fCyVib6MU6KHj5WqPekSUprQKj~BgjenL~n6IIEHN5Gmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                        style={styles.image}
                        alt='Image 2'
                    />
                </div>
                <div style={styles.imageWrapper}>
                    <img
                        src='https://s3-alpha-sig.figma.com/img/21fe/eb69/c3c9014133fffcb3abbc3241abb391e1?Expires=1698624000&Signature=W4~~XvuptIOBWG1cLDBLuM8oS9xZZYMx6vlUZu2k7bwChro~1HfbLXYi8larpZv79ANV3IY0ZKhuRq2aCnp44jiVKE83FgeIIIsfrNWdt07tGW80XRCvVP1~K~YohNQueVt-f9VilPfFA-fytnUuM2ipNmURnON7lZh46V41Ci~teE4ycTgSdtqXR5DumRDy~VwKJW4dVr-i5T4UwSkWe6LppFOkpaWSrI~d9TjdS36DQAmz~oV0H0d1Oh92DuvrJ7hueQYgl2Gvm8VaNHJ5rmUT9PJvWLxjdjXx0eszoh74fDeZe9nnQFEL4MlalLoNEsS9rpLlWdXKZrHBytCFbg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                        style={styles.image}
                        alt='Image 3'
                    />
                </div>
                <div style={styles.imageWrapper}>
                    <img
                        src='https://s3-alpha-sig.figma.com/img/767b/e7e9/0be165728d82378860a59f0db503bb36?Expires=1698624000&Signature=H~mOeKoKL-fL8UcL2-7MG2LYH1S1WMqfx7Vbgs7p4t02OA64TATXJ8j1WyNMd2ucdaSPUokbSguAw46bZ8clJN3D~WgIipl7Qeb4tyVyXbG2T98I2aUE9vb2YMzqbFDLc6RVMI-Zts7LhPOBc-7aSWp0YM0eOqdFHdqZLngSbmHrnt8Ln3Xvgg3Aizu53WX217YzNZoMZZVFXJrqbmejm15Y-y4hidZAKxjXuTd1YMHsb~2Y4zlQ-uJKbxvutQNiWPf~Yg-3HTSTNvFHHbOIVdCdhwJFhEXfa78WBGghxyuioNr3QBYU~mPjK-C7zd~3DjsmAUdJUo3BaIqTwVML6w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
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
