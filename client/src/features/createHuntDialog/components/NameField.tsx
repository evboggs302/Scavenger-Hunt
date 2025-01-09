import React from "react";
import { useController } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";

export const NameField = () => {
  const { field, fieldState } = useController({
    name: "name",
    defaultValue: "",
  });

  return (
    <FieldWrapper>
      <InputLabel required>Hunt name</InputLabel>
      <TextField
        slotProps={{
          htmlInput: {
            "data-testid": "create-hunt-name",
          },
        }}
        inputRef={field.ref}
        name={field.name}
        value={field.value}
        onBlur={field.onBlur}
        onChange={field.onChange}
        placeholder={`"Smith family reunion 2020"`}
        error={!!fieldState.error}
        helperText={fieldState.error ? fieldState.error.message : null}
        color={fieldState.error ? "error" : "primary"}
        fullWidth
        variant="outlined"
      />
    </FieldWrapper>
  );
};
