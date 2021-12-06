import "../assets/styles/globals.scss";
import { i18n } from "@lingui/core";
import { Provider } from "react-redux";
import { I18nProvider } from "@lingui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { initTranslation } from "../shared/utils/translation";
import store from "../store/store";
import type { AppProps } from "next/app";

initTranslation(i18n);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = router.locale || router.defaultLocale!;
  const firstRender = useRef(true);

  // run only once on the first render (for server side)
  if (pageProps.translation && firstRender.current) {
    i18n.load(locale, pageProps.translation);
    i18n.activate(locale);
    firstRender.current = false;
  }

  useEffect(() => {
    if (pageProps.translation) {
      i18n.load(locale, pageProps.translation);
      i18n.activate(locale);
    }
  }, [locale, pageProps.translation]);

  return (
    <>
      <Head>
        {router.locales!.concat("x-default").map((locale: string) => {
          const localePath = locale === "x-default" ? "" : `${locale}`;
          const href = `http://localhost:3000/${localePath}${router.asPath}`;
          return <link key={locale} rel="alternate" hrefLang={locale} href={href} />;
        })}
      </Head>
      <I18nProvider i18n={i18n}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </I18nProvider>
    </>
  );
}

export default MyApp;
