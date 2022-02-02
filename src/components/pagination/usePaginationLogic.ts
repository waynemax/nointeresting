import { PaginationProps } from "./definitions";
import { useCallback, useEffect, useState } from "react";

export const usePaginationLogic = (props: PaginationProps) => {
  const [isLocked, setIsLocked] = useState(false);
  const { data, renderItem, isEmpty, isLoading, onEndReached, hasNext = false, scrollThreshold = 80 } = props;

  const setLocked = useCallback(() => {
    setIsLocked(true);
    setTimeout(() => {
      setIsLocked(false);
    }, 3000);
  }, []);

  const handleScroll = useCallback(() => {
    const [bottomPoint, scrollHeight] = [window.scrollY + window.innerHeight, document.body.scrollHeight];
    const needPercent = (scrollHeight / 100) * scrollThreshold;

    if (bottomPoint > needPercent) {
      onEndReached({ hasNext, isLoading });
    }
  }, [hasNext, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return {
    data,
    hasNext,
    isEmpty,
    renderItem,
    onEndReached,
    scrollThreshold,
  };
};
