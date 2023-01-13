import { BaseOffsetPaginationQueryStringObjectBuilder } from "../../Pagination/OffsetPaginationQueryStringObjectBuilder";
import { ProgrammingLanguage } from "../../Problem/interfaces";

import {
  SubmissionsFilter,
  SubmissionsOrderOption,
  SubmissionVerdict,
} from "../interfaces";

export class SubmissionsPageQueryStringObjectBuilder extends BaseOffsetPaginationQueryStringObjectBuilder<
  SubmissionsFilter,
  SubmissionsOrderOption
> {
  getFilter(): SubmissionsFilter {
    return {
      problemId: parseInt(this.qsObject["problemId"] as string) || undefined,
      userId: parseInt(this.qsObject["userId"] as string) || undefined,
      programmingLanguage: this.qsObject[
        "programmingLanguage"
      ] as ProgrammingLanguage,
      verdict: this.qsObject["verdict"] as SubmissionVerdict,
    };
  }

  setFilter(filter: SubmissionsFilter) {
    this.qsObject = {
      ...this.qsObject,
      problemId: filter.problemId?.toString(),
      userId: filter.userId?.toString(),
      programmingLanguage: filter.programmingLanguage,
      verdict: filter.verdict,
    };
    return this;
  }

  getOrder(): SubmissionsOrderOption {
    return SubmissionsOrderOption.BY_ID_DESC;
  }
}
