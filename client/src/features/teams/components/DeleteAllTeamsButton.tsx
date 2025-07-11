import { useCallback, useState } from "react";
import { DeleteCardsIconButton } from "@lib/components/ManagementButtons/DeleteCardsIconButton";
import { DeleteAllTeamsDialog } from "./DeleteTeamsDialog/DeleteAllTeamsDialog";

export const DeleteAllTeamsButton = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const toggleDialogOpen = useCallback(() => {
    setDeleteDialogOpen((prev) => !prev);
  }, []);

  return (
    <>
      <DeleteCardsIconButton
        tooltipText="Delete all teams"
        onClick={toggleDialogOpen}
      />
      {deleteDialogOpen && (
        <DeleteAllTeamsDialog handleClose={toggleDialogOpen} />
      )}
    </>
  );
};
