import "@testing-library/jest-dom";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend";
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("next-i18next", () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        supportedLngs: ["en", "tr", "de", "zh"],
        nonExplicitSupportedLngs: true,
        backend: {
            loadPath: "./public/locales/{{lng}}/{{ns}}.json",
        },
    });
