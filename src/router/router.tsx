import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("@/pages/RootLayout").then((m) => ({ Component: m.default })),
    children: [
      {
        index: true,
        lazy: () => import("@/pages/HomePage").then((m) => ({ Component: m.default })),
      },
      {
        path: ROUTES.INTRODUCE.slice(1),
        lazy: () => import("@/pages/PlaceholderPage").then((m) => ({ Component: m.default })),
        loader: () => ({ title: "소개" }),
      },
      {
        path: ROUTES.ACTIVITIES.slice(1),
        lazy: () => import("@/pages/PlaceholderPage").then((m) => ({ Component: m.default })),
        loader: () => ({ title: "활동" }),
      },
      {
        path: ROUTES.MEMBERS.slice(1),
        lazy: () => import("@/pages/MembersPage").then((m) => ({ Component: m.default })),
      },
      {
        path: ROUTES.JOIN.slice(1),
        lazy: () => import("@/pages/PlaceholderPage").then((m) => ({ Component: m.default })),
        loader: () => ({ title: "가입" }),
      },
      {
        path: ROUTES.CONTACT.slice(1),
        lazy: () => import("@/pages/PlaceholderPage").then((m) => ({ Component: m.default })),
        loader: () => ({ title: "문의" }),
      },
    ],
  },
]);
