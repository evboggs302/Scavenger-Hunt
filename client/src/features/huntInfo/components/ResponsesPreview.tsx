import React from "react";
import { TryAgainAlert } from "@lib/components/Alerts/TryAgainAlert";
import Skeleton from "@mui/material/Skeleton";
import { PreviewCard } from "@lib/components/PreviewCard/PreviewCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useResponseCount } from "@features/responses/hooks/useResponseCount";

export const ResponsesPreview = () => {
  const { count, loading, error } = useResponseCount();
  const hasResponses = count !== 0;

  if (loading) {
    return <Skeleton variant="rectangular" width={210} height={60} />;
  }

  if (error) {
    return <TryAgainAlert />;
  }

  return (
    <PreviewCard
      location="responses"
      isLocationDisabled={loading || !hasResponses}
    >
      <Box sx={{ minWidth: 650 }}>
        <Typography variant="h3">{count}</Typography>
        <Typography>
          <i>Responses received </i>
        </Typography>
      </Box>
    </PreviewCard>
  );
};
