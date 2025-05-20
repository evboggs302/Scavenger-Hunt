import { useCallback, useState } from "react";
import { useFetchAccountTransactions } from "@pages/account/hooks/useFetchAccountTransactions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useFetchPaymentMethod } from "../hooks/useFetchPaymentMethod";
import { NewPaymentInfoContent } from "./DialogContent/NewPaymentInfoContent";
import { DefaultPaymentContent } from "./DialogContent/DefaultPaymentContent";

export const SubscribeForm: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const toggleDialogOpen = useCallback(() => setDialogOpen((val) => !val), []);

  const { data: defaultPaymentResult } = useFetchPaymentMethod();
  const { subscriptStatus } = useFetchAccountTransactions();

  if (subscriptStatus === "active") {
    return null;
  }

  const hasDefaultPaymentMethod =
    !!defaultPaymentResult?.defaultPaymentMethod?.id;

  return (
    <>
      <Button variant="contained" color="success" onClick={toggleDialogOpen}>
        Create NEW subscription
      </Button>
      {isDialogOpen && (
        <Dialog open onClose={toggleDialogOpen}>
          <DialogTitle data-testid="create-subscription">
            Create New Subscription
          </DialogTitle>
          {hasDefaultPaymentMethod && (
            <DefaultPaymentContent onClose={toggleDialogOpen} />
          )}
          {!hasDefaultPaymentMethod && (
            <NewPaymentInfoContent onClose={toggleDialogOpen} />
          )}
        </Dialog>
      )}
    </>
  );
};
