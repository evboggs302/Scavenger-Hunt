import { ManagementButtonsContainer } from "@lib/components/ManagementButtons/ManagementButtonsContainer";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import { ActiveHuntResponsesList } from "@features/responses/components/Lists/ActiveHuntResponsesList";
import { InactiveHuntResponsesList } from "@features/responses/components/Lists/InactiveHuntResponsesList";
import { DeleteResponsesButton } from "@features/responses/components/DeleteResponses/DeleteResponsesButton";

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
