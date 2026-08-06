import { useEffect, useId, useRef, useState } from "react";
import selectChevron from "@/assets/icons/register/select-chevron.svg";
import selectChevronUp from "@/assets/icons/register/select-chevron-up.svg";
import type { RegisterForm } from "../types";
import { MAJOR_OPTIONS } from "../types";
import { TextField } from "@/ui";

type SchoolInfoStepProps = {
  form: RegisterForm;
  onChange: (patch: Partial<RegisterForm>) => void;
};

export function SchoolInfoStep({ form, onChange }: SchoolInfoStepProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const labelId = useId();
  const showStudentId = Boolean(form.major);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectMajor = (major: string) => {
    onChange({
      major,
      school: major === form.major ? form.school : "",
    });
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <p className="typo-body1 typo-medium text-primary-950 md:typo-subheading">
        학교 정보를 알려주세요
      </p>

      <div className="flex w-full flex-col items-start">
        <span
          id={labelId}
          className="px-2 py-1 typo-caption typo-medium text-primary-950 md:typo-body1"
        >
          학과
        </span>

        <div ref={rootRef} className="relative z-20 w-full">
          <button
            type="button"
            id="major"
            aria-labelledby={labelId}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listId}
            tabIndex={open ? -1 : undefined}
            aria-hidden={open}
            inert={open}
            onClick={() => setOpen((prev) => !prev)}
            className={[
              "flex w-full cursor-pointer items-center justify-between bg-surface-white text-left outline-none",
              "h-auto rounded-[0.625rem] border border-solid border-gray-200 px-2 py-1.5",
              "text-[length:var(--font-size-caption)] font-medium leading-[1.5]",
              "md:h-[3.1875rem] md:rounded-2xl md:border-2 md:px-[1.0625rem] md:py-0",
              "md:text-[length:var(--font-size-subheading)]",
              "focus:border-[color:var(--color-button-outline)]",
              !form.major ? "text-gray-400" : "text-primary-950",
              open ? "invisible" : "",
            ].join(" ")}
          >
            <span>{form.major || "학과를 입력해주세요"}</span>
            <span className="relative h-[0.67rem] w-[0.8125rem] shrink-0 overflow-clip">
              <img
                src={selectChevron}
                alt=""
                className="absolute inset-0 block size-full max-w-none"
              />
            </span>
          </button>

          {open ? (
            <div
              id={listId}
              role="listbox"
              aria-labelledby={labelId}
              className="absolute top-0 left-0 z-30 w-full overflow-hidden rounded-[0.625rem] border border-solid border-gray-200 bg-surface-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] md:rounded-2xl md:border-2"
            >
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="학과 목록 닫기"
                onClick={() => setOpen(false)}
                className="flex h-auto w-full cursor-pointer items-center justify-between px-2 py-1.5 md:h-[3.1875rem] md:px-[1.0625rem] md:py-0"
              >
                <span className="text-[length:var(--font-size-caption)] font-medium leading-[1.5] text-gray-400 md:text-[length:var(--font-size-subheading)]">
                  학과
                </span>
                <span className="relative h-[0.67rem] w-[0.8125rem] shrink-0 overflow-clip">
                  <img
                    src={selectChevronUp}
                    alt=""
                    className="absolute inset-0 block size-full max-w-none -scale-y-100"
                  />
                </span>
              </button>

              <ul className="m-0 max-h-[19.5rem] list-none overflow-y-auto p-0">
                {MAJOR_OPTIONS.map((option) => {
                  const selected = form.major === option;
                  return (
                    <li key={option} className="border-t border-gray-100">
                      <button
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => selectMajor(option)}
                        className={[
                          "flex h-auto w-full cursor-pointer items-center px-2 py-1.5 text-left",
                          "text-[length:var(--font-size-caption)] font-medium leading-[1.5]",
                          "md:h-[3.25rem] md:px-[1.1875rem] md:text-[length:var(--font-size-subheading)]",
                          selected
                            ? "bg-gray-100 text-primary-950"
                            : "bg-white text-gray-400",
                          "hover:bg-gray-100 hover:text-primary-950",
                        ].join(" ")}
                      >
                        {option}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {showStudentId ? (
        <TextField
          label="학번"
          name="school"
          placeholder="학번을 입력해주세요"
          value={form.school}
          onChange={(e) => onChange({ school: e.target.value })}
        />
      ) : null}
    </div>
  );
}

export function canProceedSchoolInfo(form: RegisterForm) {
  return Boolean(form.major.trim()) && form.school.trim().length >= 4;
}
