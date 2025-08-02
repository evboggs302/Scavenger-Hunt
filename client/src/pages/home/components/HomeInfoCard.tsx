import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export type HomeInfoCardProps = {
  content: string;
  mediaLocation: "start" | "end";
  title: string;
};

export const HomeInfoCard: React.FC<HomeInfoCardProps> = ({
  content,
  mediaLocation,
  title,
}) => {
  return (
    <Card
      sx={{
        maxWidth: "95%",
        minWidth: 350,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "38px auto",
      }}
    >
      {mediaLocation === "start" && (
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {title}
        </Typography>
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          {content}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions> */}
      {mediaLocation === "end" && (
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
      )}
    </Card>
  );
};
