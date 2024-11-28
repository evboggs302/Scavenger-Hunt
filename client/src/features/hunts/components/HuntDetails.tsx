import React from "react";
import { useHuntContext } from "@lib/context/HuntContext";
import { CluesPreview } from "./CluesPreview";
import { TeamsPreview } from "./TeamsPreview";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import DoneIcon from "@mui/icons-material/Done";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";

export const HuntDetails = () => {
  const { data, loading, error } = useHuntContext();

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !data?.hunt) {
    return <TryAgainAlert message="There was a problem retriving your hunt." />;
  }

  const {
    _id,
    name,
    created_date,
    start_date,
    end_date,
    is_active,
    recall_message,
  } = data.hunt;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Created date</TableCell>
                <TableCell>Start date</TableCell>
                <TableCell>End date</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>Is active</TableCell>
                <TableCell>Recall message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{name}</TableCell>
                <TableCell component="th" scope="row">
                  {dayjs(created_date).format("LL")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {dayjs(start_date).format("LL")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {dayjs(end_date).format("LL")}
                </TableCell>
                <TableCell component="th" scope="row">
                  {dayjs(end_date).isAfter(start_date) ? (
                    <DoneIcon color="success" />
                  ) : (
                    "---"
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {is_active ? (
                    <FiberManualRecordIcon sx={{ color: "orange" }} />
                  ) : (
                    "---"
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {recall_message}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <CluesPreview />
      <TeamsPreview />
    </Box>
  );
};
