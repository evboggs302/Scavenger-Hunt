import TableRow from "@mui/material/TableRow";
import { TextTableCell } from "@lib/components/Table/TextTableCell";

export const TeamsTableHeader = () => {
  return (
    <TableRow style={{ background: "black" }}>
      <TextTableCell sx={{ maxWidth: 220 }}>Members</TextTableCell>
      <TextTableCell>Device number</TextTableCell>
      <TextTableCell>Recall sent</TextTableCell>
      <TextTableCell>Team ID</TextTableCell>
      <TextTableCell />
    </TableRow>
  );
};
