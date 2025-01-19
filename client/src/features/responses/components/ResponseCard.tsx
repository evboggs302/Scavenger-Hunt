import { useCallback } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { ResponsePayload } from "@generated/graphql";
import { useMarkResponseCorrectMutation } from "../hooks/useMarkResponseCorrectMutation";
import { useClueContext } from "@lib/context/ClueContext";
import { useHuntContext } from "@lib/context/HuntContext";
import dayjs from "dayjs";

type ResponseCardProps = { response: ResponsePayload };

export const ResponseCard = ({
  response: {
    _id,
    clue_id,
    correct,
    time_received,
    team_id,
    response_img,
    response_txt,
  },
}: ResponseCardProps) => {
  const { data: huntData } = useHuntContext();
  const { data: clueData } = useClueContext();
  const [markResponseCorrect] = useMarkResponseCorrectMutation();

  const team = huntData?.hunt.teams?.find((tm) => tm._id === team_id);
  const clue = clueData?.clues.find((clue) => clue?._id === clue_id);

  const handleMarkCorrect = useCallback(async () => {
    try {
      await markResponseCorrect(_id);
    } catch {
      throw Error();
    }
  }, [_id, markResponseCorrect]);

  return (
    <Card sx={{ maxWidth: "360px", margin: "10px 5px" }}>
      {response_img &&
        response_img.map((img) => (
          <CardMedia component="img" height="140" image={img} />
        ))}
      <CardContent>
        <Typography gutterBottom variant="subtitle2" component="div">
          {clue?.description}
        </Typography>
        {response_txt && (
          <Typography
            gutterBottom
            variant="body1"
            sx={{ color: "text.secondary" }}
          >
            Response: {response_txt}
          </Typography>
        )}
        <Typography gutterBottom variant="body2">
          Time received:{" "}
          <i>{dayjs(time_received).format("h:mm:ss A, MMM D, YYYY")}</i>
        </Typography>
        <Typography gutterBottom variant="body2">
          Is correct: <i>{`${correct ? "TRUE" : "FALSE"}`}</i>
        </Typography>
        <Typography gutterBottom variant="body2">
          Team: <i>{team?.members.join(", ")}</i>
        </Typography>
        <Typography gutterBottom variant="body2">
          ID: <i>{_id}</i>
        </Typography>
      </CardContent>
      {huntData?.hunt.is_active && !correct && (
        <CardActions>
          <Button size="small" onClick={handleMarkCorrect}>
            Mark correct
          </Button>
          <Button size="small" disabled>
            Send hint
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
