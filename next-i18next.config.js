const path = require("path");
module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "tr", "de", "zh"],
        localePath: path.resolve("./public/locales"),
        defaultNS: "common",
        serializeConfig: false,
    },
};
