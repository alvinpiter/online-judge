import { Route } from "../lib/route/Route";

export const ROUTES = {
  ROOT: new Route<{}, {}>("/"),
  SIGN_IN_ROUTE: new Route<{}, {}>("/sign-in"),

  EXAMPLE_SIMPLE_ROUTE: new Route<{}, {}>("/simple"),
  EXAMPLE_PARAMETERIZED_ROUTE: new Route<
    { firstParameter: string; secondParameter: number },
    { firstQuery: string; secondQuery: number }
  >("/firstParam/:firstParameter/secondParam/:secondParameter"),
};
