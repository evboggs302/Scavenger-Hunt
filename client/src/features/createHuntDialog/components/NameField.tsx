import React from "react";
import { useController } from "react-hook-form";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

export const NameField = () => {
  const { field, fieldState } = useController({
    name: "name",
    defaultValue: "",
  });

  return (
    <Box sx={{ margin: "14px auto" }}>
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
        placeholder={`"Smith family reunion 2020`}
        error={!!fieldState.error}
        helperText={fieldState.error ? fieldState.error.message : null}
        color={fieldState.error ? "error" : "primary"}
        fullWidth
        variant="outlined"
      />
    </Box>
  );
};
