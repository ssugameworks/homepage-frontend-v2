import type { ReactNode } from "react";

export function CardGrid({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <ul
      className={["flex list-none gap-4 p-0 lg:grid lg:w-fit lg:grid-cols-3", className ?? ""].join(
        " "
      )}
    >
      {children}
    </ul>
  );
}
