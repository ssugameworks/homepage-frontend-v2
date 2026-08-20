import { tv } from "tailwind-variants";
import type { ExecutiveRosterCardProps } from "./ExecutiveRosterCard.types";

const card = tv({
  base: "flex shrink-0 flex-col items-start gap-4 rounded-2xl bg-white/5 p-6 shadow-[0px_2px_5px_0px_rgba(0,0,0,0.2)] backdrop-blur-sm lg:gap-8 lg:rounded-[32px] lg:p-10",
});

export function ExecutiveRosterCard({ year, executives, className }: ExecutiveRosterCardProps) {
  return (
    <div className={card({ className })}>
      <div className="flex w-full flex-col gap-4">
        <p className="w-full font-bold text-xl text-primary-950 leading-normal lg:text-heading2">
          {year}
        </p>

        <ul className="flex w-full flex-col font-medium text-body1 text-primary-950 leading-normal">
          {executives.map((executive) => (
            <li key={executive.id} className="flex gap-2">
              <span className="w-14 shrink-0 whitespace-nowrap font-bold">
                {executive.role || " "}
              </span>
              <span>
                {executive.department} {executive.studentId} {executive.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
