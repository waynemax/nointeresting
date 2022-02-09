import { useCallback, useEffect } from "react";

interface PageParams {
  page: number
}

interface PaginationProps<P = PageParams> {
  onThreshold?: null | (() => void);
  scrollHandler?: (element: HTMLElement | Window) => P | null
  element?: HTMLDivElement | null
  scrollOffset?: number
}

export const useScrollThreshold = <P>(props: PaginationProps<P>) => {
  const { onThreshold, element, scrollHandler, scrollOffset = 200 } = props;

  const defaultScrollHandler = useCallback((el: HTMLElement | Window): boolean => {
    if (el === window) return window.scrollY + window.innerHeight + scrollOffset > document.body.scrollHeight;
    return (el as HTMLElement).scrollTop + (el as HTMLElement).offsetHeight + scrollOffset > (el as HTMLElement).scrollHeight;
  }, [scrollOffset]);

  const handleScroll = useCallback(() => {
    if (!onThreshold) return;
    if ((scrollHandler || defaultScrollHandler)(element || window)) onThreshold();
  }, [ scrollHandler, defaultScrollHandler, onThreshold, element ]);

  useEffect(() => {
    if (element !== null) {
      (element || window).addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
    }

    return () => {
      if (element !== null) {
        (element || window).removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      }
    };
  }, [handleScroll, element]);

  useEffect(() => {
    if (!onThreshold) return;
    if ((scrollHandler || defaultScrollHandler)(element || window)) onThreshold();
  }, [ element, onThreshold, scrollHandler, defaultScrollHandler ]);
};
