import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useFetchAccountTransactions } from "../hooks/useFetchAccountTransactions";
import { CircularLoading } from "@lib/components/Loading/CircularLoading";
import Alert from "@mui/material/Alert";
import { SubscribeForm } from "@features/account/components/SubscribeForm";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ChargesTable } from "@features/account/components/ChargesTable/ChargesTable";
import { SubscriptionInfo } from "@features/account/components/SubscriptionInfo";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY as string);

export const AccountsPage = () => {
  const { subscription, charges, subscriptStatus, loading } =
    useFetchAccountTransactions();

  if (loading) {
    return <CircularLoading />;
  }

  console.log(charges);
  const data = charges?.filter((charge) => !!charge);

  return (
    <Elements stripe={stripePromise}>
      <SubscribeForm />
      <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
        <h2>Accounts Page</h2>
        {subscriptStatus === "inactive" && (
          <Alert severity="info">
            Your account does not have an active subscription.
          </Alert>
        )}
        <SubscriptionInfo subscription={subscription} />
        <Divider />
        <ChargesTable charges={data} />
      </Box>
    </Elements>
  );
};
