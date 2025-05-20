import { useCallback, useState } from "react";
import { useCreateSubscription } from "@features/account/hooks/useCreateSubscription";
import { useUserContext } from "@lib/context/UserContext";
import { useToast } from "@lib/hooks/useToast";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

interface NewPaymentInfoContentProps {
  onClose: () => void;
}

export const NewPaymentInfoContent = ({
  onClose,
}: NewPaymentInfoContentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [toast] = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { data: userData } = useUserContext();

  const [createSubscription, { data, loading }] = useCreateSubscription();

  const somethingLoading = loading || isLoading;
  const toggleIsLoading = useCallback(() => setIsLoading((val) => !val), []);

  const createNewSubscription = useCallback(async () => {
    toggleIsLoading();
    if (!stripe || !elements) {
      toast({
        variant: "error",
        message: "Unable to create a subscription; Stripe element issue.",
      });
      toggleIsLoading();
      return;
    }

    try {
      // VALIDATE STRIPE ELEMENTS
      const { error: submitError } = await elements.submit();
      if (submitError) {
        return new Error("Stripe elements have an error.");
      }

      const { paymentMethod, error: paymentMethodErr } =
        await stripe.createPaymentMethod({
          elements,
          params: {
            type: "card",
            billing_details: {
              name: `${userData?.user.first_name} ${userData?.user.last_name}`,
              email: userData?.user.email,
            },
          },
        });

      if (!paymentMethod || paymentMethodErr) {
        throw new Error();
      }

      // SEND TO SERVER TO SAVE PAYMENT METHOD AND CREATE SUBSCRIPTION
      await createSubscription(paymentMethod.id);

      if (!data?.result) {
        throw new Error("No subscription returned.");
      }

      // CONFIRM THE PAYMENT VIA STRIPE
      const { error: confirmationError } = await stripe.confirmPayment({
        elements,
        clientSecret: data.result.clientSecret || "",
        confirmParams: {
          return_url: "",
        },
      });

      if (confirmationError) {
        throw new Error(confirmationError.message);
      }

      toast({ variant: "success", message: "Success!" });
      onClose();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "There was a problem creating your subscription.";

      toast({
        variant: "error",
        message: `Uh-oh! ${message}`,
      });

      toggleIsLoading();
      return;
    }
  }, [
    createSubscription,
    data?.result,
    elements,
    onClose,
    stripe,
    toast,
    toggleIsLoading,
    userData?.user.email,
    userData?.user.first_name,
    userData?.user.last_name,
  ]);

  return (
    <>
      <DialogContent style={{ backgroundColor: "white" }}>
        <DialogContentText>
          Please provide the below payment information.
        </DialogContentText>
        <Box sx={{ margin: "10px auto 50px" }}>
          <PaymentElement />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="outlined"
          disabled={!stripe || somethingLoading}
          onClick={createNewSubscription}
          endIcon={somethingLoading && <CircularProgress size={20} />}
        >
          Subscribe
        </Button>
      </DialogActions>
    </>
  );
};
