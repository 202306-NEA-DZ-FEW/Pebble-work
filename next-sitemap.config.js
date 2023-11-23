module.exports = {
    siteUrl: "https://pebble-work.vercel.app",
    generateRobotsTxt: true,
    exclude: ["/server-sitemap.xml"],
    robotsTxtOptions: {
        additionalSitemaps: [
            "https://pebble-work.vercel.app/server-sitemap.xml",
        ],
    },
};
