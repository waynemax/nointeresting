import { useRouter } from "next/router";
import { useState } from "react";
import { t } from "@lingui/macro";

type LOCALES = "ru" | "en" | "sr" | "es";

export function LanguageSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState<LOCALES>(router.locale!.split("-")[0] as LOCALES);

  const languages: { [key: string]: string } = {
    ru: t`Russian`,
    en: t`English`,
    sr: t`Serbian`,
    es: t`Spanish`,
  };

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const locale = event.target.value as LOCALES;
    setLocale(locale);
    router.push(router.pathname, router.pathname, { locale });
  }

  return (
    <select value={locale} onChange={handleChange}>
      {Object.keys(languages).map((locale) => {
        return (
          <option value={locale} key={locale}>
            {languages[locale as unknown as LOCALES]}
          </option>
        );
      })}
    </select>
  );
}
