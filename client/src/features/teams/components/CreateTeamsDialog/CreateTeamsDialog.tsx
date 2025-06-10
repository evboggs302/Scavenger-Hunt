import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import {
  FormProvider,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import pluralize from "pluralize";
import { ApolloError } from "@apollo/client/errors";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import {
  CreateTeamsFormSchemaType,
  useTeamsResolver,
} from "@features/teams/hooks/useTeamsResolver";
import { SingleTeamDialogContent } from "./SingleTeamDialogContent";
import { MultipleTeamsDialogContent } from "./MultipleTeamsDialogContent";
import { useCreateSingleTeamMutation } from "@features/teams/hooks/useCreateSingleTeamMutation";
import { useCreateMultipleTeamsMutation } from "@features/teams/hooks/useCreateMultipleTeamsMutation";

type CreateDialogProps = {
  handleClose: () => void;
};

export const CreateTeamsDialog = ({ handleClose }: CreateDialogProps) => {
  const [resolver] = useTeamsResolver();
  const [createSingle] = useCreateSingleTeamMutation();
  const [createMultiple] = useCreateMultipleTeamsMutation();

  const methods = useForm<CreateTeamsFormSchemaType>({
    mode: "onTouched",
    resolver,
    defaultValues: {
      isMulti: false,
    },
  });

  const {
    reset,
    control,
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

  const { field: toggleSwitch } = useController({
    name: "isMulti",
    control,
  });

  const onSubmit: SubmitHandler<CreateTeamsFormSchemaType> = async (
    formData
  ) => {
    clearErrors("onSubmitError");
    await trigger();

    try {
      if (formData.isMulti) {
        await createMultiple(formData);
      } else {
        await createSingle(formData);
      }
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

  const toPluralizeTeam = +!toggleSwitch.value;

  return (
    <FormProvider {...methods}>
      <Dialog
        open={true}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleSubmit(onSubmit),
          },
        }}
      >
        <DialogTitle data-testid="create-team-title">{`Create ${pluralize("Team", toPluralizeTeam)}`}</DialogTitle>
        <DialogContent>
          {onSubmitError && <TryAgainAlert message={onSubmitError.message} />}
          <DialogContentText>
            {`To create ${!toggleSwitch.value ? `a` : ""} new ${pluralize("team", toPluralizeTeam)}, please provide the below information.`}
            <br />
            <i>Required fields are marked.</i>
          </DialogContentText>
          <Box
            sx={{
              margin: "14px auto",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Switch
              data-testid="create-clues-switch"
              slotProps={{
                input: {
                  ref: toggleSwitch.ref,
                },
              }}
              name={toggleSwitch.name}
              value={toggleSwitch.value}
              onBlur={toggleSwitch.onBlur}
              onChange={toggleSwitch.onChange}
            />
            <InputLabel>Creating multiple teams</InputLabel>
          </Box>
          {toggleSwitch.value === false && <SingleTeamDialogContent />}
          {toggleSwitch.value === true && <MultipleTeamsDialogContent />}
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
