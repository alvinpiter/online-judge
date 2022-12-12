import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { ROUTES } from "./constants/Routes";
import { BackendHealthCheckContextProvider } from "./modules/BackendHealthCheck/contexts/BackendHealthCheckContextProvider";
import { PageWithParameterizedPath } from "./PageWithParameterizedPath";
import { PageWithSimplePath } from "./PageWithSimplePath";

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT.path,
    element: <App />,
    errorElement: <h1> 404! </h1>,
    children: [
      {
        path: ROUTES.EXAMPLE_SIMPLE_ROUTE.path,
        element: <PageWithSimplePath />,
      },
      {
        path: ROUTES.EXAMPLE_PARAMETERIZED_ROUTE.path,
        element: <PageWithParameterizedPath />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BackendHealthCheckContextProvider>
      <RouterProvider router={router} />
    </BackendHealthCheckContextProvider>
  </React.StrictMode>
);
