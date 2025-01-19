import { TeamCardList } from "./TeamCardList";
import { ManageTeamsMenu } from "./ManageTeamsMenu";
import { ManagementButtonsContainer } from "@lib/components/ManagementButtons/ManagementButtonsContainer";

export const TeamsPage = () => {
  return (
    <>
      <ManagementButtonsContainer>
        <ManageTeamsMenu />
      </ManagementButtonsContainer>
      <TeamCardList />
    </>
  );
};
