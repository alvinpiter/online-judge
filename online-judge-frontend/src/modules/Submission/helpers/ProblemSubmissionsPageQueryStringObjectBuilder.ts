import { SubmissionsFilter } from "../interfaces";
import { SubmissionsPageQueryStringObjectBuilder } from "./SubmissionsPageQueryStringObjectBuilder";

export class ProblemSubmissionsPageQueryStringObjectBuilder extends SubmissionsPageQueryStringObjectBuilder {
  constructor(queryString: string, private readonly problemId: string) {
    super(queryString);
    this.qsObject["problemId"] = problemId;
  }

  setFilter(filter: SubmissionsFilter) {
    super.setFilter(filter);
    this.qsObject["problemId"] = this.problemId;

    return this;
  }

  build() {
    const result = super.build();
    delete result["problemId"];

    return result;
  }
}
