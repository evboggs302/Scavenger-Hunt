import { ManagementButtonsContainer } from "@lib/components/ManagementButtons/ManagementButtonsContainer";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { ActiveHuntResponsesList } from "./Lists/ActiveHuntResponsesList";
import { InactiveHuntResponsesList } from "./Lists/InactiveHuntResponsesList";
import { DeleteResponsesButton } from "./DeleteResponses/DeleteResponsesButton";

export const ResponsesPage = () => {
  const { hunt } = useHuntFragment();

  return (
    <>
      {hunt.is_active && <ActiveHuntResponsesList />}
      {!hunt.is_active && (
        <>
          <ManagementButtonsContainer>
            <DeleteResponsesButton />
          </ManagementButtonsContainer>
          <InactiveHuntResponsesList />
        </>
      )}
    </>
  );
};
