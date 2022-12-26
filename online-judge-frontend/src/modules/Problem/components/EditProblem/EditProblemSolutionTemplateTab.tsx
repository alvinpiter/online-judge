import { FC } from "react";
import { EditProblemTabBaseProps } from "./interface";

export const EditProblemSolutionTemplateTab: FC<EditProblemTabBaseProps> = ({
  isActive,
}) => {
  if (!isActive) {
    return null;
  }

  return <h4> Edit problem's solution template </h4>;
};
