export const ROUTES = {
  HOME: "/",
  INTRODUCE: "/introduce",
  ACTIVITIES: "/activities",
  MEMBERS: "/members",
  REGISTER: "/register",
  REGISTER_APPLY: "/register/apply",
  CONTACT: "/contact",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
