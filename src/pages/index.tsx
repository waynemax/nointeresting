import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { LanguageSwitcher } from "../components/language-switcher";
import { loadTranslation } from "../shared/utils/translation";
import { PageWrapper } from "../hoc";
import { PageWrapperWithCover } from "../hoc/page-wrapper/page-wrapper-with-cover";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(ctx.locale!, process.env.NODE_ENV === "production");
  return {
    props: {
      translation,
    },
  };
};

const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Megapolis-IT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageWrapperWithCover>
          <div style={{ padding: 20 }}>
            <LanguageSwitcher />
          </div>
        </PageWrapperWithCover>
      </main>
    </div>
  );
};

export default Index;
