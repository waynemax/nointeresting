module.exports = {
  locales: ["ru", "en", "sr", "es"],
  sourceLocale: "ru",
  fallbackLocales: {
    default: "ru",
  },
  catalogs: [
    {
      path: "src/translations/locales/{locale}/messages",
      include: ["src/pages", "src/components", "src/features", "src/wrappers"],
    },
  ],
  format: "po",
};
