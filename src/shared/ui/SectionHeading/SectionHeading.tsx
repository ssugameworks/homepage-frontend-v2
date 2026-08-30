export type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
};

/** 여러 페이지가 공유하는 "eyebrow 라벨 + 제목" 섹션 헤더. */
export function SectionHeading({ eyebrow, title, align = "left" }: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-2${align === "center" ? " items-center text-center" : ""}`}
    >
      <p className="font-medium text-base text-gray-400 leading-normal">{eyebrow}</p>
      <h2 className="font-bold text-2xl text-gray-950 leading-normal md:text-3xl lg:typo-heading1">
        {title}
      </h2>
    </div>
  );
}
