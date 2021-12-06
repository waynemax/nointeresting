import styles from "./cover.module.scss";
import React from "react";

const CoverComponent = (props) => (
  <div className={styles.CoverComponent}>
    <div className={styles.CoverBackground}>{props.children}</div>
  </div>
);

export const Cover = React.memo(CoverComponent);
