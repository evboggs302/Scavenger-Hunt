import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useController } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";

type MultiTeamFieldsProps = {
  index: number;
  remove: () => void;
};

export const MultiTeamsFields = ({ index, remove }: MultiTeamFieldsProps) => {
  const { field: membersField, fieldState: membersFieldState } = useController({
    name: `teams[${index}].members`,
    defaultValue: "",
  });

  const { field: deviceField, fieldState: deviceFieldState } = useController({
    name: `teams[${index}].device_number`,
    defaultValue: "",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: "5px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <FieldWrapper sx={{ width: "100%" }}>
        <InputLabel required>
          Team members <i>(separated by a comma)</i>
        </InputLabel>
        <TextField
          slotProps={{
            htmlInput: {
              "data-testid": `create-team-members-${index}`,
            },
          }}
          multiline
          inputRef={membersField.ref}
          name={membersField.name}
          value={membersField.value}
          onBlur={membersField.onBlur}
          onChange={membersField.onChange}
          placeholder={`ie. 'Johnny, Sarah, Adam, Brittney'`}
          error={!!membersFieldState.error}
          helperText={
            membersFieldState.error ? membersFieldState.error.message : null
          }
          color={membersFieldState.error ? "error" : "primary"}
          fullWidth
          variant="outlined"
        />
        <InputLabel required>Cell phone number</InputLabel>
        <TextField
          slotProps={{
            htmlInput: {
              "data-testid": `create-team-device-number-${index}`,
            },
          }}
          inputRef={deviceField.ref}
          name={deviceField.name}
          value={deviceField.value}
          onBlur={deviceField.onBlur}
          onChange={deviceField.onChange}
          placeholder={`ie. +1-234-555-5678 or 2105551234`}
          error={!!deviceFieldState.error}
          helperText={
            deviceFieldState.error ? deviceFieldState.error.message : null
          }
          color={deviceFieldState.error ? "error" : "primary"}
          fullWidth
          variant="outlined"
        />
      </FieldWrapper>
      <IconButton
        onClick={remove}
        sx={{ height: "max-content", marginLeft: "4px" }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Box>
  );
};
