import { type RefObject, useLayoutEffect, useState } from "react";

/**
 * @param ref The `ref` assigned to the element
 * @returns TRUE if the element assigned the `ref` has overflowing content
 */
export const useHasOverflowContent = (ref: RefObject<HTMLElement | null>) => {
  const [hasOverflow, setHasOverflow] = useState(false);

  useLayoutEffect(() => {
    const { current } = ref;
    const trigger = () => {
      const isOverflowing =
        current && current.scrollHeight > current.clientHeight;

      setHasOverflow(!!isOverflowing);
    };

    const refObserver = new ResizeObserver(trigger);
    const windowObserver = new ResizeObserver(trigger);

    if (current) {
      refObserver.observe(current);
      windowObserver.observe(window.document.body);
    }

    return () => {
      refObserver.disconnect();
      windowObserver.disconnect();
    };
  }, [
    ref,
    ref.current?.innerHTML,
    ref.current?.clientHeight,
    ref.current?.scrollHeight,
  ]);

  return hasOverflow;
};
