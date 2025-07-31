import TableCell from "@mui/material/TableCell";
import type { PropsWithChildren } from "react";

export const DateTableCell = ({ children }: PropsWithChildren) => {
  return (
    <TableCell data-testid="date-table-cell" sx={{ maxWidth: 210 }}>
      {children}
    </TableCell>
  );
};
