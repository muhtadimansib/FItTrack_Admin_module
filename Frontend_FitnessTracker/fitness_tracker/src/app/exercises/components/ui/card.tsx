import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div
      className={`rounded-xl bg-white/5 border border-gray-700 shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
