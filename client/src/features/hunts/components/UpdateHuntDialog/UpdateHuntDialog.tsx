import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useUpdateHuntMutation } from "../../hooks/useUpdateHuntMutation";
import {
  UpdateHuntFormSchema,
  useUpdateHuntResolver,
} from "./useUpdateHuntResolver";
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
import { UpdateNameField } from "./UpdateNameField";
import { UpdateRecallMessageField } from "./UpdateRecallMessageField";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";

type UpdateDialogProps = {
  handleClose: () => void;
};

type CustomStartDateOnChange = (
  value: Dayjs | null,
  context: PickerChangeHandlerContext<DateValidationError>
) => void;

export type UpdateHuntFormState = UpdateHuntFormSchema & {
  onSubmitError?: string;
};

export const UpdateHuntDialog = ({ handleClose }: UpdateDialogProps) => {
  const { hunt } = useHuntFragment();
  const [updateHunt, { loading }] = useUpdateHuntMutation();
  const [resolver] = useUpdateHuntResolver();

  const methods = useForm<UpdateHuntFormState>({
    mode: "all",
    resolver,
    defaultValues: {
      name: hunt.name,
      startDate: dayjs(hunt.start_date),
      endDate: dayjs(hunt.end_date),
      multipleDays: dayjs(hunt.end_date).isAfter(dayjs(hunt.start_date)),
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
      dirtyFields,
      errors: { onSubmitError },
    },
  } = methods;

  const { field: startDateField, fieldState: startDateState } = useController({
    name: "startDate",
    control,
  });
  const { field: endDateField, fieldState: endDateState } = useController({
    name: "endDate",
    control,
  });
  const { field: checkbox } = useController({
    name: "multipleDays",
    control,
  });

  useEffect(() => {
    trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changedFieldsWithoutCheckbox = Object.keys(dirtyFields).filter(
    (val) => val !== "multipleDays"
  );
  const submitIsReady = changedFieldsWithoutCheckbox.length > 0 && isValid;

  const onChangeStart: CustomStartDateOnChange = (val, ctx) => {
    // ctx has the validation result from MUI's DatePicker
    if (ctx.validationError === "invalidDate") {
      setError("startDate", { message: "Please select a valid start date." });
    }
    startDateField.onChange(val, ctx);
    endDateField.onChange(val?.add(1, "day"));
  };

  const onSubmit: SubmitHandler<UpdateHuntFormState> = async (formData) => {
    clearErrors("onSubmitError");
    await trigger();

    try {
      await updateHunt(formData);
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
        <DialogTitle data-testid="update-hunt-title">Update Hunt</DialogTitle>
        <DialogContent>
          {onSubmitError && <TryAgainAlert message={onSubmitError.message} />}
          <DialogContentText>
            To update a hunt, please change one of the below items.
            <br />
            <i>Required fields are marked.</i>
          </DialogContentText>
          <UpdateNameField />
          <FieldWrapper>
            <InputLabel required>Start date</InputLabel>
            <DatePicker
              disablePast
              name={startDateField.name}
              value={startDateField.value}
              onChange={onChangeStart}
              slotProps={{
                textField: {
                  ref: startDateField.ref,
                  label: startDateField.name,
                  onBlur: startDateField.onBlur,
                  error: !!startDateState.error,
                  helperText: startDateState.error
                    ? startDateState.error.message
                    : null,
                  color: startDateState.error ? "error" : "primary",
                  slotProps: {
                    htmlInput: {
                      "data-testid": "update-hunt-start",
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
              slotProps={{
                input: {
                  ref: checkbox.ref,
                  // @ts-ignore
                  "data-testid": "update-hunt-multiple-days",
                },
              }}
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
                name={endDateField.name}
                value={endDateField.value}
                onChange={endDateField.onChange}
                shouldDisableDate={(date) =>
                  date.isBefore(startDateField.value)
                }
                slotProps={{
                  textField: {
                    ref: endDateField.ref,
                    label: endDateField.name,
                    onBlur: endDateField.onBlur,
                    error: !!endDateState.error,
                    helperText: endDateState.error
                      ? endDateState.error.message
                      : null,
                    color: endDateState.error ? "error" : "primary",
                    slotProps: {
                      htmlInput: {
                        "data-testid": "update-hunt-end",
                      },
                    },
                  },
                }}
              />
            </FieldWrapper>
          )}
          <UpdateRecallMessageField />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            disabled={!submitIsReady || loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Update Hunt
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
