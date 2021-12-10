import { Footer, Header } from "src/components";

export const PageWrapper: React.FC = (props) => {
  return (
    <div className="Page">
      <Header withoutScrollSideEffects={true} isDark={true} />
      <div className="Page-inner display_flex">
        <div className="page-wrapper-container">
          <div>{props.children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
