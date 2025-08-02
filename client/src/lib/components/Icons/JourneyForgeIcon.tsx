import ImageList from "@mui/material/ImageList";
import JourneyForgePNG from "./journey_forge.png";
import ImageListItem from "@mui/material/ImageListItem";

export const JourneyForgeIcon: React.FC<{ hoverEffect?: boolean }> = ({
  hoverEffect = false,
}) => {
  return (
    <ImageList
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageListItem
        sx={{
          ":hover": {
            cursor: hoverEffect ? "pointer" : undefined,
          },
        }}
      >
        <img
          src={JourneyForgePNG}
          alt="journey-forge-icon"
          style={{
            objectFit: "contain",
          }}
        />
      </ImageListItem>
    </ImageList>
  );
};
