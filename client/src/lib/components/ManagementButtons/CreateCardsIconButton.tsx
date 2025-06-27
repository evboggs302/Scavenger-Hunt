import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";

type CreateCardsProps = {
  onClick: () => void;
  tooltipText?: string;
};

export const CreateCardsIconButton = ({
  onClick,
  tooltipText,
}: CreateCardsProps) => {
  return (
    <Tooltip title={tooltipText || "Create new"}>
      <IconButton
        aria-label="create-cards-icon-button"
        onClick={onClick}
        sx={{ marginRight: "6px" }}
      >
        <PlaylistAddCircleIcon />
      </IconButton>
    </Tooltip>
  );
};
