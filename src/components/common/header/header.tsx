import styles from "./header.module.scss";
import { memo } from "react";
import classNames from "classnames";
import { useHeaderLogic } from "./header.logic";
// import LogotypeIcon from "../../../assets/images/brand/logo.svg";

const HeaderComponent = () => {
  const { navigationRender } = useHeaderLogic();
  return (
    <header
      className={classNames({
        [styles.headerComponent_dark]: true,
        [styles.headerComponent_light]: false,
      })}>
      <div className={styles.headerComponent_pseudo} />
      <div
        className={classNames({
          [styles.headerComponent_container]: true,
          [styles.headerComponent_filled]: true,
        })}>
        <div className={styles.headerComponent_container_center}>
          <div className={styles.headerComponent_container_logotype}>logotype</div>
          <div className={styles.headerComponent_container_navigation}>{navigationRender()}</div>
          <div className={styles.headerComponent_container_actions}>actions</div>
        </div>
      </div>
    </header>
  );
};

export const Header = memo(HeaderComponent);
