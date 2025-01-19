import Stack from "@mui/material/Stack";
import { CreateHuntButton } from "@features/hunts/components/CreateHuntDialog/CreateHuntButton";
import { HuntManagementButtons } from "@features/hunts/components/HuntManagementButtons";
import { useParams } from "react-router";

export const Header = () => {
  const { huntId } = useParams();
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-end", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <CreateHuntButton />
      {huntId && <HuntManagementButtons />}
    </Stack>
  );
};
