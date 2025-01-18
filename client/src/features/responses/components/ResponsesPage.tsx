import { useHuntFragment } from "../../../lib/hooks/useHuntFragment";
import { ActiveHuntResponsesList } from "./Lists/ActiveHuntResponsesList";
import { InactiveHuntResponsesList } from "./Lists/InactiveHuntResponsesList";

export const ResponsesPage = () => {
  const { hunt } = useHuntFragment();

  return (
    <>
      {hunt.is_active && <ActiveHuntResponsesList />}
      {!hunt.is_active && <InactiveHuntResponsesList />}
    </>
  );
};
