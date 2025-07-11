import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type DeleteCardsProps = {
  onClick: () => void;
  tooltipText?: string;
};

export const DeleteCardsIconButton = ({
  onClick,
  tooltipText,
}: DeleteCardsProps) => {
  return (
    <Tooltip title={tooltipText || "Delete"}>
      <IconButton
        aria-label="delete-cards-icon-button"
        onClick={onClick}
        color="error"
      >
        <DeleteForeverIcon />
      </IconButton>
    </Tooltip>
  );
};
