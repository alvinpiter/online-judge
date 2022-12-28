export interface TestCase {
  id: number;
  inputFile: {
    name: string;
    url: string;
  };
  outputFile: {
    name: string;
    url: string;
  };
}
