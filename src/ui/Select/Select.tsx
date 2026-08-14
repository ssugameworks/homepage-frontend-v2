import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { IconSelectChevron } from "@/assets/icons";
import { cx } from "@/utils";

export type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  className?: string;
};

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

  return (
    <div className={cx("flex w-full flex-col items-start", className)}>
      <span
        id={labelId}
        className="px-2 py-1 typo-caption typo-medium text-primary-950 md:typo-body1"
      >
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
          className={cx(
            "flex w-full cursor-pointer items-center justify-between bg-surface-white text-left outline-none",
            "h-auto rounded-[0.625rem] border border-solid border-gray-200 px-2 py-1.5 transition-colors duration-150",
            "typo-caption",
            "md:h-12.75 md:rounded-2xl md:border-2 md:px-4.25 md:py-0",
            "md:typo-subheading md:typo-medium",
            "hover:border-(--color-button-outline)/50 focus:border-(--color-button-outline)",
            !value ? "text-gray-400" : "text-primary-950",
            open ? "invisible" : ""
          )}
        >
          <span>{value || placeholder}</span>
          <span className="relative h-[0.67rem] w-3.25 shrink-0 overflow-clip text-gray-400">
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
              className="absolute top-0 left-0 z-30 w-full overflow-hidden rounded-[0.625rem] border border-solid border-gray-200 bg-surface-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] md:rounded-2xl md:border-2"
            >
              <button
                ref={closeButtonRef}
                type="button"
                aria-label={`${label} 목록 닫기`}
                onClick={() => setOpen(false)}
                className="flex h-auto w-full cursor-pointer items-center justify-between px-2 py-1.5 md:h-12.75 md:px-4.25 md:py-0"
              >
                <span className="typo-caption text-gray-400 md:typo-subheading md:typo-medium">
                  {label}
                </span>
                <motion.span
                  aria-hidden
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative h-[0.67rem] w-3.25 shrink-0 overflow-clip text-gray-400"
                >
                  <IconSelectChevron
                    aria-hidden
                    className="absolute inset-0 block size-full max-w-none"
                  />
                </motion.span>
              </button>

              <ul className="m-0 max-h-78 list-none overflow-y-auto p-0">
                {options.map((option) => {
                  const selected = value === option;
                  return (
                    <li key={option} className="border-t border-gray-100">
                      <button
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => selectOption(option)}
                        className={cx(
                          "flex h-auto w-full cursor-pointer items-center px-2 py-1.5 text-left",
                          "typo-caption",
                          "md:h-13 md:px-4.75 md:typo-subheading md:typo-medium",
                          selected ? "bg-gray-100 text-primary-950" : "bg-white text-gray-400",
                          "hover:bg-gray-100 hover:text-primary-950"
                        )}
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
