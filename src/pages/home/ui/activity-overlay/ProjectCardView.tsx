import { Body, Chip, Details } from "./primitives";
import type { ProjectCard } from "./types";

export function ProjectCardView({ card }: { card: ProjectCard }) {
  return (
    <li className="flex w-37.5 shrink-0 snap-start flex-col lg:w-56.25">
      <img
        src={card.image}
        alt=""
        className="h-47.75 w-37.5 rounded-4xl object-cover lg:h-71.5 lg:w-56.25"
      />
      <div className="flex flex-col gap-2.5 rounded-2xl px-2.5 py-5">
        <Chip label={card.chip} />
        <p className="font-bold text-lg text-primary-950 leading-normal lg:typo-heading3">
          {card.name}
        </p>
        {card.details ? <Details details={card.details} /> : null}
        {card.body ? <Body text={card.body} /> : null}
      </div>
    </li>
  );
}
