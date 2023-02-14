import { Link, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { LoadingState } from "../lib/components/LoadingState";
import { useCurrentQueryString } from "../lib/general/useCurrentQueryString";
import { useGetProblemRequest } from "../modules/Problem/hooks/useGetProblemRequest";
import { SEOTitle } from "../modules/SEO/components/SEOTitle";
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

  const { isLoading: isLoadingProblem, result: problem } =
    useGetProblemRequest(problemId);

  if (isLoadingProblem) {
    return <LoadingState />;
  }

  if (!problem) {
    return null;
  }

  return (
    <>
      <SEOTitle title={`Submissions to ${problem.name}`} />
      <Typography variant="h5">
        Submissions to{" "}
        <Link href={ROUTES.USER_PROBLEM_ROUTE.generatePath({ problemId })}>
          {problem.name}
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
