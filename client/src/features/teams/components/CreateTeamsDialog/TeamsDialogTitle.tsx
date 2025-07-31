import type { CreateTeamsFormSchemaType } from "@features/teams/hooks/useCreateTeamsResolver";
import { useFormValues } from "@lib/hooks/useFormValues";
import DialogTitle from "@mui/material/DialogTitle";
import pluralize from "pluralize";

export const TeamsDialogTitle: React.FC = () => {
  const { teams } = useFormValues<CreateTeamsFormSchemaType>();
  const toPluralize = teams?.length || 0;

  return (
    <DialogTitle data-testid="create-team-title">{`Create ${pluralize("Team", toPluralize)}`}</DialogTitle>
  );
};
