import { Route } from "../lib/route/Route";

export const ROUTES = {
  HOME: new Route<{}, {}>("/"),
  SIGN_IN_ROUTE: new Route<{}, {}>("/sign-in"),

  USER_PROBLEMS_ROUTE: new Route<{}, {}>("/problems"),
  ADMIN_PROBLEMS_ROUTE: new Route<{}, {}>("/admin/problems"),

  NEW_PROBLEM_ROUTE: new Route<{}, {}>("/admin/problems/new"),
  EDIT_PROBLEM_ROUTE: new Route<{ problemId: string }, {}>(
    "/admin/problems/:problemId/edit"
  ),
};
