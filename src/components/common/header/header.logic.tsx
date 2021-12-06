import styles from "./header.module.scss";
import { useNavigationList } from "./header.utils";

export const useHeaderLogic = () => {
  const navigationList = useNavigationList();
  const navigationRender = () => {
    return navigationList.map((navigationItem, key) => {
      return (
        <div
          key={`navItem${key}`}
          onClick={navigationItem.action}
          className={styles.headerComponent_container_navigation_item}>
          <span>{navigationItem.lang}</span>
        </div>
      );
    });
  };

  return { navigationRender };
};
