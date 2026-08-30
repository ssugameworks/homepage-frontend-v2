import { Body } from "./primitives";
import type { LectureCard } from "./types";

export function LectureCardView({ card }: { card: LectureCard }) {
  return (
    <li className="flex w-37.5 shrink-0 snap-start flex-col lg:w-56.25">
      <img
        src={card.image}
        alt=""
        className="h-21.75 w-37.5 rounded-4xl object-cover lg:h-32.5 lg:w-56.25"
      />
      <div className="px-2.5 py-5">
        <Body text={card.caption} />
      </div>
    </li>
  );
}
