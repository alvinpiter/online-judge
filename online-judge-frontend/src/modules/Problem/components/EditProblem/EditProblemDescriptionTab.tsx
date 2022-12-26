import { FC } from "react";
import { EditProblemTabBaseProps } from "./interface";

export const EditProblemDescriptionTab: FC<EditProblemTabBaseProps> = ({
  isActive,
}) => {
  if (!isActive) {
    return null;
  }

  return <h4> Edit problem's description </h4>;
};
