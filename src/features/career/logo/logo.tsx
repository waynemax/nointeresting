import styles from "../career.module.scss";
import { memo } from "react";
import LogoIcon from "src/assets/images/icons/career-logo.svg";

const LogoComponent = () => {
  return (
    <div className={styles.career_wrapper}>
      <div className={styles.career_center}>
        <div className={styles.career_logo}>
          <LogoIcon />
        </div>
      </div>
    </div>
  );
};

export const Logo = memo(LogoComponent);
