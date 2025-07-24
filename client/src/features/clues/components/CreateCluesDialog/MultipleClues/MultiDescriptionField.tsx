import { useController } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type MultiDescriptionFieldProps = {
  index: number;
  remove: () => void;
};

export const MultiDescriptionField = ({
  index,
  remove,
}: MultiDescriptionFieldProps) => {
  const { field, fieldState } = useController({
    name: `cluesList[${index}]`,
    defaultValue: "",
  });

  return (
    <Box
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
      <IconButton
        onClick={remove}
        sx={{ height: "max-content", marginLeft: "4px" }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
};
