import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

type ConfirmDeleteUserDialogProps = {
  closeDialog: () => void;
  confirm: () => Promise<void>;
};

export const ConfirmDeleteUserDialog = ({
  confirm,
  closeDialog,
}: ConfirmDeleteUserDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      open={true}
      fullScreen={fullScreen}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: confirm,
        },
      }}
    >
      <DialogTitle
        data-testid="delete-hunt-title"
        sx={{ display: "flex", gap: 1 }}
      >
        <ReportOutlinedIcon color="error" fontSize="large" />
        Confirm account deletion
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>Oh no! We are sad to see you go.</Typography>
        <Typography gutterBottom>
          You may only delete your account if you do not have an outstanding
          balance.
        </Typography>
        <Typography
          gutterBottom
          sx={{
            marginTop: theme.spacing(2),
          }}
        >
          Are you sure you want to delete your user account?
        </Typography>
        <Typography
          gutterBottom
          sx={{
            fontStyle: "italic",
            fontWeight: 500,
            marginTop: theme.spacing(4),
          }}
        >
          THIS CANNOT BE UNDONE.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button type="submit" color="error">
          Confirm delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
