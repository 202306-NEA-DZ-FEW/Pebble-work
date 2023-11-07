import "@testing-library/jest-dom/extend-expect";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("next-i18next", () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));
