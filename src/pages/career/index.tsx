import { GetStaticProps, NextPage } from "next";
import { loadTranslation } from "src/shared/utils/translation";
import { DarkPageWrapper } from "../../hoc/page-wrapper/dark-page-wrapper";
import { Career } from "../../features/career";

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
      <main>
        <DarkPageWrapper>
          <Career />
        </DarkPageWrapper>
      </main>
    </div>
  );
};
export default Index;
