import Box from "@mui/material/Box";
import { HomeInfoCard, type HomeInfoCardProps } from "./HomeInfoCard";

const cardContents: HomeInfoCardProps[] = [
  {
    title: "Welcome! 🎉",
    mediaLocation: "end",
    content:
      "Welcome to JourneyForge Solutions, where innovation meets adventure in the heart of a futuristic world! We empower event organizers, businesses, and creatives to craft unforgettable interactive journeys using cutting-edge SMS and MMS capabilities. With our scalable usage-based plans and real-time analytics, you can design, manage, and conquer any challenge!",
  },
  {
    title: "1. Create your hunt",
    mediaLocation: "start",
    content: `Ready to get started? Click the "New Hunt" button. Give your event a fun name and description, provide the dates it's active, and the message to send all teams at the end.`,
  },
  {
    title: "2. Create clues",
    mediaLocation: "end",
    content: `Craft each clue with care! Sent as an SMS message, be sure to include riddles, text-based puzzles, or location-based hints - ensuring they’re concise (under 160 characters for SMS) and engaging. Good clues balance challenge and clarity, offering subtle hints that encourage exploration without being too obvious. Incorporate the event’s theme for immersion, and vary in style (e.g., wordplay or directional cues) to keep teams intrigued.`,
  },
  {
    title: "3. Create teams",
    mediaLocation: "start",
    content: `Who are going to be your victims... I mean participants? For each team, enter a unique team name and assign ONE US phone number (e.g., 555-123-4567), ensuring it’s a valid 10-digit number for SMS communication. Or, if you'd rather, provide a comma-separated list of names. You'll still be able to edit this information until the event is activated.`,
  },
  {
    title: "4. Activate, Watch, & Approve",
    mediaLocation: "end",
    content: `LET THE FUN BEGIN! Select your prepared hunt, review the clues and assigned teams, then click "Activate" to send the initial SMS clue to each team’s single US phone number. As responses are pouring in, YOU will get to see and approve/reject each response. Once a response is approved, the system will initiate delivery of the next clue to that team. Sit back and watch the adventure unfold seamlessly!`,
  },
  {
    title: `Journey Forged 💪🏼`,
    mediaLocation: "start",
    content: `Select the active hunt, review the teams to confirm they've received the recall message, and click "Deactivate Hunt" button. If a team hasn't received the recall message, clicking the deactivate button will send them the recall message, signaling the conclusion of the journey. The system will finalize the results, displaying a summary of team performances, and allow you to share outcomes, wrapping up the journey with ease!`,
  },
];

export const HomePage = () => {
  return (
    <Box
      data-testid="home-page-container"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {/* PUT SOME KIND OF IMAGE */}
      {cardContents.map((values, index) => (
        <HomeInfoCard key={index} {...values} />
      ))}
    </Box>
  );
};
