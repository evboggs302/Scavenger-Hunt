import { useHuntContext } from "@lib/context/HuntContext";
import { NoCardsToShowText } from "@lib/components/Cards/NoCardsToShowText";
import Box from "@mui/material/Box";
import { TableVirtuoso } from "react-virtuoso";
import { TeamsTableHeader } from "./TeamsTableHeader";
import TableBody from "@mui/material/TableBody";
import { TeamsTableRow } from "./TeamsTableRow";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export const TeamsTable = () => {
  const { data } = useHuntContext();
  const teams = data?.hunt?.teams;

  const filteredTeams = teams?.filter((tm) => tm !== null);

  if (filteredTeams && filteredTeams.length === 0) {
    return <NoCardsToShowText type="teams" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <TableVirtuoso
        style={{ height: "100%", width: "100%", overflow: "auto" }}
        data={filteredTeams}
        components={{
          TableHead,
          TableBody,
          TableRow,
        }}
        fixedHeaderContent={TeamsTableHeader}
        itemContent={(_index, team) => <TeamsTableRow team={team} />}
      />
    </Box>
  );
};
