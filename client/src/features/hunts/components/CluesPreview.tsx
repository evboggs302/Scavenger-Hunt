import React from "react";
import { useNavigate } from "react-router-dom";
import { useClueContext } from "@lib/context/ClueContext";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

export const CluesPreview = () => {
  const { data, loading, error } = useClueContext();
  const navigate = useNavigate();

  if (loading) {
    return <Skeleton variant="rectangular" width={210} height={60} />;
  }

  if (error || !data?.clues) {
    return <TryAgainAlert />;
  }

  if (data.clues.length === 0) {
    return (
      <Box>
        Go to the Clues page to create clues!
        <Button onClick={() => navigate("clues", { relative: "path" })}>
          GO TO CLUES
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.clues.map((clue) => (
              <TableRow
                key={clue?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{clue?.order_number}</TableCell>
                <TableCell component="th" scope="row">
                  {clue?.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
