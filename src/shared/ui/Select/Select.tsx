import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { IconSelectChevron } from "@/shared/assets";

/** 커스텀 드롭다운 select. 네이티브 `<select>`가 아니라 role="listbox" 마크업이다. */
export type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  className?: string;
};

const select = tv({
  slots: {
    base: "flex w-full flex-col items-start",
    label: "px-2 py-1 typo-body1 typo-medium text-primary-950",
    trigger: [
      "flex h-12.75 w-full cursor-pointer items-center justify-between rounded-2xl border-2 border-solid border-gray-200 bg-surface-white px-4.25 py-0 text-left outline-none transition-colors duration-150",
      "typo-subheading typo-medium",
      "hover:border-(--color-button-outline)/50 focus:border-(--color-button-outline)",
    ],
    chevron: "relative h-[0.67rem] w-3.25 shrink-0 overflow-clip text-gray-400",
    dropdown: [
      "absolute top-0 left-0 z-30 w-full overflow-hidden rounded-2xl border-2 border-solid border-gray-200 bg-surface-white",
      "shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
    ],
    closeButton: "flex h-12.75 w-full cursor-pointer items-center justify-between px-4.25 py-0",
    optionList:
      "m-0 max-h-[max(6rem,min(19.5rem,calc(100dvh-450px)))] list-none overflow-y-auto p-0",
    option: [
      "flex h-13 w-full cursor-pointer items-center px-4.75 text-left",
      "typo-subheading typo-medium",
      "hover:bg-gray-100 hover:text-primary-950",
    ],
  },
  variants: {
    hasValue: {
      true: { trigger: "text-primary-950" },
      false: { trigger: "text-gray-400" },
    },
    open: {
      true: { trigger: "invisible" },
      false: {},
    },
    selected: {
      true: { option: "bg-gray-100 text-primary-950" },
      false: { option: "bg-white text-gray-400" },
    },
  },
  defaultVariants: {
    hasValue: false,
    open: false,
    selected: false,
  },
});

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "선택해주세요",
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const labelId = useId();

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

  const selectOption = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  const {
    base,
    label: labelClass,
    trigger,
    chevron,
    dropdown,
    closeButton,
    optionList,
  } = select({ hasValue: Boolean(value), open });

  return (
    <div className={base({ className })}>
      <span id={labelId} className={labelClass()}>
        {label}
      </span>

      <div ref={rootRef} className="relative z-20 w-full">
        <button
          type="button"
          aria-labelledby={labelId}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          tabIndex={open ? -1 : undefined}
          aria-hidden={open}
          inert={open}
          onClick={() => setOpen((prev) => !prev)}
          className={trigger()}
        >
          <span>{value || placeholder}</span>
          <span className={chevron()}>
            <IconSelectChevron
              aria-hidden
              className="absolute inset-0 block size-full max-w-none"
            />
          </span>
        </button>

        <AnimatePresence>
          {open ? (
            <motion.div
              id={listId}
              role="listbox"
              aria-labelledby={labelId}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={dropdown()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                aria-label={`${label} 목록 닫기`}
                onClick={() => setOpen(false)}
                className={closeButton()}
              >
                <span className="typo-subheading typo-medium text-gray-400">{label}</span>
                <motion.span
                  aria-hidden
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={chevron()}
                >
                  <IconSelectChevron
                    aria-hidden
                    className="absolute inset-0 block size-full max-w-none"
                  />
                </motion.span>
              </button>

              <ul className={optionList()}>
                {options.map((option) => {
                  const selected = value === option;
                  return (
                    <li key={option} className="border-t border-gray-100">
                      <button
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => selectOption(option)}
                        className={select({ selected }).option()}
                      >
                        {option}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
