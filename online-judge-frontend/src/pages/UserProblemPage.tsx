import { Tab, Tabs } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { ProblemDescriptionTab } from "../modules/Problem/components/ProblemDescriptionTab";
import { ProblemSubmissionsTab } from "../modules/Problem/components/ProblemSubmissionsTab";

export const UserProblemPage: FC = () => {
  const params = useParams<{ problemId: string }>();
  const problemId = params.problemId!;

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Tabs
        value={tabIndex}
        onChange={(event, newTabIndex: number) => setTabIndex(newTabIndex)}
      >
        <Tab label="Problem" />
        <Tab label="Submissions" />
      </Tabs>

      {tabIndex === 0 && <ProblemDescriptionTab problemId={problemId} />}
      {tabIndex === 1 && <ProblemSubmissionsTab problemId={problemId} />}
    </>
  );
};
