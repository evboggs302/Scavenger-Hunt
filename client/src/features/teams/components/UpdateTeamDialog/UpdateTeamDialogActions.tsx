import { UpdateTeamFormSchemaType } from "@features/teams/hooks/useUpdateTeamResolver";
import { useFormValues } from "@lib/hooks/useFormValues";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import DialogActions from "@mui/material/DialogActions";
import { useFormContext } from "react-hook-form";

export const UpdateTeamDialogActions = ({
  defaultValue,
  handleClose,
}: {
  defaultValue: {
    members: string[];
    device_number: string;
  };
  handleClose: () => void;
}) => {
  const { team } = useFormValues<UpdateTeamFormSchemaType>();
  const {
    reset,
    formState: { isSubmitting, isValid },
  } = useFormContext<UpdateTeamFormSchemaType>();

  const splitMembers = team.members.split(",");
  const identicalTeams =
    splitMembers.length === defaultValue.members.length &&
    splitMembers
      .map((str) => str.trim())
      .every((val) =>
        defaultValue.members.map((str) => str.trim()).includes(val)
      );

  const valuesChanged =
    !identicalTeams || team.device_number !== defaultValue.device_number;

  const isSaveDisabled = !isValid || isSubmitting || !valuesChanged;

  return (
    <DialogActions>
      <Button disabled={isSubmitting} onClick={handleClose}>
        Cancel
      </Button>
      <Box>
        <Button
          variant="outlined"
          disabled={isSubmitting || !valuesChanged}
          sx={{ marginRight: "4px" }}
          onClick={() => reset()}
        >
          Reset
        </Button>
        <Button
          type="submit"
          color="info"
          variant="contained"
          disabled={isSaveDisabled}
          endIcon={isSubmitting && <CircularProgress size={20} />}
        >
          Save
        </Button>
      </Box>
    </DialogActions>
  );
};
