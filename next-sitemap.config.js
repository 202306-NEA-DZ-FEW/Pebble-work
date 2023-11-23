module.exports = {
    siteUrl: "https://pebble-work.vercel.app",
    outDir: "./public", // specify the output directory here
    generateRobotsTxt: true,
    urls: [
        {
            url: "/",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: "/events",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: "/about",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
        },
    ],
};
