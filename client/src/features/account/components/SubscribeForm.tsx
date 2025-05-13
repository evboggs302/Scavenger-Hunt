import { FormEventHandler, useCallback, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useFetchAccountTransactions } from "@pages/account/hooks/useFetchAccountTransactions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useUserContext } from "@lib/context/UserContext";
import { useToast } from "@lib/hooks/useToast";
import { useFetchPaymentMethod } from "../hooks/useFetchPaymentMethod";
import { DefaultPaymentContent } from "./DialogContent/DefaultPaymentContent";
import { NewPaymentInfoContent } from "./DialogContent/NewPaymentInfoContent";
import { useCreateSubscription } from "../hooks/useCreateSubscription";

export const SubscribeForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [toast] = useToast();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const toggleDialogOpen = useCallback(() => setDialogOpen((val) => !val), []);

  const { data: userData } = useUserContext();
  const { data: defaultPaymentResult, error: defaultPaymentErr } =
    useFetchPaymentMethod();
  const { subscription, subscriptStatus } = useFetchAccountTransactions();
  const [creatSubscription, { data }] = useCreateSubscription();

  if (subscription && subscriptStatus === "active") {
    return null;
  }

  const hasDefaultPaymentMethod =
    !!defaultPaymentResult?.defaultPaymentMethod?.id;

  const createSub = async (id: string) => {
    if (!stripe || !elements) {
      toast({
        variant: "error",
        message: "Unable to create a subscription; Stripe element issue.",
      });
      return;
    }

    await creatSubscription(id);

    if (!data?.subscription) {
      throw new Error("No subscription returned.");
    }

    const result = await stripe.confirmPayment({
      elements,
      clientSecret: data.subscription.clientSecret || "",
      confirmParams: {
        return_url: "",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      // Payment succeeded
      toggleDialogOpen();
    }
  };

  const handleUseDefaultMethod: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      if (
        !defaultPaymentResult ||
        !defaultPaymentResult.defaultPaymentMethod ||
        defaultPaymentErr
      ) {
        throw new Error();
      }

      await createSub(defaultPaymentResult.defaultPaymentMethod.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (!stripe || !elements) {
      toast({
        variant: "error",
        message: "Unable to create a subscription; Stripe element issue.",
      });
      return;
    }

    try {
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

      await createSub(paymentMethod.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button onClick={toggleDialogOpen}>Create NEW subscription</Button>
      {isDialogOpen && (
        <Dialog
          open
          onClose={toggleDialogOpen}
          slotProps={{
            paper: {
              component: "form",
              onSubmit: hasDefaultPaymentMethod
                ? handleUseDefaultMethod
                : handleCreateSubmit,
            },
          }}
        >
          <DialogTitle data-testid="create-subscription">
            Create New Subscription
          </DialogTitle>
          {hasDefaultPaymentMethod && <DefaultPaymentContent />}
          {!hasDefaultPaymentMethod && <NewPaymentInfoContent />}
        </Dialog>
      )}
    </>
  );
};
