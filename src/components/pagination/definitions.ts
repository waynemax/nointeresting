import { ReactNode } from "react";
import { SWRInfiniteKeyLoader } from "swr/infinite";

export type PaginationProps = {
  data: any[];
  renderItem: (item: any) => ReactNode;
  isEmpty: boolean;
  classNameWrapper?: string;
  isEmptyPlaceholder?: ReactNode;
};

export type UseInfiniteLogicProps = {
  customFetcher: any;
  URLHandler: SWRInfiniteKeyLoader;
  pageSize: number;
};
