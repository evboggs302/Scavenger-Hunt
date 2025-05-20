import { TextTableCell } from "@lib/components/Table/TextTableCell";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { SubscribeForm } from "./SubscribeForm";
import { useFetchAccountTransactions } from "@pages/account/hooks/useFetchAccountTransactions";
import { useCancelSubscription } from "../hooks/useCancelSubscription";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export const SubscriptionInfo = () => {
  const { subscription, subscriptStatus } = useFetchAccountTransactions();
  const [cancelSubscription, { loading }] = useCancelSubscription();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "10px auto",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Subscription</Typography>
        {subscriptStatus === "active" && (
          <Button
            disabled={loading}
            onClick={cancelSubscription}
            startIcon={loading && <CircularProgress size={20} />}
          >
            Cancel subscription
          </Button>
        )}
        {subscriptStatus !== "active" && <SubscribeForm />}
      </Box>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="subscription details table">
          <TableHead>
            <TableRow>
              <TextTableCell style={{ maxWidth: 400 }}>
                Description
              </TextTableCell>
              <TextTableCell width={200}>Status</TextTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TextTableCell style={{ maxWidth: 400 }}>
                {subscription?.description || "---"}
              </TextTableCell>
              <TextTableCell width={200}>
                {subscription?.status === "active" ? (
                  <Chip
                    variant="outlined"
                    color="success"
                    label="Active subscription"
                    icon={<CheckCircleIcon />}
                  />
                ) : (
                  <Chip
                    variant="outlined"
                    color="warning"
                    label="Inactive subscription"
                    icon={<WarningAmberIcon />}
                  />
                )}
              </TextTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
