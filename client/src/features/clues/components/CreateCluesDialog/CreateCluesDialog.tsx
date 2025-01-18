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
  CreateCluesFormSchemaType,
  useCreateCluesResolver,
} from "@features/clues/hooks/useCluesResolver";
import { useCreateSingleClueMutation } from "@features/clues/hooks/useCreateSingleClueMutation";
import { useCreateMultipleCluesMutation } from "@features/clues/hooks/useCreateMultipleCluesMutation";
import { SingleClueDialogContent } from "./SingleClueDialogContent";
import { MultipleCluesDialogContent } from "./MultipleCluesDialogContent";

type CreateDialogProps = {
  handleClose: () => void;
};

export type CreateCluesFormState = CreateCluesFormSchemaType & {
  onSubmitError?: string;
};

export const CreateCluesDialog = ({ handleClose }: CreateDialogProps) => {
  const [resolver] = useCreateCluesResolver();
  const [createSingle, singleClueResult] = useCreateSingleClueMutation();
  const [createMultiple, mutlipleCluesResult] =
    useCreateMultipleCluesMutation();

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

  const { field: toggleSwitch } = useController({
    name: "isMulti",
    control,
    defaultValue: false,
  });

  const onSubmit: SubmitHandler<CreateCluesFormState> = async (formData) => {
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

  const loading = singleClueResult.loading || mutlipleCluesResult.loading;
  const toPluralizeClue = +!toggleSwitch.value;

  return (
    <FormProvider {...methods}>
      <Dialog
        open={true}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        }}
      >
        <DialogTitle data-testid="create-hunt-title">{`Create ${pluralize("Clue", toPluralizeClue)}`}</DialogTitle>
        <DialogContent>
          {onSubmitError && <TryAgainAlert message={onSubmitError.message} />}
          <DialogContentText>
            {`To create ${!toggleSwitch.value ? `a` : ""} new ${pluralize("clue", toPluralizeClue)}, please provide the below information.`}
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
              inputRef={toggleSwitch.ref}
              name={toggleSwitch.name}
              value={toggleSwitch.value}
              onBlur={toggleSwitch.onBlur}
              onChange={toggleSwitch.onChange}
              //   disabled
            />
            <InputLabel>
              Creating multiple clues <i>(COMING SOON!)</i>
            </InputLabel>
          </Box>
          {toggleSwitch.value === false && <SingleClueDialogContent />}
          {toggleSwitch.value === true && <MultipleCluesDialogContent />}
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
