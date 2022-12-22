import React from "react";
import ReactDOM from "react-dom/client";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={ROUTES.ROOT.path}
      element={<App />}
      errorElement={<h1> 404! </h1>}
    >
      <Route path={ROUTES.SIGN_IN_ROUTE.path} element={<SignInPage />} />
      <Route
        path={ROUTES.USER_PROBLEMS_ROUTE.path}
        element={<UserProblemsPage />}
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
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <CurrentUserContextProvider>
      <RouterProvider router={router} />
    </CurrentUserContextProvider>
  </React.StrictMode>
);
