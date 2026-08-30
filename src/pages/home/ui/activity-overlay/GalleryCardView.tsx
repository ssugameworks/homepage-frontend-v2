import { Body, Details } from "./primitives";
import type { GalleryCard } from "./types";

export function GalleryCardView({ card }: { card: GalleryCard }) {
  return (
    <li className="flex w-full flex-col overflow-hidden rounded-4xl">
      <div className="flex flex-wrap gap-1">
        {card.images.map((src, index) => (
          <img
            // biome-ignore lint/suspicious/noArrayIndexKey: 더미 데이터가 반복됨
            key={index}
            src={src}
            alt=""
            className="h-30 w-23.75 rounded-4xl object-cover lg:h-47.75 lg:w-37.5"
          />
        ))}
      </div>
      <div className="flex flex-col gap-2.5 rounded-2xl px-2.5 py-5">
        <p className="font-bold text-lg text-primary-950 leading-normal lg:typo-heading3">
          {card.name}
        </p>
        {card.details ? <Details details={card.details} /> : null}
        {card.body ? <Body text={card.body} /> : null}
      </div>
    </li>
  );
}
