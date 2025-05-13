import { useCreateSubscription } from "@features/account/hooks/useCreateSubscription";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { CardElement, useStripe } from "@stripe/react-stripe-js";

export const NewPaymentInfoContent = () => {
  const stripe = useStripe();
  const [, { loading }] = useCreateSubscription();

  return (
    <DialogContent style={{ backgroundColor: "white" }}>
      <DialogContentText>
        Please provide the below payment information.
      </DialogContentText>
      <Box sx={{ margin: "10px auto 50px" }}>
        <CardElement />
      </Box>
      <Button
        type="submit"
        disabled={!stripe || loading}
        endIcon={loading && <CircularProgress size={20} />}
      >
        Subscribe
      </Button>
    </DialogContent>
  );
};
