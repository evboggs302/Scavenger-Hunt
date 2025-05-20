import { useCallback, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import { useCreateSubscription } from "@features/account/hooks/useCreateSubscription";
import { useFetchPaymentMethod } from "@features/account/hooks/useFetchPaymentMethod";
import { CircularLoading } from "@lib/components/Loading/CircularLoading";
import { useResubscribe } from "@features/account/hooks/useResubscribe";
import { useToast } from "@lib/hooks/useToast";

interface DefaultPaymentContentProps {
  onClose: () => void;
}

export const DefaultPaymentContent = ({
  onClose,
}: DefaultPaymentContentProps) => {
  const [toast] = useToast();
  const [confirmDefault, setConfirmDefault] = useState(false);
  const {
    data,
    error,
    loading: defaultPaymentMethodLoading,
  } = useFetchPaymentMethod();
  const [resubscribe, { error: resubscribeErr, loading }] = useResubscribe();

  const toggleUseDefault = useCallback(
    () => setConfirmDefault((val) => !val),
    []
  );

  const onResubscribe = useCallback(async () => {
    try {
      await resubscribe();
    } catch {
      toast({
        variant: "error",
        message: "Unable to create a subscription; Stripe element issue.",
      });

      return;
    }
  }, [resubscribe, toast]);

  return (
    <>
      <DialogContent>
        <DialogContentText>
          Confirm you would like to use the default payment method on file.
        </DialogContentText>
        {defaultPaymentMethodLoading && <CircularLoading />}
        {!defaultPaymentMethodLoading && (
          <>
            <Box sx={{ margin: "10px 0" }}>
              <Typography>
                Brand:{" "}
                {data?.defaultPaymentMethod?.brand.toUpperCase() ||
                  "unavailable"}
              </Typography>
              <Typography>
                Last 4: {data?.defaultPaymentMethod?.last4 || "unavailable"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                margin: "10px auto 50px",
              }}
            >
              <Checkbox
                data-testid="use-default-payment-method"
                checked={confirmDefault}
                onChange={toggleUseDefault}
              />
              <InputLabel>Use default payment method.</InputLabel>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="outlined"
          disabled={loading || !confirmDefault || !!error || !!resubscribeErr}
          endIcon={loading && <CircularProgress size={20} />}
          onClick={onResubscribe}
        >
          Subscribe
        </Button>
      </DialogActions>
    </>
  );
};
