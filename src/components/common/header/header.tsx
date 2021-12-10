import styles from "./header.module.scss";
import { FC, memo } from "react";
import classNames from "classnames";
import { useHeaderLogic } from "./header.logic";
import { Fade as Hamburger } from "hamburger-react";
import LogotypeIcon from "../../../assets/images/brand/logo.svg";
import SearchIcon from "../../../assets/images/icons/search.svg";
import CallIcon from "../../../assets/images/icons/call.svg";
import LogoTextIcon from "../../../assets/images/brand/logo-text.svg";
import { HeaderProps } from "./header.utils";

const HeaderComponent: FC<HeaderProps> = (props) => {
  const { isDark = false, isLight = false, withoutScrollSideEffects = false } = props;
  const { navigationRender, isScrolled, isOpenedMobileNavigation, setIsOpenedMobileNavigation, scrollBelowTheCover } =
    useHeaderLogic(props);

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
      className={classNames([styles.headerComponent], {
        [styles.headerComponent_dark]: withoutScrollSideEffects && isDark && !isOpenedMobileNavigation,
        [styles.headerComponent_light]: withoutScrollSideEffects && (isLight || isOpenedMobileNavigation),
      })}>
      <div className={styles.headerComponent_pseudo} />
      <div
        className={classNames([styles.headerComponent_container], {
          [styles.headerComponent_filled]: isScrolled,
          [styles.headerComponent_afterCover]: scrollBelowTheCover,
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
            <div className={styles.headerComponent_container_logotype_icon}>
              <LogotypeIcon />
            </div>
            <div
              className={classNames("hiddenForMobile", {
                [styles.headerComponent_container_logotype_textIcon]: true,
              })}>
              <LogoTextIcon />
            </div>
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
                <div className={styles.headerComponent_container_actions_icon}>
                  <CallIcon />
                </div>
              </div>
            </div>
            <div>
              <div className={styles.headerComponent_container_actions_icon}>
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenedMobileNavigation && renderMobileNavigation}
    </header>
  );
};

export const Header = memo(HeaderComponent);
