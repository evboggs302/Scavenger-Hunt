import { useCallback, useState } from "react";
import { DeleteAllCluesDialog } from "./DeleteCluesDialog/DeleteAllCluesDialog";
import { DeleteCardsIconButton } from "@lib/components/ManagementButtons/DeleteCardsIconButton";

export const DeleteAllCluesButton = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const toggleDialogOpen = useCallback(() => {
    setDeleteDialogOpen((prev) => !prev);
  }, []);

  return (
    <>
      <DeleteCardsIconButton
        tooltipText="Delete all clues"
        onClick={toggleDialogOpen}
      />
      {deleteDialogOpen && (
        <DeleteAllCluesDialog handleClose={toggleDialogOpen} />
      )}
    </>
  );
};
