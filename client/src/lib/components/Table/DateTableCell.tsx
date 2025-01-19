import TableCell from "@mui/material/TableCell";
import { PropsWithChildren } from "react";

export const DateTableCell = ({ children }: PropsWithChildren) => {
  return <TableCell sx={{ maxWidth: 210 }}>{children}</TableCell>;
};
