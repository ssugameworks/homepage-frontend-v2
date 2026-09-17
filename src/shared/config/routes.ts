export const ROUTES = {
  HOME: "/",
  INTRODUCE: "/introduce",
  ACTIVITIES: "/activities",
  MEMBERS: "/members",
  REGISTER: "/register",
  APPLY_FORM: "/apply/:slug",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export function applyFormPath(slug: string) {
  return `/apply/${slug}`;
}
