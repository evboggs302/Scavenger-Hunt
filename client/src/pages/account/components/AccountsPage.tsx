import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useFetchAccountTransactions } from "../hooks/useFetchAccountTransactions";
import { CircularLoading } from "@lib/components/Loading/CircularLoading";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { ChargesTable } from "@features/account/components/ChargesTable/ChargesTable";
import { SubscriptionInfo } from "@features/account/components/SubscriptionInfo";
import { useFetchSubscriptionProduct } from "../hooks/useFetchSubscriptionProduct";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY as string);

export const AccountsPage = () => {
  const { subscriptStatus, loading: accountLoading } =
    useFetchAccountTransactions();

  const { data, loading: productLoading } = useFetchSubscriptionProduct();

  if (accountLoading || productLoading) {
    return <CircularLoading />;
  }

  const amount = data?.subscription.amount;

  return (
    <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
      <Typography variant="h3">Accounts Page</Typography>
      {subscriptStatus !== "active" && (
        <Alert severity="info">
          Your account does not have an active subscription.
        </Alert>
      )}
      <Elements
        stripe={stripePromise}
        options={{
          mode: "subscription",
          currency: "usd",
          amount,
          setupFutureUsage: "off_session",
          paymentMethodTypes: ["card"],
          paymentMethodCreation: "manual",
        }}
      >
        <SubscriptionInfo />
        <Divider sx={{ margin: "18px auto" }} />
        <ChargesTable />
      </Elements>
    </Box>
  );
};
