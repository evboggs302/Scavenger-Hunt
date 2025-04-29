import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

// type Props = {};

export const TeamsTableHeader = () => {
  return (
    <TableRow>
      <TableCell sx={{ maxWidth: 220 }}>Members</TableCell>
      <TableCell>Device number</TableCell>
      <TableCell>Recall sent</TableCell>
      <TableCell>ID</TableCell>
      <TableCell />
    </TableRow>
  );
};
