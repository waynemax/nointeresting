import { PaginationProps } from "./definitions";
import { useCallback, useEffect } from "react";

export const usePaginationLogic = (props: PaginationProps) => {
  const { data, renderItem, onEndReached, scrollThreshold = 80 } = props;

  const handleScroll = useCallback(() => {
    const [bottomPoint, scrollHeight] = [window.scrollY + window.innerHeight, document.body.scrollHeight];
    const needPercent = (scrollHeight / 100) * scrollThreshold;
    if (bottomPoint > needPercent) {
      onEndReached();
    }
  }, [onEndReached, scrollThreshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return {
    data,
    renderItem,
    onEndReached,
    scrollThreshold,
  };
};
