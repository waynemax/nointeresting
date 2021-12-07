const path = require("path");
const withImages = require("next-images");
const withSvgr = require("next-svgr");

module.exports = withImages({
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
});
