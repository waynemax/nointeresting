import { ReactNode } from "react";
import { SWRInfiniteKeyLoader } from "swr/infinite";

export type PaginationProps = {
  data: any[];
  renderItem: (item: any) => ReactNode;
  onEndReached: () => void;
  isEmpty: boolean;
  classNameWrapper?: string;
  scrollThreshold?: number;
  isEmptyPlaceholder?: ReactNode;
};

export type UseInfiniteLogicProps = {
  customFetcher: any;
  URLHandler: SWRInfiniteKeyLoader;
  pageSize: number;
};
