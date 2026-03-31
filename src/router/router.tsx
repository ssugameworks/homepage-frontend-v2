import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    lazy: () => import("@/pages/HomePage").then((m) => ({ Component: m.default })),
  },
]);
