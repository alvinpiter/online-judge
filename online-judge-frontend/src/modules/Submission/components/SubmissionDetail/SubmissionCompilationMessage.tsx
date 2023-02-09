import { FC } from "react";
import { SubmissionCompilationDetail } from "../../interfaces";

interface SubmissionCompilationMessageProps {
  compilationDetail: SubmissionCompilationDetail;
}

export const SubmissionCompilationMessage: FC<
  SubmissionCompilationMessageProps
> = ({ compilationDetail }) => {
  return (
    <pre style={{ backgroundColor: "#f1f1f1", padding: 8 }}>
      {compilationDetail.message}
    </pre>
  );
};
