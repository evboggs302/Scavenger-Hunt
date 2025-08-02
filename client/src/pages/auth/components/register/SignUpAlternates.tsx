import { FacebookIcon, GoogleIcon } from "@lib/components/Icons/CustomIcons";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";

export const SignUpAlternates = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => alert("Sign up with Google")}
        startIcon={<GoogleIcon />}
      >
        Sign up with Google
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => alert("Sign up with Facebook")}
        startIcon={<FacebookIcon />}
      >
        Sign up with Facebook
      </Button>
      <Typography sx={{ textAlign: "center" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ alignSelf: "center" }}>
          Sign in
        </Link>
      </Typography>
    </Box>
  );
};
