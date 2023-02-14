import { Typography } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { LoadingState } from "../lib/components/LoadingState";
import { SEOTitle } from "../modules/SEO/components/SEOTitle";
import { SubmissionPageContent } from "../modules/Submission/components/SubmissionPageContent";
import { useGetSubmissionWithDetailsRequest } from "../modules/Submission/hooks/useGetSubmissionWithDetailsRequest";

export const SubmissionPage: FC = () => {
  const params = useParams<{ submissionId: string }>();
  const submissionId = params.submissionId!;

  const { isLoading: isLoadingSubmission, result: submissionWithDetails } =
    useGetSubmissionWithDetailsRequest(parseInt(submissionId));

  return (
    <>
      <SEOTitle title={`Submission #${submissionId}`} />
      <Typography variant="h4">Submission #{submissionId}</Typography>

      {isLoadingSubmission && <LoadingState />}

      {submissionWithDetails && (
        <SubmissionPageContent submissionWithDetails={submissionWithDetails} />
      )}
    </>
  );
};
