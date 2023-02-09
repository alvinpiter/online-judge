import { Typography } from "@mui/material";
import { FC } from "react";
import { ScoreboardPageContent } from "../modules/Scoreboard/components/ScoreboardPageContent";
import { ScoreboardContextProvider } from "../modules/Scoreboard/contexts/ScoreboardContext";

export const ScoreboardPage: FC = () => {
  return (
    <>
      <Typography variant="h4"> Scoreboard </Typography>
      <ScoreboardContextProvider>
        <ScoreboardPageContent />
      </ScoreboardContextProvider>
    </>
  );
};
