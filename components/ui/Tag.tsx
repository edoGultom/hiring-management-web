"use client";

import { TagIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface TagProps {
  label: string;
  variant?: "primary" | "success" | "danger" | "secondary" | "warning";
  tone?: "outline" | "fill" | "soft" | "strong";
  size?: "sm" | "lg";
}

const Tag = ({
  label,
  variant = "success",
  tone = "outline",
  size = "sm",
}: TagProps) => {
  const colors = {
    primary: {
      outline: "border-primary-border text-primary-main bg-transparent",
      fill: "bg-primary-main text-white border-primary-main",
      soft: "bg-primary-surface text-primary-main border-primary-border",
      strong: "bg-primary-hover text-white border-primary-hover",
    },
    success: {
      outline: "border-success-border text-success-main bg-transparent",
      fill: "bg-success-main text-white border-success-main",
      soft: "bg-success-surface text-success-main border-success-border",
      strong: "bg-success-hover text-white border-success-hover",
    },
    danger: {
      outline: "border-danger-border text-danger-main bg-transparent",
      fill: "bg-danger-main text-white border-danger-main",
      soft: "bg-danger-surface text-danger-main border-danger-border",
      strong: "bg-danger-hover text-white border-danger-hover",
    },
    warning: {
      outline: "border-warning-border text-warning-main bg-transparent",
      fill: "bg-warning-main text-white border-warning-main",
      soft: "bg-warning-surface text-warning-main border-warning-border",
      strong: "bg-warning-hover text-white border-warning-hover",
    },
    secondary: {
      outline: "border-secondary-border text-secondary-main bg-transparent",
      fill: "bg-secondary-main text-white border-secondary-main",
      soft: "bg-secondary-surface text-secondary-main border-secondary-border",
      // 🔽 Ubah di sini — text jadi neutral-90
      strong: "bg-secondary-hover text-neutral-90 border-secondary-hover",
    },
  };

  const sizes = {
    sm: "h-[24px] px-2 py-[6px] text-text-s gap-1",
    lg: "h-[28px] px-2 py-[6px] text-text-m gap-1",
  };

  return (
    <div
      className={clsx(
        "flex items-center font-bold border rounded-md transition-colors duration-150 gap-1 px-2 py-[6px]",
        colors[variant][tone],
        sizes[size],
      )}
    >
      <TagIcon
        className={clsx(
          size === "sm" ? "w-[12px] h-[12px]" : "w-[13px] h-[13px]",
          "stroke-[2.5]"
        )}
      />
      {label}
    </div>
  );
};

export default Tag;
