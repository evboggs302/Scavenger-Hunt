import { useCreateSubscription } from "@features/account/hooks/useCreateSubscription";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useStripe } from "@stripe/react-stripe-js";

export const DefaultPaymentContent = () => {
  const stripe = useStripe();
  const [, { loading }] = useCreateSubscription();

  return (
    <DialogContent style={{ backgroundColor: "white" }}>
      <DialogContentText>
        Confirm you would like to use the default payment method on file.
      </DialogContentText>
      <Box sx={{ margin: "10px auto 50px" }}>
        <Checkbox />
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
