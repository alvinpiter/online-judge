import { Tab, Tabs } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { EditDescriptionTab } from "../modules/Problem/components/EditDescription/EditDescriptionTab";
import { EditSolutionTemplatesTab } from "../modules/Problem/components/EditSolutionTemplates/EditSolutionTemplatesTab";
import { EditTestCasesTab } from "../modules/Problem/components/EditTestCases/EditTestCasesTab";

export const EditProblemPage: FC = () => {
  const params = useParams<{ problemId: string }>();
  const problemId = params.problemId!;

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex);
  };

  return (
    <>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Description" />
        <Tab label="Test Cases" />
        <Tab label="Solution Template" />
      </Tabs>

      {tabIndex === 0 && <EditDescriptionTab problemId={problemId} />}
      {tabIndex === 1 && <EditTestCasesTab problemId={problemId} />}
      {tabIndex === 2 && <EditSolutionTemplatesTab problemId={problemId} />}
    </>
  );
};
