import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import { useUpdateClueDescriptionMutation } from "@features/clues/hooks/useUpdateClueDescriptionMutation";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import {
  CluesFormState,
  useCluesResolver,
} from "@features/clues/hooks/useCluesResolver";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import Box from "@mui/material/Box";

type DeleteDialogProps = {
  clue_id: string;
  description: string;
  handleClose: () => void;
};

export const EditClueDialog = ({
  clue_id,
  description,
  handleClose,
}: DeleteDialogProps) => {
  const [resolver] = useCluesResolver();
  const [updateClue, { error, loading }] = useUpdateClueDescriptionMutation();

  const methods = useForm<CluesFormState>({
    mode: "onTouched",
    resolver,
    defaultValues: {
      isMulti: false,
      description,
    },
  });

  const {
    reset,
    control,
    trigger,
    clearErrors,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const { field, fieldState } = useController({
    name: "description",
    control,
  });

  const isSaveDisabled = !isValid || loading || field.value === description;

  const onSubmit: SubmitHandler<CluesFormState> = async (formData) => {
    clearErrors("onSubmitError");
    await trigger();

    try {
      if (!formData.isMulti) {
        await updateClue({ clue_id, description: formData.description });
        handleClose();
      } else {
        throw new Error("Multiple clues are not supported.");
      }
    } catch {
      reset();
    }
  };

  return (
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
      <DialogTitle data-testid="create-hunt-title">Update clue</DialogTitle>
      <DialogContent>
        {error && <TryAgainAlert message={error.message} />}
        <DialogContentText>
          Please provide the new description for the clue.
        </DialogContentText>
        <FieldWrapper>
          <InputLabel required>
            Description <i>(5 - 256 characters)</i>
          </InputLabel>
          <TextField
            multiline
            slotProps={{
              htmlInput: {
                "data-testid": "update-clue-description",
                maxLength: 256,
              },
              input: {
                ref: field.ref,
              },
            }}
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            placeholder={`ie. "Who was the first President?"`}
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : null}
            color={fieldState.error ? "error" : "primary"}
            fullWidth
            variant="outlined"
          />
        </FieldWrapper>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button disabled={loading} onClick={handleClose}>
          Cancel
        </Button>
        <Box>
          <Button
            variant="outlined"
            disabled={loading || field.value === description}
            sx={{ marginRight: "4px" }}
            onClick={() => reset()}
          >
            Reset
          </Button>
          <Button
            type="submit"
            color="info"
            variant="contained"
            disabled={isSaveDisabled}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
