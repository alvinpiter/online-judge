import { Link, Tab, Tabs } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { ProblemDescriptionTab } from "../modules/Problem/components/ProblemDescriptionTab/ProblemDescriptionTab";

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
      </Tabs>
      <Link href={ROUTES.PROBLEM_SUBMISSIONS_ROUTE.generatePath({ problemId })}>
        Submissions
      </Link>

      {tabIndex === 0 && <ProblemDescriptionTab problemId={problemId} />}
    </>
  );
};
