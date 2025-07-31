import type { CluesFormState } from "@features/clues/hooks/useCreateCluesResolver";
import { useFormValues } from "@lib/hooks/useFormValues";
import DialogTitle from "@mui/material/DialogTitle";
import pluralize from "pluralize";

export const CluesDialogTitle: React.FC = () => {
  const { cluesList } = useFormValues<CluesFormState>();
  const toPluralize = cluesList?.length || 0;

  return (
    <DialogTitle data-testid="create-clues-title">{`Create ${pluralize("Clue", toPluralize)}`}</DialogTitle>
  );
};
