import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import { ROUTES } from "./constants/Routes";
import { NewProblemPage } from "./pages/NewProblemPage";
import { EditProblemPage } from "./pages/EditProblemPage";
import { SignInPage } from "./pages/SignInPage";
import { CurrentUserContextProvider } from "./modules/User/contexts/CurrentUserContext";
import { AuthenticatedAdminPages } from "./pages/AuthenticatedAdminPages";
import { UserProblemsPage } from "./pages/UserProblemsPage";
import { AdminProblemsPage } from "./pages/AdminProblemsPage";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { SnackbarContextProvider } from "./core/Snackbar";
import { render } from "react-dom";
import { UserProblemPage } from "./pages/UserProblemPage";
import { SubmissionsPage } from "./pages/SubmissionsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={ROUTES.HOME.path}
      element={<App />}
      errorElement={<h1> 404! </h1>}
    >
      <Route path={ROUTES.SIGN_IN_ROUTE.path} element={<SignInPage />} />
      <Route
        path={ROUTES.USER_PROBLEMS_ROUTE.path}
        element={<UserProblemsPage />}
      />
      <Route
        path={ROUTES.USER_PROBLEM_ROUTE.path}
        element={<UserProblemPage />}
      />
      <Route
        path={ROUTES.SUBMISSIONS_ROUTE.path}
        element={<SubmissionsPage />}
      />

      <Route element={<AuthenticatedAdminPages />}>
        <Route
          path={ROUTES.ADMIN_PROBLEMS_ROUTE.path}
          element={<AdminProblemsPage />}
        />
        <Route
          path={ROUTES.NEW_PROBLEM_ROUTE.path}
          element={<NewProblemPage />}
        />
        <Route
          path={ROUTES.EDIT_PROBLEM_ROUTE.path}
          element={<EditProblemPage />}
        />
      </Route>

      <Route path={ROUTES.HOME.path} element={<PlaygroundPage />} />
    </Route>
  )
);

/*
Change the way of rendering the root because somehow the WYSIWYG component
doesn't work when using the previous implementation.

Source: https://stackoverflow.com/a/71893128
*/
render(
  <React.StrictMode>
    <SnackbarContextProvider>
      <CurrentUserContextProvider>
        <RouterProvider router={router} />
      </CurrentUserContextProvider>
    </SnackbarContextProvider>
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);
