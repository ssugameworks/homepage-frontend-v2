import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { cx } from "@/shared/lib";

export type FieldHintState = "default" | "error";

export type FieldHintProps = {
  id?: string;
  state?: FieldHintState;
  children?: ReactNode;
};

export function FieldHint({ id, state = "default", children }: FieldHintProps) {
  return (
    <AnimatePresence>
      {children ? (
        <motion.div
          key="hint"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <motion.p
            id={id}
            initial={{ y: -4 }}
            animate={{ y: 0 }}
            exit={{ y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cx(
              "mt-1 px-2 typo-body2 typo-light",
              state === "error" ? "text-accent-red" : "text-primary-600"
            )}
          >
            {children}
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
