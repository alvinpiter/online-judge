import QueryString, { parse } from "qs";
import { ProblemState } from "../../../interfaces";
import {
  AdminProblemsFilter,
  AdminProblemsOrderOption,
} from "../../interfaces";

export class AdminProblemsPageQueryStringObjectBuilder {
  private qsObject: QueryString.ParsedQs;

  constructor(queryString: string) {
    this.qsObject = parse(queryString);
  }

  getPage(): number {
    return parseInt(this.qsObject["page"] as string) || 1;
  }

  setPage(page: number) {
    this.qsObject["page"] = page.toString();
    return this;
  }

  getFilter(): AdminProblemsFilter {
    return {
      state: this.qsObject["state"] as ProblemState,
    };
  }

  setFilter(filter: AdminProblemsFilter) {
    this.qsObject = { ...this.qsObject, state: filter.state };
    return this;
  }

  getOrder(): AdminProblemsOrderOption {
    return this.qsObject["order"]
      ? (this.qsObject["order"] as AdminProblemsOrderOption)
      : AdminProblemsOrderOption.BY_ID_ASC;
  }

  setOrder(order: AdminProblemsOrderOption) {
    this.qsObject["order"] = order;
    return this;
  }

  build() {
    return this.qsObject;
  }
}
