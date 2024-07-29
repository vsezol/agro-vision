import { createBrowserRouter } from "react-router-dom";
import { withGuards } from "../shared/lib";
import { Routes } from "../shared/routes";
import { IsSignIn } from "./guards";
import { Layout } from "./layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      withGuards(
        {
          path: Routes.Rating,
          lazy: () =>
            import("../pages/rating").then((x) => ({ Component: x.default })),
        },
        <IsSignIn to={Routes.Auth} />
      ),
      withGuards(
        {
          path: Routes.Params,
          lazy: () =>
            import("../pages/params").then((x) => ({ Component: x.default })),
        },
        <IsSignIn to={Routes.Auth} />
      ),
      {
        path: Routes.Auth,
        lazy: () =>
          import("../pages/auth").then((x) => ({ Component: x.default })),
      },
      {
        path: Routes.RestoreAccess,
        lazy: () =>
          import("../pages/restore-access").then((x) => ({
            Component: x.default,
          })),
      },
      {
        path: Routes.RestoreAccessSuccess,
        lazy: () =>
          import("../pages/restore-access-success").then((x) => ({
            Component: x.default,
          })),
      },
    ],
  },
]);
