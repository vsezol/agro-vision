import { createBrowserRouter } from "react-router-dom";
import { Routes } from "../shared/routes";
import { Layout } from "./layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: Routes.Rating,
        lazy: () =>
          import("../pages/rating").then((x) => ({ Component: x.default })),
      },
      {
        path: Routes.Params,
        lazy: () =>
          import("../pages/params").then((x) => ({ Component: x.default })),
      },
    ],
  },
]);
