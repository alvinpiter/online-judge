import { Tab, Tabs } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { EditProblemDescriptionTab } from "../modules/Problem/components/EditProblem/EditProblemDescriptionTab";
import { EditProblemSolutionTemplateTab } from "../modules/Problem/components/EditProblem/EditProblemSolutionTemplateTab";
import { EditTestCasesTab } from "../modules/Problem/Edit/TestCases/components/EditTestCasesTab";

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

      <EditProblemDescriptionTab
        problemId={problemId}
        isActive={tabIndex === 0}
      />

      {tabIndex === 1 && <EditTestCasesTab problemId={problemId} />}

      <EditProblemSolutionTemplateTab
        problemId={problemId}
        isActive={tabIndex === 2}
      />
    </>
  );
};
