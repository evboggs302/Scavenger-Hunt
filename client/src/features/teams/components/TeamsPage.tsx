import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { CreateTeamsButton } from "./CreateTeamsButton";
import { DeleteAllTeamsButton } from "./DeleteAllTeamsButton";
import { TeamsTable } from "./TeamsTable/TeamsTable";

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
