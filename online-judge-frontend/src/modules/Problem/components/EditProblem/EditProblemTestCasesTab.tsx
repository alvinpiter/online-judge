import { FC } from "react";
import { EditProblemTabBaseProps } from "./interface";

export const EditProblemTestCasesTab: FC<EditProblemTabBaseProps> = ({
  isActive,
}) => {
  if (!isActive) {
    return null;
  }

  return <h4> Edit problem's test cases </h4>;
};
