import type { PropsWithChildren } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const AppMUIProviders = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        autoHideDuration={3_000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        iconVariant={{
          success: "✅",
          error: "🚫",
          warning: "🚧",
          info: "𝓲",
        }}
        action={(snackbarId) => (
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={() => closeSnackbar(snackbarId)}
          >
            <CloseIcon />
          </IconButton>
        )}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
