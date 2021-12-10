import { Footer, Header } from "src/components";

export const DarkPageWrapper: React.FC = (props) => {
  return (
    <div className="Page Page_dark">
      <Header withoutScrollSideEffects={true} isLight={true} />
      <div className="Page-inner display_flex">
        <div className="w-100 display_flex">{props.children}</div>
      </div>
      <Footer isLight={true} />
    </div>
  );
};
