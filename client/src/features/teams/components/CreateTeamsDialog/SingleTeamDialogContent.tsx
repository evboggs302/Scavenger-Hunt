import { useController } from "react-hook-form";
import { FieldWrapper } from "@lib/components/Form/FieldWrapper";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

export const SingleTeamDialogContent = () => {
  const { field: membersField, fieldState: membersState } = useController({
    name: "team.members",
    defaultValue: "",
  });
  const { field: deviceNumber, fieldState: deviceNumberState } = useController({
    name: "team.device_number",
    defaultValue: "",
  });

  return (
    <>
      <FieldWrapper>
        <InputLabel required>
          Team members <i>(separated by a comma)</i>
        </InputLabel>
        <TextField
          multiline
          slotProps={{
            htmlInput: {
              "data-testid": "create-team-members-0",
            },
            input: {
              ref: membersField.ref,
            },
          }}
          name={membersField.name}
          value={membersField.value}
          onBlur={membersField.onBlur}
          onChange={membersField.onChange}
          placeholder={`ie. 'Johnny, Sarah, Adam, Brittney'`}
          error={!!membersState.error}
          helperText={membersState.error ? membersState.error.message : null}
          color={membersState.error ? "error" : "primary"}
          fullWidth
          variant="outlined"
        />
      </FieldWrapper>
      <FieldWrapper>
        <InputLabel required>Cell phone number</InputLabel>
        <TextField
          slotProps={{
            htmlInput: {
              "data-testid": "create-team-device-number-0",
            },
            input: {
              ref: deviceNumber.ref,
            },
          }}
          name={deviceNumber.name}
          value={deviceNumber.value}
          onBlur={deviceNumber.onBlur}
          onChange={deviceNumber.onChange}
          placeholder={`ie. +1-234-555-5678 or 2105551234`}
          error={!!deviceNumberState.error}
          helperText={
            deviceNumberState.error ? deviceNumberState.error.message : null
          }
          color={deviceNumberState.error ? "error" : "primary"}
          fullWidth
          variant="outlined"
        />
      </FieldWrapper>
    </>
  );
};
