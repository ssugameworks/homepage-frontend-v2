import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import { ExternalArrowIcon, QnaChevronIcon } from "./icons";

// TODO: FAQ 내용 확정 필요 (Figma memo — 실제 내용으로 채워야 함)
const FAQ_ITEMS = [
  {
    question: "가입 대상은 어떻게 되나요?",
    answer: "답변 내용이 확정되면 채워질 예정이에요.",
  },
  {
    question: "가입 대상은 어떻게 되나요?",
    answer: "답변 내용이 확정되면 채워질 예정이에요.",
  },
  {
    question: "가입 대상은 어떻게 되나요?",
    answer: "답변 내용이 확정되면 채워질 예정이에요.",
  },
];

/**
 * Figma spec (web 1440×600 · mobile 390×499)
 * - 섹션: bg #FAFAFA, padding 150(web) / 24(mobile), content 세로 중앙, gap 32 / 24
 * - main_content/title: gap 8 — "FAQ" body1-500(16) gray-400,
 *   "자주 묻는 질문" heading1-700 (38 · mobile 24) gray-950
 * - main: gap 16, items-end
 * - Home/FAQ: padding 10, gap 24
 *   - "Q": heading2-700 (28 · mobile 20), primary/800 #004BB2
 *   - 질문: subheading-500 (18 · mobile 16), primary-950
 *   - Icon/Qna: 20×20 박스 안에 15×12 셰브론, primary-950
 * - 구분선: 1px gray-200
 * - Button/text 직접 문의하기: gap 4 — 라벨 body1-500(16) primary/700 + 18 아이콘, 밑줄
 * - 인터랙션: 아코디언 한 번에 하나만, 행 어디를 눌러도 열리고 닫힘 (아이콘 한정 ❌)
 */
export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section
      className="flex min-h-[499px] items-center bg-[color:var(--gw-bg-white)] py-12 lg:min-h-[600px] lg:py-0"
      aria-label="자주 묻는 질문"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 lg:gap-8 lg:px-[150px]">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-[16px] text-[color:var(--gw-gray-400)] leading-[1.5]">
            FAQ
          </p>
          <h2 className="font-bold text-[24px] text-[color:var(--gw-gray-950)] leading-[1.5] lg:text-[38px]">
            자주 묻는 질문
          </h2>
        </div>

        <div className="flex flex-col items-end gap-4">
          <ul className="flex w-full flex-col">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `${baseId}-faq-panel-${index}`;
              const buttonId = `${baseId}-faq-button-${index}`;

              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: 질문 확정 전 placeholder가 중복됨
                <li key={index} className="border-[color:var(--gw-gray-200)] border-b">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full cursor-pointer items-center gap-6 border-0 bg-transparent p-2.5 text-left"
                    >
                      <span className="font-bold text-[20px] text-[color:var(--gw-primary-800)] leading-[1.5] lg:text-[28px]">
                        Q
                      </span>
                      <span className="flex flex-1 items-center justify-between">
                        <span className="font-medium text-[16px] text-[color:var(--gw-primary-950)] leading-[1.5] lg:text-[18px]">
                          {item.question}
                        </span>
                        <QnaChevronIcon
                          className={[
                            "shrink-0 text-[color:var(--gw-primary-950)] transition-transform duration-300",
                            isOpen ? "rotate-180" : "",
                          ].join(" ")}
                        />
                      </span>
                    </button>
                  </h3>
                  <section
                    id={panelId}
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="p-2.5 pl-[52px]"
                  >
                    <p className="font-light text-[16px] text-[color:var(--gw-gray-600)] leading-[1.5]">
                      {item.answer}
                    </p>
                  </section>
                </li>
              );
            })}
          </ul>

          <Link
            to={ROUTES.CONTACT}
            className="flex flex-col items-start justify-center gap-1 text-[color:var(--gw-primary-700)]"
          >
            <span className="flex items-center gap-2 font-medium text-[16px] leading-[1.5]">
              직접 문의하기
              <ExternalArrowIcon />
            </span>
            <span aria-hidden="true" className="block h-px w-full bg-current" />
          </Link>
        </div>
      </div>
    </section>
  );
}
