import type { CreateTeamsFormSchemaType } from "@features/teams/hooks/useCreateTeamsResolver";
import { useFormValues } from "@lib/hooks/useFormValues";
import DialogContentText from "@mui/material/DialogContentText";
import pluralize from "pluralize";

export const TeamsDialogSubtitle: React.FC = () => {
  const { teams } = useFormValues<CreateTeamsFormSchemaType>();
  const toPluralize = teams?.length || 0;

  return (
    <DialogContentText>
      {`To create ${toPluralize < 2 ? `a` : ""} new ${pluralize("team", toPluralize)}, please provide the below information.`}
      <br />
      <i>Required fields are marked.</i>
    </DialogContentText>
  );
};
