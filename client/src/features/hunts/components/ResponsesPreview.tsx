import React from "react";
import { useHuntContext } from "@lib/context/HuntContext";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Skeleton from "@mui/material/Skeleton";
import { PreviewCard } from "@lib/components/PreviewCard/PreviewCard";
import Box from "@mui/material/Box";

export const ResponsesPreview = () => {
  return (
    <PreviewCard location="responses">
      {/* {teamsExist && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Device Number</TableCell>
                <TableCell>Members</TableCell>
                <TableCell>Recall Sent</TableCell>
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
      )}
      {!teamsExist && ( */}
      <Box sx={{ minWidth: 650 }}>
        <i>No responses to show.</i>
      </Box>
      {/* )} */}
    </PreviewCard>
  );
};
