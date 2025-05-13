import { Table } from "@lib/components/Table/Table";
import { useHuntContext } from "@lib/context/HuntContext";
import { TeamsTableHeader } from "./TeamsTableHeader";
import { TeamsTableRow } from "./TeamsTableRow";
import Box from "@mui/material/Box";

export const TeamsTable = () => {
  const { data } = useHuntContext();
  const teams = data?.hunt?.teams;

  const filteredTeams = teams?.filter((tm) => !!tm);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <Table
        data={filteredTeams}
        fixedHeader={TeamsTableHeader}
        emptyPlaceholderText="No teams created yet."
        itemContent={(_index, team) => (
          <TeamsTableRow key={team._id} team={team} />
        )}
      />
    </Box>
  );
};
