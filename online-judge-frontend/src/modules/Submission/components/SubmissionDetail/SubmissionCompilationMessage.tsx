import { FC } from "react";
import { SubmissionCompilationDetail } from "../../interfaces";

interface SubmissionCompilationMessageProps {
  compilationDetail: SubmissionCompilationDetail;
}

export const SubmissionCompilationMessage: FC<
  SubmissionCompilationMessageProps
> = ({ compilationDetail }) => {
  return <pre> {compilationDetail.message} </pre>;
};
