import { useCallback, useRef, useState } from "react";
import { useHasOverflowContent } from "./useHasOverflowContent";

type ScrollState = {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
};

export const topShadow = "inset 0 8px 5px -5px rgb(200 200 200 / 1)";
export const bottomShadow = "inset 0 -8px 5px -5px rgb(200 200 200 / 1)";

export const useScrollShadow = <T extends HTMLElement = HTMLElement>() => {
  const ref = useRef<T>(null);
  const hasOverflow = useHasOverflowContent(ref);
  const [state, setState] = useState<ScrollState>({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });

  const handler = useCallback((e: Event) => {
    const target = e.currentTarget as T;

    setState({
      scrollTop: Math.ceil(target.scrollTop),
      scrollHeight: target.scrollHeight,
      clientHeight: Math.ceil(target.clientHeight),
    });
  }, []);

  const getBoxShadow = () => {
    const { scrollHeight, scrollTop, clientHeight } = state;

    const isTop = scrollTop === 0;
    const isBetween = scrollTop > 0 && clientHeight < scrollHeight - scrollTop;
    const isBottom = clientHeight === scrollHeight - scrollTop;

    if (hasOverflow) {
      if (isTop) {
        return bottomShadow;
      } else if (isBetween) {
        return `${topShadow}, ${bottomShadow}`;
      } else if (isBottom) {
        return topShadow;
      }
    }

    return "none";
  };

  if (ref.current) {
    ref.current.onscroll = handler;
    ref.current.style.boxShadow = getBoxShadow();
    ref.current.style.backgroundColor = "turquoise";
  }

  return { hasOverflow, ref };
};
