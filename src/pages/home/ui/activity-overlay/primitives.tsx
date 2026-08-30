/** Figma: chip — button/secondary-mixed 배경 + primary-900 라벨 */
export function Chip({ label }: { label: string }) {
  return (
    <span className="home-btn-secondary flex w-fit items-center gap-2 rounded-2xl px-2 py-1 text-center font-medium text-xs text-primary-800 leading-normal lg:text-base">
      {label}
    </span>
  );
}

export function Details({ details }: { details: string[] }) {
  return (
    <ul className="m-0 list-disc pl-5.25 font-medium text-xs text-primary-950 leading-normal lg:text-sm">
      {details.map((detail) => (
        <li key={detail}>{detail}</li>
      ))}
    </ul>
  );
}

export function Body({ text }: { text: string }) {
  return <p className="font-medium text-xs text-primary-950 leading-normal lg:text-sm">{text}</p>;
}
