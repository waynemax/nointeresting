import { UseInfiniteLogicProps } from "./definitions";
import useSWRInfinite from "swr/infinite";

const defaultFetcher = (url) => fetch(url).then((res) => res.json());

export const useInfiniteLogic = (props: UseInfiniteLogicProps) => {
  let issues = [];
  const { URLHandler, customFetcher, pageSize } = props;
  const { data, error, mutate, size, setSize, isValidating }: any = useSWRInfinite(
    URLHandler,
    customFetcher ?? defaultFetcher,
    { revalidateFirstPage: false },
  );

  data && data.forEach((item) => ("data" in item ? (issues = [...issues, ...item.data]) : null));

  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.data.length < pageSize);
  const isRefreshing = isValidating && data && data.length === size;
  const hasNext = data ? size < data[0]?.total_pages : false;

  return {
    size,
    issues,
    mutate,
    setSize,
    isEmpty,
    hasNext,
    isRefreshing,
    isReachingEnd,
    isLoadingMore,
  };
};
