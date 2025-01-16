import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useCreateHuntMutation } from "../../hooks/useCreateHuntMutation";
import {
  CreateHuntFormSchema,
  useCreateHuntResolver,
} from "./useCreateHuntResolver";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import Checkbox from "@mui/material/Checkbox";
import {
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers/models";
import { CreateNameField } from "./CreateNameField";
import { CreateRecallMessageField } from "./CreateRecallMessageField";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";

type CreateDialogProps = {
  handleClose: () => void;
};

type CustomStartDateOnChange = (
  value: Dayjs | null,
  context: PickerChangeHandlerContext<DateValidationError>
) => void;

export type CreateHuntFormState = CreateHuntFormSchema & {
  onSubmitError?: string;
};

export const CreateHuntDialog = ({ handleClose }: CreateDialogProps) => {
  const [createHunt, { loading }] = useCreateHuntMutation();
  const [resolver] = useCreateHuntResolver();

  const methods = useForm<CreateHuntFormState>({
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

  const { field: startDateField, fieldState: startDateState } = useController({
    name: "startDate",
    control,
    defaultValue: dayjs(),
  });
  const { field: endDateField, fieldState: endDateState } = useController({
    name: "endDate",
    control,
    defaultValue: startDateField.value.add(1, "day"),
  });
  const { field: checkbox } = useController({
    name: "multipleDays",
    control,
    defaultValue: false,
  });

  const onChangeStart: CustomStartDateOnChange = (val, ctx) => {
    // ctx has the validation result from MUI's DatePicker
    if (ctx.validationError === "invalidDate") {
      setError("startDate", { message: "Please select a valid date." });
    }
    startDateField.onChange(val, ctx);
    endDateField.onChange(val?.add(1, "day"));
  };

  const onSubmit: SubmitHandler<CreateHuntFormState> = async (formData) => {
    clearErrors("onSubmitError");
    await trigger();

    try {
      await createHunt(formData);
    } catch (err) {
      if (err instanceof ApolloError) {
        setError("onSubmitError", { type: "error", message: err.message });
      } else {
        setError("onSubmitError", {
          type: "error",
          message: "An unknown error occurred.",
        });
      }
    } finally {
      reset();
    }
  };

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
        <DialogTitle data-testid="create-hunt-title">
          Create New Hunt
        </DialogTitle>
        <DialogContent>
          {onSubmitError && <TryAgainAlert message={onSubmitError.message} />}
          <DialogContentText>
            To create a new hunt, please provide the below information.
            <br />
            <i>Required fields are marked.</i>
          </DialogContentText>
          <CreateNameField />
          <FieldWrapper>
            <InputLabel required>Start date</InputLabel>
            <DatePicker
              disablePast
              inputRef={startDateField.ref}
              name={startDateField.name}
              value={startDateField.value}
              onChange={onChangeStart}
              slotProps={{
                textField: {
                  onBlur: startDateField.onBlur,
                  error: !!startDateState.error,
                  helperText: startDateState.error
                    ? startDateState.error.message
                    : null,
                  color: startDateState.error ? "error" : "primary",
                  slotProps: {
                    htmlInput: {
                      "data-testid": "create-hunt-start",
                    },
                  },
                },
              }}
            />
          </FieldWrapper>
          <Box
            sx={{
              margin: "14px auto",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              data-testid="create-hunt-multiple-days"
              inputRef={checkbox.ref}
              name={checkbox.name}
              checked={checkbox.value}
              onBlur={checkbox.onBlur}
              onChange={checkbox.onChange}
            />
            <InputLabel>This hunt spans multiple days.</InputLabel>
          </Box>
          {checkbox.value === true && (
            <FieldWrapper>
              <InputLabel required>End date</InputLabel>
              <DatePicker
                disablePast
                disabled={!!startDateState.error}
                inputRef={endDateField.ref}
                name={endDateField.name}
                value={endDateField.value}
                onChange={endDateField.onChange}
                shouldDisableDate={(date) =>
                  date.isBefore(startDateField.value)
                }
                slotProps={{
                  textField: {
                    onBlur: endDateField.onBlur,
                    error: !!endDateState.error,
                    helperText: endDateState.error
                      ? endDateState.error.message
                      : null,
                    color: endDateState.error ? "error" : "primary",
                    slotProps: {
                      htmlInput: {
                        "data-testid": "create-hunt-end",
                      },
                    },
                  },
                }}
              />
            </FieldWrapper>
          )}
          <CreateRecallMessageField />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            disabled={!isValid || loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Create Hunt
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
