import { ReactNode } from "react";

export type PaginationProps = {
  data: any[];
  hasNext: boolean;
  renderItem: (item: any) => ReactNode;
  onEndReached: () => void;
  isEmpty: boolean;
  isLoading: boolean;
  classNameWrapper?: string;
  scrollThreshold?: number;
  isEmptyPlaceholder?: ReactNode;
};
