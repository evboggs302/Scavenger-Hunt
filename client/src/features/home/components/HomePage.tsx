import Box from "@mui/material/Box";
import { HomeInfo } from "./HomeInfo";

export const HomePage = () => {
  return (
    <Box>
      <HomeInfo />
      <ul>
        <li>maybe display user info here?</li>
        <li>describe what this app can do</li>
        <li>explain next steps</li>
        <li>explain setup</li>
        <li>explain how to activate a hunt</li>
        <li>give thanks and shoutouts</li>
      </ul>
    </Box>
  );
};
