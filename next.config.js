const path = require("path");

module.exports = {
  i18n: {
    locales: ["ru", "en", "sr", "es"],
    defaultLocale: "ru",
  },
  node: {
    fs: "empty",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    disableStaticImages: true,
  },
};
