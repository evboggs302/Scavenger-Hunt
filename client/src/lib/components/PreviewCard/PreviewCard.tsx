import React, { ReactNode } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

type PreviewCardProps = {
  children: ReactNode;
  location: "teams" | "clues" | "responses";
};

export const PreviewCard = ({ children }: PreviewCardProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader></CardHeader>
      <CardContent>{children}</CardContent>
      <CardActions>
        <Box>
          Go to the Teams page to create teams!
          <Button onClick={() => navigate(location, { relative: "path" })}>
            GO TO TEAMS
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};
