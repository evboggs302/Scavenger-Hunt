import { useController } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

export const SingleClueDialogContent = () => {
  const { field: description, fieldState: descriptionState } = useController({
    name: "description",
  });

  return (
    <FieldWrapper>
      <InputLabel required>
        Description <i>(5 - 256 characters)</i>
      </InputLabel>
      <TextField
        multiline
        slotProps={{
          htmlInput: {
            "data-testid": "create-description-0",
            maxLength: 256,
          },
          input: {
            ref: description.ref,
          },
        }}
        name={description.name}
        value={description.value}
        onBlur={description.onBlur}
        onChange={description.onChange}
        placeholder={`ie. "Who was the first President?"`}
        error={!!descriptionState.error}
        helperText={
          descriptionState.error ? descriptionState.error.message : null
        }
        color={descriptionState.error ? "error" : "primary"}
        fullWidth
        variant="outlined"
      />
    </FieldWrapper>
  );
};
