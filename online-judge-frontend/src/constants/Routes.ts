import { Route } from "../lib/route/Route";

export const ROUTES = {
  HOME: new Route<{}, {}>("/"),
  SIGN_IN_ROUTE: new Route<{}, {}>("/sign-in"),

  USER_PROBLEMS_ROUTE: new Route<{}, {}>("/problems"),
  USER_PROBLEM_ROUTE: new Route<{ problemId: string }, {}>(
    "/problems/:problemId"
  ),

  ADMIN_PROBLEMS_ROUTE: new Route<{}, {}>("/admin/problems"),

  NEW_PROBLEM_ROUTE: new Route<{}, {}>("/admin/problems/new"),
  EDIT_PROBLEM_ROUTE: new Route<{ problemId: string }, {}>(
    "/admin/problems/:problemId/edit"
  ),
  SUBMISSIONS_ROUTE: new Route<{}, {}>("/submissions"),
  SUBMISSION_ROUTE: new Route<{ submissionId: string }, {}>(
    "/submissions/:submissionId"
  ),
  PROBLEM_SUBMISSIONS_ROUTE: new Route<{ problemId: string }, {}>(
    "/problems/:problemId/submissions"
  ),
  USER_SUBMISSIONS_ROUTE: new Route<{ userId: string }, {}>(
    "/users/:userId/submissions"
  ),
  USER_PROFILE_ROUTE: new Route<{ userId: string }, {}>("/users/:userId"),
};
