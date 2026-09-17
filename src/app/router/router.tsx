import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import RouteErrorPage from "./RouteErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("@/app/layouts/RootLayout").then((m) => ({ Component: m.default })),
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        lazy: () => import("@/pages/home").then((m) => ({ Component: m.default })),
      },
      {
        path: ROUTES.INTRODUCE.slice(1),
        lazy: () => import("@/pages/introduce").then((m) => ({ Component: m.default })),
      },
      {
        path: ROUTES.ACTIVITIES.slice(1),
        lazy: () => import("@/pages/activities").then((m) => ({ Component: m.default })),
        loader: () => ({ title: "활동" }),
      },
      {
        path: ROUTES.MEMBERS.slice(1),
        lazy: () => import("@/pages/members").then((m) => ({ Component: m.default })),
      },
      {
        path: ROUTES.CONTACT.slice(1),
        lazy: () => import("@/pages/placeholder").then((m) => ({ Component: m.default })),
        loader: () => ({ title: "문의" }),
      },
      {
        path: ROUTES.PRIVACY.slice(1),
        lazy: () => import("@/pages/privacy").then((m) => ({ Component: m.default })),
      },
    ],
  },
  {
    path: ROUTES.REGISTER,
    lazy: () => import("@/app/layouts/RegisterLayout").then((m) => ({ Component: m.default })),
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        lazy: () => import("@/pages/register").then((m) => ({ Component: m.default })),
      },
    ],
  },
  {
    path: ROUTES.APPLY_FORM,
    lazy: () => import("@/app/layouts/RegisterLayout").then((m) => ({ Component: m.default })),
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        lazy: () => import("@/pages/apply").then((m) => ({ Component: m.default })),
      },
    ],
  },
]);
