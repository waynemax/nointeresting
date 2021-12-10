import styles from "./header.module.scss";
import { HeaderProps, useNavigationList } from "./header.utils";
import { useEffect, useMemo, useState } from "react";

export const useHeaderLogic = (props: HeaderProps) => {
  const { withoutScrollSideEffects = false } = props;
  const navigationList = useNavigationList();
  const [isOpenedMobileNavigation, setIsOpenedMobileNavigation] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollBelowTheCover, setScrollBelowTheCover] = useState(false);

  const handleScroll = (): void => {
    const { pageYOffset } = window;
    setIsScrolled(pageYOffset > 0);
    if (!withoutScrollSideEffects) {
      setScrollBelowTheCover(pageYOffset > 420 - 64 / 2); // height of cover component - header height / 2
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigationRender = useMemo(() => {
    return navigationList.map((navigationItem, key) => {
      return (
        <div
          key={`navItem${key}`}
          onClick={navigationItem.action}
          data-id="item"
          className={styles.headerComponent_container_navigation_item}>
          <span>{navigationItem.lang}</span>
        </div>
      );
    });
  }, [navigationList]);

  return { navigationRender, isScrolled, isOpenedMobileNavigation, setIsOpenedMobileNavigation, scrollBelowTheCover };
};
