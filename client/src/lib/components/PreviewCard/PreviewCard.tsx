import React, { PropsWithChildren } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router";

type PreviewCardProps = PropsWithChildren & {
  location: "teams" | "clues" | "responses";
  isLocationDisabled?: boolean;
};

export const PreviewCard = ({
  children,
  location,
  isLocationDisabled = false,
}: PreviewCardProps) => {
  const navigate = useNavigate();
  const title = location[0].toUpperCase() + location.slice(1);

  return (
    <Card variant="outlined" sx={{ minWidth: 275, margin: "14px auto" }}>
      <CardHeader
        title={title}
        action={
          <Button
            variant="outlined"
            disabled={isLocationDisabled}
            onClick={() => navigate(location, { relative: "path" })}
          >
            GO TO {location.toUpperCase()}
          </Button>
        }
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};
