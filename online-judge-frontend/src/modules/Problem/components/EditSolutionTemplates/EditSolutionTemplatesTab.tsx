import { FC } from "react";
import { EditSolutionTemplatesContextProvider } from "../../contexts/EditSolutionTemplatesContext/EditSolutionTemplatesContextProvider";
import { EditSolutionTemplatesTabContent } from "./EditSolutionTemplatesTabContent";

export const EditSolutionTemplatesTab: FC<{ problemId: string }> = ({
  problemId,
}) => {
  return (
    <EditSolutionTemplatesContextProvider problemId={problemId}>
      <EditSolutionTemplatesTabContent />
    </EditSolutionTemplatesContextProvider>
  );
};
