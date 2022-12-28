import { FC } from "react";
import { EditTestCasesContextProvider } from "../contexts/EditTestCasesContext/EditTestCasesContextProvider";
import { EditTestCasesTabContent } from "./EditTestCasesTabContent";

export const EditTestCasesTab: FC<{ problemId: string }> = ({ problemId }) => {
  return (
    <EditTestCasesContextProvider problemId={problemId}>
      <EditTestCasesTabContent />
    </EditTestCasesContextProvider>
  );
};
