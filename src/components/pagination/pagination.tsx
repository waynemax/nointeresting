import { PaginationProps } from "./definitions";
import { usePaginationLogic } from "./usePaginationLogic";

const PaginationComponent = (props: PaginationProps) => {
  const { data, renderItem, isEmpty } = usePaginationLogic(props);
  const { isEmptyPlaceholder = <div>Здесь пусто...</div> } = props;
  return (
    <div className={props.classNameWrapper}>
      {(data ?? []).map((item, key) => (
        <div key={`renderItem${key}`}>{renderItem(item)}</div>
      ))}
      {isEmpty && isEmptyPlaceholder}
    </div>
  );
};

export const Pagination = PaginationComponent;
