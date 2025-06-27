import { useBlocker, useBeforeUnload } from "react-router";

/**
 * @description When this hook is used, all `navigate` functions will need the "forceClose" value passed to the navigate state. Otherwise, thos blocker will fire and prevent the route from being executed.
 * @example
 * <-- REST OF COMPONENT LOGIC -->
 * const blocker = useRouteBlocker();
 * const handleClose = useCallback(() => blocker.reset?.(), [blocker]);
 * const handleConfirm = useCallback(() => blocker.proceed?.(), [blocker]);
 *
 * return (
 *      <DummyWarningDialog
 *          isOpen={blocker.state === 'blocked'}
 *          cancelReroute={handleClose}
 *          confirmReroute={handleConfirm}
 *      />
 * );
 *
 * <-- ALL CHILD COMPONENTS USING `navigate` FUNCTION WILL LOOK LIKE THIS TO AVOID THIS BLOCKER -->
 * navigate('path', {
 *      state: {
 *          forceClose: true,
 *      },
 * })
 */
export const useRouteBlocker = (message?: string) => {
  useBeforeUnload((event) => {
    event.preventDefault();
    event.returnValue = ""; // This is necessary for some browsers to show the confirmation dialog
    return message ?? "Are you sure you want to leave this page?";
  });

  return useBlocker(({ nextLocation }) => {
    return !nextLocation.state.forceClose;
  });
};
