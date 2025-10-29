import React from "react";
import clsx from "clsx";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "active" | "inactive" | "draft";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "active",
  children,
  className,
  ...props
}) => {
  const variants = {
    active: "border border-green-400 text-green-700 bg-green-50",
    inactive: "border border-red-300 text-red-600 bg-red-50",
    draft: "border border-yellow-300 text-yellow-600 bg-yellow-50",
  };

  return (
    <div
      className={clsx(
        "inline-flex items-center rounded-md px-3 py-1 text-sm font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
