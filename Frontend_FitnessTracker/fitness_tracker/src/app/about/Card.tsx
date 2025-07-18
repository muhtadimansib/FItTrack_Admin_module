import React from "react";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-xl border border-slate-700 bg-slate-800/50 text-white shadow-md transition-colors duration-300 hover:border-green-400/50 " +
        className
      }
    >
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"p-6 " + className}>
      {children}
    </div>
  );
}
