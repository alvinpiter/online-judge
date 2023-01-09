import { TestCase } from "../../interfaces";

export interface EditTestCasesContextValue {
  testCases: TestCase[];

  addTestCase: (formData: FormData) => void;
  deleteTestCase: (testCaseId: number) => void;
}
