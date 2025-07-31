import { useCallback } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useController, type UseFieldArrayRemove } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";

type CreateTeamFieldsProps = {
  fieldId: string;
  hasMultiple: boolean;
  index: number;
  remove: UseFieldArrayRemove;
};

export const CreateTeamFields: React.FC<CreateTeamFieldsProps> = ({
  fieldId,
  hasMultiple,
  index,
  remove,
}) => {
  const { field: membersField, fieldState: membersFieldState } = useController({
    name: `teams[${index}].members`,
    defaultValue: "",
  });

  const { field: deviceField, fieldState: deviceFieldState } = useController({
    name: `teams[${index}].device_number`,
    defaultValue: "",
  });

  const removeFromArray = useCallback(() => remove(index), [index, remove]);

  return (
    <Box
      key={fieldId}
      data-testid="team-info-container"
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
          multiline
          slotProps={{
            htmlInput: {
              "data-testid": `create-team-members-${index}`,
            },
          }}
          {...membersField}
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
          {...deviceField}
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
