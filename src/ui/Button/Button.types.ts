import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "primarySolid" | "outline";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;
