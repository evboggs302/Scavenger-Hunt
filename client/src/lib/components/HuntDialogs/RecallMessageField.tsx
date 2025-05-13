import { FieldWrapper } from "../Form/FieldWrapper";
import InputLabel from "@mui/material/InputLabel";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

type RecallMessageFieldProps = {
  field: ControllerRenderProps<FieldValues, "recallMessage">;
  fieldState: ControllerFieldState;
  mode: "create" | "update";
};

export const RecallMessageField = ({
  field,
  fieldState,
  mode,
}: RecallMessageFieldProps) => {
  return (
    <FieldWrapper>
      <InputLabel data-testid={`${mode}-hunt-recall-label`}>
        Recall message{" "}
        <Tooltip
          placement="right"
          title={`The message to be sent to teams at the end of your event. The default value is "You've completed your hunt."`}
        >
          <InfoRoundedIcon fontSize="small" />
        </Tooltip>
      </InputLabel>
      <TextField
        slotProps={{
          htmlInput: {
            ref: field.ref,
            "data-testid": `${mode}-hunt-recall-message`,
          },
        }}
        name={field.name}
        value={field.value}
        onBlur={field.onBlur}
        onChange={field.onChange}
        placeholder={`eg. "Make your way back to the starting location."`}
        error={!!fieldState.error}
        helperText={fieldState.error ? fieldState.error.message : null}
        color={fieldState.error ? "error" : "primary"}
        fullWidth
        variant="outlined"
      />
    </FieldWrapper>
  );
};
