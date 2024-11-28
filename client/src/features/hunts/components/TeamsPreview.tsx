import React from "react";
import { useHuntContext } from "@lib/context/HuntContext";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Skeleton from "@mui/material/Skeleton";

export const TeamsPreview = () => {
  const { data, loading, error } = useHuntContext();

  if (loading) {
    return <Skeleton variant="rectangular" width={210} height={60} />;
  }

  if (error || !data?.hunt?.teams) {
    return <TryAgainAlert />;
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Device Number</TableCell>
              <TableCell align="right">Members</TableCell>
              <TableCell align="right">Recall Sent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.hunt.teams.map((team) => (
              <TableRow
                key={team?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{team?.device_number}</TableCell>
                <TableCell component="th" scope="row">
                  {team?.members?.join(", ")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {team?.recall_sent}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
