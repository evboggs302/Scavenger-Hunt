import { useCallback, useState } from "react";
import { CreateCluesDialog } from "./CreateCluesDialog/CreateCluesDialog";
import { CreateCardsIconButton } from "@lib/components/ManagementButtons/CreateCardsIconButton";

export const CreateCluesButton = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const toggleDialogOpen = useCallback(() => {
    setCreateDialogOpen((prev) => !prev);
  }, []);

  return (
    <>
      <CreateCardsIconButton
        tooltipText="Create new clues"
        onClick={toggleDialogOpen}
      />
      {createDialogOpen && <CreateCluesDialog handleClose={toggleDialogOpen} />}
    </>
  );
};
