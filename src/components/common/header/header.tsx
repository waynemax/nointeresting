import styles from "./header.module.scss";
import { memo } from "react";
import classNames from "classnames";
import { useHeaderLogic } from "./header.logic";
import { Fade as Hamburger } from "hamburger-react";
import LogotypeIcon from "../../../assets/images/brand/logo.svg";
import SearchIcon from "../../../assets/images/icons/search.svg";
import CallIcon from "../../../assets/images/icons/call.svg";
import LogoTextIcon from "../../../assets/images/brand/logo-text.svg";

const HeaderComponent = () => {
  const { navigationRender, isScrolled, isOpenedMobileNavigation, setIsOpenedMobileNavigation } = useHeaderLogic();

  const renderMobileNavigation = (
    <div className="showForMobile">
      <div className={styles.headerComponent_mobileNavigation}>
        <div className={styles.headerComponent_pseudo} />
        <div className={styles.headerComponent_mobileNavigation_list}>{navigationRender}</div>
      </div>
    </div>
  );

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
          [styles.headerComponent_filled]: isScrolled,
        })}>
        <div className={styles.headerComponent_container_center}>
          <div
            className={classNames("showForMobile", {
              [styles.headerComponent_container_hamburger]: true,
            })}>
            <Hamburger
              rounded={true}
              size={24}
              toggled={isOpenedMobileNavigation}
              toggle={setIsOpenedMobileNavigation}
            />
          </div>
          <div className={styles.headerComponent_container_logotype}>
            <div
              className={styles.headerComponent_container_logotype_icon}
              style={{ backgroundImage: `url(${LogotypeIcon})` }}
            />
            <div
              className={classNames("hiddenForMobile", {
                [styles.headerComponent_container_logotype_textIcon]: true,
              })}
              style={{ backgroundImage: `url(${LogoTextIcon})` }}
            />
          </div>
          <div
            className={classNames("hiddenForMobile", {
              [styles.headerComponent_container_navigation]: true,
            })}>
            {navigationRender}
          </div>
          <div className={styles.headerComponent_container_actions}>
            <div className="display_flex">
              <span className="hiddenForMobile">Связаться с нами</span>
              <div>
                <div
                  className={styles.headerComponent_container_actions_icon}
                  style={{ backgroundImage: `url(${CallIcon})` }}
                />
              </div>
            </div>
            <div>
              <div
                className={styles.headerComponent_container_actions_icon}
                style={{ backgroundImage: `url(${SearchIcon})` }}
              />
            </div>
          </div>
        </div>
      </div>
      {isOpenedMobileNavigation && renderMobileNavigation}
    </header>
  );
};

export const Header = memo(HeaderComponent);
