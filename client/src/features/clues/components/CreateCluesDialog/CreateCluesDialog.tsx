import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  FormProvider,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import { ApolloError } from "@apollo/client/errors";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import {
  CreateCluesFormSchemaType,
  useCreateCluesResolver,
} from "../../hooks/useCreateCluesResolver";
import Switch from "@mui/material/Switch";

type CreateDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export type CreateCluesFormState = CreateCluesFormSchemaType & {
  onSubmitError?: string;
};

export const CreateCluesDialog = ({
  isOpen,
  handleClose,
}: CreateDialogProps) => {
  const [resolver] = useCreateCluesResolver();
  //   const [createHunt, { loading }] = useCreateHuntMutation();

  const methods = useForm<CreateCluesFormState>({
    mode: "onTouched",
    resolver,
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
      errors: { onSubmitError },
    },
  } = methods;

  const { field: order_number, fieldState: startDateState } = useController({
    name: "clue_item.order_number",
    control,
  });
  const { field: description, fieldState: endDateState } = useController({
    name: "clue_item.description",
    control,
  });
  const { field: toggleSwitch } = useController({
    name: "isMulti",
    control,
    defaultValue: false,
  });

  const onSubmit: SubmitHandler<CreateCluesFormState> = async (formData) => {
    // console.log(formData);
    clearErrors("onSubmitError");
    await trigger();

    try {
      if (formData.isMulti) {
        // await createMulti(formData);
      } else {
        // await createSingle(formData);
      }
      // throw new Error("try try try");
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
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        }}
      >
        <DialogTitle data-testid="create-hunt-title">
          Create New Clue(s)
        </DialogTitle>
        <DialogContent>
          {onSubmitError && <TryAgainAlert message={onSubmitError.message} />}
          <DialogContentText>
            To create a new hunt, please provide the below information.
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
              data-testid="create-hunt-multiple-days"
              inputRef={toggleSwitch.ref}
              name={toggleSwitch.name}
              value={toggleSwitch.value}
              onBlur={toggleSwitch.onBlur}
              onChange={toggleSwitch.onChange}
            />
            <InputLabel>Creating multiple clues</InputLabel>
          </Box>
          {toggleSwitch.value === false && <div>single</div>}
          {toggleSwitch.value === true && <div>multiple</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            // disabled={!isValid || loading}
            // endIcon={loading && <CircularProgress size={20} />}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
