import { Typography } from "@mui/material";
import { FC } from "react";
import { SubmissionVerdict } from "../../interfaces";

const VERDICT_COLOR_MAP: Record<SubmissionVerdict, string> = {
  COMPILE_ERROR: "#d9822b",
  RUN_TIME_ERROR: "#d9822b",
  TIME_LIMIT_EXCEEDED: "#d9822b",
  WRONG_ANSWER: "#db3737",
  ACCEPTED: "#0f9960",
};

const HUMANIZED_VERDICT_MAP: Record<SubmissionVerdict, string> = {
  COMPILE_ERROR: "Compile Error",
  RUN_TIME_ERROR: "Run Time Error",
  TIME_LIMIT_EXCEEDED: "Time Limit Exceeded",
  WRONG_ANSWER: "Wrong Answer",
  ACCEPTED: "Accepted",
};

interface FormattedSubmissionVerdictProps {
  verdict: SubmissionVerdict;
}

export const FormattedSubmissionVerdict: FC<
  FormattedSubmissionVerdictProps
> = ({ verdict }) => {
  return (
    <Typography
      variant="body2"
      fontWeight="bold"
      color={VERDICT_COLOR_MAP[verdict]}
    >
      {HUMANIZED_VERDICT_MAP[verdict]}
    </Typography>
  );
};
