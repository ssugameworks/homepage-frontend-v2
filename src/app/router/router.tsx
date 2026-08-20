import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/shared/config/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("@/app/layouts/RootLayout").then((m) => ({ Component: m.default })),
    children: [
      {
        index: true,
        lazy: () => import("@/pages/home/ui/HomePage").then((m) => ({ Component: m.default })),
      },
      {
        path: ROUTES.INTRODUCE.slice(1),
        lazy: () =>
          import("@/pages/placeholder/ui/PlaceholderPage").then((m) => ({
            Component: m.default,
          })),
        loader: () => ({ title: "소개" }),
      },
      {
        path: ROUTES.ACTIVITIES.slice(1),
        lazy: () =>
          import("@/pages/activities/ui/ActivitiesPage").then((m) => ({ Component: m.default })),
        loader: () => ({ title: "활동" }),
      },
      {
        path: ROUTES.MEMBERS.slice(1),
        lazy: () =>
          import("@/pages/members/ui/MembersPage").then((m) => ({ Component: m.default })),
      },
      {
        path: ROUTES.CONTACT.slice(1),
        lazy: () =>
          import("@/pages/placeholder/ui/PlaceholderPage").then((m) => ({
            Component: m.default,
          })),
        loader: () => ({ title: "문의" }),
      },
    ],
  },
  {
    path: ROUTES.REGISTER,
    lazy: () => import("@/app/layouts/RegisterLayout").then((m) => ({ Component: m.default })),
    children: [
      {
        index: true,
        lazy: () =>
          import("@/pages/register/ui/RegisterPage").then((m) => ({
            Component: m.default,
          })),
      },
    ],
  },
  {
    path: ROUTES.APPLY_FORM,
    lazy: () => import("@/app/layouts/RegisterLayout").then((m) => ({ Component: m.default })),
    children: [
      {
        index: true,
        lazy: () => import("@/pages/apply/ui/ApplyPage").then((m) => ({ Component: m.default })),
      },
    ],
  },
]);
