import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { ApolloError } from "@apollo/client/errors";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import {
  type CreateTeamsFormSchemaType,
  useCreateTeamsResolver,
} from "@features/teams/hooks/useCreateTeamsResolver";
import { useCreateTeamsMutation } from "@features/teams/hooks/useCreateTeamsMutation";
import { TeamsDialogSubtitle } from "./TeamsDialogSubtitle";
import { CreateTeamsDialogContent } from "./CreateTeamsDialogContent";
import { TeamsDialogTitle } from "./TeamsDialogTitle";

type CreateDialogProps = {
  handleClose: () => void;
};

export const CreateTeamsDialog = ({ handleClose }: CreateDialogProps) => {
  const [resolver] = useCreateTeamsResolver();
  const [createTeams] = useCreateTeamsMutation();

  const methods = useForm<CreateTeamsFormSchemaType>({
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
      isSubmitting,
      errors: { onSubmitError },
    },
  } = methods;

  const onSubmit: SubmitHandler<CreateTeamsFormSchemaType> = async (
    formData
  ) => {
    clearErrors("onSubmitError");
    await trigger();

    try {
      await createTeams(formData);
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
        <TeamsDialogTitle />
        <DialogContent>
          {onSubmitError && <TryAgainAlert message={onSubmitError.message} />}
          <TeamsDialogSubtitle />
          <CreateTeamsDialogContent />
        </DialogContent>
        <DialogActions>
          <Button disabled={isSubmitting} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            endIcon={isSubmitting && <CircularProgress size={20} />}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
