import { stringify, parse } from "qs";
import { generatePath } from "react-router-dom";

interface RouteParameters {
  [parameterName: string]: string | number;
}

interface QueryParameters extends RouteParameters {}

export class Route<P extends RouteParameters, Q extends QueryParameters> {
  constructor(public path: string) {}

  generatePath(params?: P, query?: Q): string {
    const path = generatePath(this.path, params as Object | undefined);
    const queryString = query ? stringify(query, { addQueryPrefix: true }) : "";

    return path + queryString;
  }

  parseQueryString(queryString: string): Q {
    return parse(queryString) as Q;
  }
}
