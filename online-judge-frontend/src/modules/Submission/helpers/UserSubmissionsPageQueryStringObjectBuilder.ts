import { SubmissionsFilter } from "../interfaces";
import { SubmissionsPageQueryStringObjectBuilder } from "./SubmissionsPageQueryStringObjectBuilder";

export class UserSubmissionsPageQueryStringObjectBuilder extends SubmissionsPageQueryStringObjectBuilder {
  constructor(queryString: string, private readonly userId: string) {
    super(queryString);
    this.qsObject["userId"] = userId;
  }

  setFilter(filter: SubmissionsFilter) {
    super.setFilter(filter);
    this.qsObject["userId"] = this.userId;

    return this;
  }

  build() {
    const result = super.build();
    delete result["userId"];

    return result;
  }
}
