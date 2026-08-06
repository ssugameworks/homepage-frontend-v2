export const ROUTES = {
  HOME: "/",
  INTRODUCE: "/introduce",
  ACTIVITIES: "/activities",
  MEMBERS: "/members",
  JOIN: "/join",
  CONTACT: "/contact",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
