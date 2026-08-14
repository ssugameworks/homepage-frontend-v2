import type { Executive } from "@/types/executive";

export type ExecutiveRosterCardProps = {
  year: number | string;
  executives: Executive[];
  className?: string;
};
