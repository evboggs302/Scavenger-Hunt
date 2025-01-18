import { TeamCardList } from "./TeamCardList";
import { ManageTeamsMenu } from "./ManageTeamsMenu";

export const TeamsPage = () => {
  return (
    <>
      <div>
        <ManageTeamsMenu />
      </div>
      <TeamCardList />
    </>
  );
};
