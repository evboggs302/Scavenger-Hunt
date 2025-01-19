import { Navigate } from "react-router";
import dayjs from "dayjs";
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
import { ResponsesPreview } from "./ResponsesPreview";
import { UpdateHuntButton } from "../UpdateHuntDialog/UpdateHuntButton";
import { CircularLoading } from "@lib/components/Loading/CircularLoading";
import { DateTableCell } from "@lib/components/Table/DateTableCell";

export const HuntDetails = () => {
  const { data, loading, error } = useHuntContext();

  if (loading) {
    return <CircularLoading />;
  }

  if (error) {
    return <TryAgainAlert message="There was a problem retriving your hunt." />;
  }

  if (!data?.hunt) {
    return <Navigate to="dashboard" replace />;
  }

  const {
    _id,
    name,
    created_date,
    start_date,
    end_date,
    is_active,
    recall_message,
    marked_complete,
  } = data.hunt;

  const isInPast = dayjs().isAfter(dayjs(end_date).add(1, "day"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {!marked_complete && !is_active && <UpdateHuntButton />}
        <TableContainer
          component={Paper}
          sx={{ minWidth: 650, maxWidth: 1200 }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ maxWidth: 220 }}>Name</TableCell>
                <DateTableCell>Created date</DateTableCell>
                {isInPast || marked_complete ? (
                  <DateTableCell>Ended on</DateTableCell>
                ) : (
                  <>
                    <DateTableCell>Start date</DateTableCell>
                    <DateTableCell>End date</DateTableCell>
                  </>
                )}
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
                {isInPast || marked_complete ? (
                  <TableCell component="th" scope="row">
                    {dayjs(end_date).format("LL")}
                  </TableCell>
                ) : (
                  <>
                    <TableCell component="th" scope="row">
                      {dayjs(start_date).format("LL")}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {dayjs(end_date).format("LL")}
                    </TableCell>
                  </>
                )}
                <TableCell component="th" scope="row">
                  {marked_complete ? <DoneIcon color="success" /> : "---"}
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
      <ResponsesPreview />
    </Box>
  );
};
