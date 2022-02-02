import {memo} from "react";
import styles from "./list-item.module.scss";

const ListItemComponent = (props: any) => {
  return (
    <div className={styles.listItem_wrapper}>
      {[...Object.keys(props)].map((item: string, key) => {
        return (
          <div key={`ListItemKey${key}`}>
            {item}: {props[item]}
          </div>
        );
      })}
    </div>
  );
}

export const ListItem = memo(ListItemComponent);
