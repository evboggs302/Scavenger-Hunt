import { FieldWrapper } from "../Form/FieldWrapper";
import InputLabel from "@mui/material/InputLabel";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useController, useFormContext } from "react-hook-form";
import { useHuntFragment } from "@lib/hooks/useHuntFragment";
import type { BaseHuntFormSchema } from "@lib/model/baseHuntSchema";

type RecallMessageFieldProps = {
  mode: "create" | "update";
};

export const RecallMessageField = ({ mode }: RecallMessageFieldProps) => {
  const { hunt } = useHuntFragment();
  const { control } = useFormContext<BaseHuntFormSchema>();
  const { field, fieldState } = useController({
    name: "recallMessage",
    control,
    defaultValue: mode === "create" ? "" : hunt.recall_message || "",
  });

  return (
    <FieldWrapper>
      <InputLabel data-testid={`${mode}-hunt-recall-label`}>
        Recall message
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
            "data-testid": `${mode}-hunt-recall-message`,
          },
        }}
        {...field}
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
