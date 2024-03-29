import { Typography } from "@mui/material";
import { FC } from "react";
import { ScoreboardPageContent } from "../modules/Scoreboard/components/ScoreboardPageContent";
import { ScoreboardContextProvider } from "../modules/Scoreboard/contexts/ScoreboardContext";
import { SEOTitle } from "../modules/SEO/components/SEOTitle";

export const ScoreboardPage: FC = () => {
  return (
    <>
      <SEOTitle title="Scoreboard" />
      <Typography variant="h4"> Scoreboard </Typography>
      <ScoreboardContextProvider>
        <ScoreboardPageContent />
      </ScoreboardContextProvider>
    </>
  );
};
