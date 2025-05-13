import TableRow from "@mui/material/TableRow";
import { TextTableCell } from "@lib/components/Table/TextTableCell";

export const ChargesTableHeader = () => {
  return (
    <TableRow style={{ background: "black" }}>
      <TextTableCell>Status</TextTableCell>
      <TextTableCell sx={{ maxWidth: 220 }}>Description</TextTableCell>
      <TextTableCell>Amount</TextTableCell>
      <TextTableCell>Payment Brand</TextTableCell>
      <TextTableCell>Payment Last4</TextTableCell>
      <TextTableCell>Buttons?</TextTableCell>
    </TableRow>
  );
};
