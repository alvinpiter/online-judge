import { Link, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { SubmissionRunDetail } from "../../interfaces";
import { FormattedSubmissionVerdict } from "../FormattedSubmissionVerdict/FormattedSubmissionVerdict";

interface SubmissionRunDetailsItemProps {
  runDetail: SubmissionRunDetail;
}

export const SubmissionRunDetailsTableItem: FC<
  SubmissionRunDetailsItemProps
> = ({ runDetail }) => {
  return (
    <TableRow>
      <TableCell>
        <Link href={runDetail.testCase.inputFile.url}>
          {runDetail.testCase.inputFile.name}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={runDetail.testCase.outputFile.url}>
          {runDetail.testCase.outputFile.name}
        </Link>
      </TableCell>
      <TableCell>
        {runDetail.outputFile ? (
          <Link href={runDetail.outputFile.url}>
            {runDetail.outputFile.name}
          </Link>
        ) : (
          <textarea value={runDetail.output} readOnly />
        )}
      </TableCell>
      {/* <TableCell>{runDetail.runTimeInMilliseconds} ms</TableCell>
      <TableCell>{runDetail.memoryUsageInKilobytes} KB</TableCell> */}
      <TableCell>
        <FormattedSubmissionVerdict verdict={runDetail.verdict} />
      </TableCell>
    </TableRow>
  );
};
