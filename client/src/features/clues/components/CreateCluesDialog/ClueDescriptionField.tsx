import { useCallback } from "react";
import { useController, type UseFieldArrayRemove } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type MultiDescriptionFieldProps = {
  fieldId: string;
  hasMultiple: boolean;
  index: number;
  remove: UseFieldArrayRemove;
};

export const ClueDescriptionField = ({
  fieldId,
  hasMultiple,
  index,
  remove,
}: MultiDescriptionFieldProps) => {
  const { field, fieldState } = useController({
    name: `cluesList[${index}]`,
  });

  const removeFromArray = useCallback(() => remove(index), [index, remove]);

  return (
    <Box
      key={fieldId}
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: "10px 5px",
        alignItems: "center",
      }}
    >
      <TextField
        multiline
        slotProps={{
          htmlInput: {
            "data-testid": `create-description-${index}`,
            maxLength: 256,
          },
        }}
        {...field}
        placeholder={`ie. "Who was the first President?"`}
        error={!!fieldState.error}
        helperText={fieldState.error ? fieldState.error.message : null}
        color={fieldState.error ? "error" : "primary"}
        fullWidth
        variant="outlined"
      />
      {hasMultiple && (
        <IconButton
          onClick={removeFromArray}
          sx={{ height: "max-content", marginLeft: "4px" }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      )}
    </Box>
  );
};
