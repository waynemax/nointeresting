import styles from "./header.module.scss";
import { useNavigationList } from "./header.utils";
import { useEffect, useMemo, useState } from "react";

export const useHeaderLogic = () => {
  const navigationList = useNavigationList();
  const [isOpenedMobileNavigation, setIsOpenedMobileNavigation] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (): void => {
    setIsScrolled(window.pageYOffset > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

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

  return { navigationRender, isScrolled, isOpenedMobileNavigation, setIsOpenedMobileNavigation };
};
