import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
  className?: string;
}

export const Badge = ({ children, variant = "default", className = "", ...props }: BadgeProps) => {
  const base = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium";
  const styles =
    variant === "default"
      ? "bg-gray-700 text-white"
      : "border border-gray-600 text-gray-300";

  return (
    <span className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </span>
  );
};
