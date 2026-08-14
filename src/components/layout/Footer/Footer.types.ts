import type { FC, SVGProps } from "react";

export type SocialLink = {
  name: string;
  href: string;
  icon: FC<SVGProps<SVGSVGElement>>;
};
