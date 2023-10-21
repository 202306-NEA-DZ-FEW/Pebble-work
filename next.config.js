// next.config.js
const path = require("path");
const { i18n } = require("./next-i18next.config");

module.exports = {
    i18n: {
        ...i18n,
        // Add the additional properties here
        localePath: path.resolve("./public/locales"),
        defaultNS: "common",
        serializeConfig: false,
    },
    eslint: {
        dirs: ["src"],
    },
    reactStrictMode: true,
    images: {
        domains: ["firebasestorage.googleapis.com"],
    },
};
