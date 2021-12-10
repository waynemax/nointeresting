const path = require("path");

const withReactSvg = require("next-react-svg");

module.exports = withReactSvg({
  include: path.resolve(__dirname, "src/assets/images"),
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
