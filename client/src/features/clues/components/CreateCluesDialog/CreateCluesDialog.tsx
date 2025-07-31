import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { ApolloError } from "@apollo/client/errors";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import {
  type CluesFormState,
  useCluesResolver,
} from "@features/clues/hooks/useCreateCluesResolver";
import { useCreateCluesMutation } from "@features/clues/hooks/useCreateCluesMutation";
import { CreateCluesDialogContent } from "./CreateCluesDialogContent";
import { CluesDialogTitle } from "./CluesDialogTitle";
import { CluesDialogSubtitle } from "./CluesDialogSubtitle";

type CreateDialogProps = {
  handleClose: () => void;
};

export const CreateCluesDialog = ({ handleClose }: CreateDialogProps) => {
  const [resolver] = useCluesResolver();
  const [createClues, { loading }] = useCreateCluesMutation();

  const methods = useForm<CluesFormState>({
    mode: "onTouched",
    resolver,
  });

  const {
    reset,
    trigger,
    setError,
    clearErrors,
    handleSubmit,
    formState: {
      isValid,
      errors: { onSubmitError },
    },
  } = methods;

  const onSubmit: SubmitHandler<CluesFormState> = async (formData) => {
    clearErrors("onSubmitError");
    await trigger();

    try {
      await createClues(formData.cluesList);
      handleClose();
    } catch (err) {
      reset();
      if (err instanceof ApolloError) {
        setError("onSubmitError", { type: "error", message: err.message });
      } else {
        setError("onSubmitError", {
          type: "error",
          message: "An unknown error occurred.",
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleSubmit(onSubmit),
          },
        }}
      >
        <CluesDialogTitle />
        <DialogContent>
          {onSubmitError && <TryAgainAlert message={onSubmitError.message} />}
          <CluesDialogSubtitle />
          <CreateCluesDialogContent />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            disabled={!isValid || loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
