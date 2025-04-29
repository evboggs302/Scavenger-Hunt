import { ManageTeamsMenu } from "./ManageTeamsMenu";
import { ManagementButtonsContainer } from "@lib/components/ManagementButtons/ManagementButtonsContainer";
import { TeamsTable } from "./TeamsTable/TeamsTable";

export const TeamsPage = () => {
  return (
    <>
      <ManagementButtonsContainer>
        <ManageTeamsMenu />
      </ManagementButtonsContainer>
      <TeamsTable />
    </>
  );
};
