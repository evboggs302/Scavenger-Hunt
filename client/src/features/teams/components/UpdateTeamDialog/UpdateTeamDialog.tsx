import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import { useUpdateTeamMutation } from "@features/teams/hooks/useUpdateTeamMutation";
import { SingleTeamDialogContent } from "../CreateTeamsDialog/SingleTeamDialogContent";
import { UpdateTeamDialogActions } from "./UpdateTeamDialogActions";
import {
  UpdateTeamFormSchemaType,
  useUpdateTeamResolver,
} from "@features/teams/hooks/useUpdateTeamResolver";
import { Team } from "@generated/graphql";

type UpdateDialogProps = {
  team_id: string;
  team: Pick<Team, "members" | "device_number">;
  handleClose: () => void;
};

export const UpdateTeamsDialog = ({
  team,
  team_id,
  handleClose,
}: UpdateDialogProps) => {
  const [resolver] = useUpdateTeamResolver();
  const [updateTeam] = useUpdateTeamMutation();

  const methods = useForm<UpdateTeamFormSchemaType>({
    mode: "all",
    resolver,
    defaultValues: {
      team: {
        members: team.members.join(", "),
        device_number: team.device_number,
      },
    },
  });

  const {
    reset,
    trigger,
    clearErrors,
    handleSubmit,
    formState: {
      errors: { onSubmitError },
    },
  } = methods;

  const onSubmit: SubmitHandler<UpdateTeamFormSchemaType> = async ({
    team,
  }) => {
    clearErrors("onSubmitError");
    await trigger();

    await updateTeam({
      team_id,
      members: team.members.split(",").map((s) => s.trim()),
      device_number: team.device_number,
    });

    handleClose();
    reset();
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleSubmit(onSubmit),
          },
        }}
      >
        <DialogTitle data-testid="update-team-title">Update team</DialogTitle>
        <DialogContent>
          {onSubmitError && <TryAgainAlert message={onSubmitError.message} />}
          <DialogContentText>
            Please provide the new information for the team.
          </DialogContentText>
          <SingleTeamDialogContent />
        </DialogContent>
        <UpdateTeamDialogActions
          defaultValue={team}
          handleClose={handleClose}
        />
      </Dialog>
    </FormProvider>
  );
};
