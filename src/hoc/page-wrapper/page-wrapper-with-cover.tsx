import { Cover, Footer, Header } from "src/components";

export const PageWrapperWithCover: React.FC = (props) => {
  return (
    <div className="Page">
      <Cover>
        <Header />
      </Cover>
      <div className="Page-inner display_flex">
        <div className="page-wrapper-container">
          <div>{props.children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
