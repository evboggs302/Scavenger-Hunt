import { ClueCardList } from "./ClueCardList";
import { ManageCluesMenu } from "./ManageCluesMenu";
import { ManagementButtonsContainer } from "@lib/components/ManagementButtons/ManagementButtonsContainer";

export const CluesPage = () => {
  return (
    <>
      <ManagementButtonsContainer>
        <ManageCluesMenu />
      </ManagementButtonsContainer>
      <ClueCardList />
    </>
  );
};
