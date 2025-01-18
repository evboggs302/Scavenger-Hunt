import { useClueContext } from "@lib/context/ClueContext";
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

export const CluesPreview = () => {
  const { data, loading, error } = useClueContext();

  if (loading) {
    return <Skeleton variant="rectangular" width={210} height={60} />;
  }

  if (error || !data?.clues) {
    return <TryAgainAlert />;
  }

  const cluesExist = data.clues.length > 0;

  return (
    <PreviewCard location="clues">
      {cluesExist && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 80 }}>Order</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.clues.slice(0, 8).map((clue) => (
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
      )}
      {!cluesExist && (
        <Box sx={{ minWidth: 650 }}>
          <i>No clues to show.</i>
        </Box>
      )}
    </PreviewCard>
  );
};
