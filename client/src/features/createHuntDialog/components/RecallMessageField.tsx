import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useController } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";

export const RecallMessageField = () => {
  const { field, fieldState } = useController({
    name: "recallMessage",
    defaultValue: undefined,
  });

  return (
    <FieldWrapper>
      <InputLabel data-testid="create-hunt-recall-info">
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
            "data-testid": "create-hunt-recall-message",
          },
        }}
        ref={field.ref}
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
