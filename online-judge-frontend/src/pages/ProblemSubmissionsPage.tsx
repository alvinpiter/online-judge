import { Link, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { useCurrentQueryString } from "../lib/general/useCurrentQueryString";
import { useGetProblemRequest } from "../modules/Problem/hooks/useGetProblemRequest";
import { ProblemSubmissionsPageContent } from "../modules/Submission/components/ProblemSubmissionsPageContent";
import { SubmissionsContextProvider } from "../modules/Submission/contexts/SubmissionsContext";
import { ProblemSubmissionsPageQueryStringObjectBuilder } from "../modules/Submission/helpers/ProblemSubmissionsPageQueryStringObjectBuilder";

export const ProblemSubmissionsPage: FC = () => {
  const params = useParams<{ problemId: string }>();
  const problemId = params.problemId!;

  const navigate = useNavigate();

  const currentQueryString = useCurrentQueryString();
  const qsObjectBuilder = new ProblemSubmissionsPageQueryStringObjectBuilder(
    currentQueryString,
    problemId
  );

  const { isLoading, result } = useGetProblemRequest(problemId);
  if (isLoading || !result) {
    return <p> Loading problem... </p>;
  }

  return (
    <>
      <Typography variant="h5">
        Submissions to{" "}
        <Link href={ROUTES.USER_PROBLEM_ROUTE.generatePath({ problemId })}>
          {result.name}
        </Link>
      </Typography>
      <SubmissionsContextProvider
        qsObjectBuilder={qsObjectBuilder}
        onQsObjectChange={(qsObject) =>
          navigate(
            ROUTES.PROBLEM_SUBMISSIONS_ROUTE.generatePath(
              { problemId },
              qsObject
            )
          )
        }
      >
        <ProblemSubmissionsPageContent />
      </SubmissionsContextProvider>
    </>
  );
};
