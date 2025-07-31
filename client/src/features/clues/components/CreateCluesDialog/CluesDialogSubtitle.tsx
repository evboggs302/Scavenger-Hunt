import type { CluesFormState } from "@features/clues/hooks/useCreateCluesResolver";
import { useFormValues } from "@lib/hooks/useFormValues";
import DialogContentText from "@mui/material/DialogContentText";
import pluralize from "pluralize";

export const CluesDialogSubtitle: React.FC = () => {
  const { cluesList } = useFormValues<CluesFormState>();
  const toPluralize = cluesList?.length || 0;

  return (
    <DialogContentText>
      {`To create ${toPluralize < 2 ? `a` : ""} new ${pluralize("clue", toPluralize)}, please provide the below information.`}
      <br />
    </DialogContentText>
  );
};
