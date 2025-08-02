import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { CreateTeamsButton } from "@features/teams/components/CreateTeamsButton";
import { DeleteAllTeamsButton } from "@features/teams/components/DeleteAllTeamsButton";
import { TeamsTable } from "@features/teams/components/TeamsTable/TeamsTable";

export const TeamsPage = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CreateTeamsButton />
        <DeleteAllTeamsButton />
      </Box>
      <Divider sx={{ margin: "10px auto" }} />
      <TeamsTable />
    </>
  );
};
