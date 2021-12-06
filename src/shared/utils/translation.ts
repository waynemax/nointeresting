import { I18n } from "@lingui/core";
import { en, es, sr, ru } from "make-plural/plurals";

export function initTranslation(i18n: I18n): void {
  i18n.loadLocaleData({
    ru: { plurals: ru },
    en: { plurals: en },
    sr: { plurals: sr },
    es: { plurals: es },
  });
}

export async function loadTranslation(locale: string, isProduction = true) {
  let data;
  if (isProduction) {
    data = await import(`../../translations/locales/${locale}/messages`);
  } else {
    data = await import(`@lingui/loader!../../translations/locales/${locale}/messages.po`);
  }
  return data.messages;
}
