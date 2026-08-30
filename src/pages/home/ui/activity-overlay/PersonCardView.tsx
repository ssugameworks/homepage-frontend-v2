import { Chip, Details } from "./primitives";
import type { PersonCard } from "./types";

export function PersonCardView({ card }: { card: PersonCard }) {
  return (
    <li className="relative h-54.25 w-37.5 shrink-0 snap-start lg:h-81.5 lg:w-56.25">
      <img
        src={card.image}
        alt=""
        className="h-47.75 w-37.5 rounded-4xl object-cover lg:h-71.5 lg:w-56.25"
      />
      <div className="home-overlay-person-text absolute bottom-0 left-0 flex w-37.5 flex-col gap-2.5 rounded-4xl p-5 lg:left-1/2 lg:w-57.25 lg:-translate-x-1/2">
        <Chip label={card.chip} />
        <p className="font-bold text-lg text-primary-950 leading-normal lg:typo-heading3">
          {card.name}
        </p>
        <Details details={card.details} />
      </div>
    </li>
  );
}
