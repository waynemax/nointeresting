import React from "react";
import { PaginationProps } from "./definitions";

const ListComponent = (props: PaginationProps) => {
  const { renderItem, data, isEmpty, isEmptyPlaceholder = <div>Здесь пусто...</div> } = props;

  return (
    <div className={props.classNameWrapper}>
      {(data ?? []).map((item, key) => (
        <div key={`renderItem${key}`}>{renderItem(item)}</div>
      ))}
      {isEmpty && isEmptyPlaceholder}
    </div>
  );
};

export const List = ListComponent;
