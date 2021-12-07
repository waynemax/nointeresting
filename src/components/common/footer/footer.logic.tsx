import styles from "./footer.module.scss";
import { useNavigationList } from "./footer.utils";

export const useFooterLogic = () => {
  const navigationList = useNavigationList();
  const navigationRender = () => {
    return navigationList.map((navigationItem, key) => {
      return (
        <div
          className={styles.footerComponent_actionsPart_center_navigation_item}
          key={`navFooterItem${key}`}
          onClick={navigationItem.action}>
          <span>{navigationItem.lang}</span>
        </div>
      );
    });
  };

  return { navigationRender };
};
