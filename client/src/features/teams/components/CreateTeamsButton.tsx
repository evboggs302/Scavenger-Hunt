import { useCallback, useState } from "react";
import { CreateCardsIconButton } from "@lib/components/ManagementButtons/CreateCardsIconButton";
import { CreateTeamsDialog } from "./CreateTeamsDialog/CreateTeamsDialog";

export const CreateTeamsButton = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const toggleDialogOpen = useCallback(() => {
    setCreateDialogOpen((prev) => !prev);
  }, []);

  return (
    <>
      <CreateCardsIconButton
        tooltipText="Create new teams"
        onClick={toggleDialogOpen}
      />
      {createDialogOpen && <CreateTeamsDialog handleClose={toggleDialogOpen} />}
    </>
  );
};
