// import React from "react";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   className?: string;
//   size?: "icon" | "default";
//   variant?: "default" | "ghost";
// }

// export const Button = ({
//   children,
//   className = "",
//   size = "default",
//   variant = "default",
//   ...props
// }: ButtonProps) => {
//   const base = "inline-flex items-center justify-center font-medium rounded-md transition-all focus:outline-none";
//   const sizeStyles = size === "icon" ? "w-8 h-8" : "px-4 py-2 text-sm";
//   const variantStyles =
//     variant === "ghost"
//       ? "bg-transparent hover:bg-gray-700 text-white"
//       : "bg-blue-600 hover:bg-blue-700 text-white";

//   return (
//     <button className={`${base} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
//       {children}
//     </button>
//   );
// };
























import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: "icon" | "default";
  variant?: "default" | "ghost" | "outline";
}

export const Button = ({
  children,
  className = "",
  size = "default",
  variant = "default",
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md transition-all focus:outline-none";
  const sizeStyles = size === "icon" ? "w-8 h-8" : "px-4 py-2 text-sm";

  let variantStyles = "";

  if (variant === "ghost") {
    variantStyles = "bg-transparent hover:bg-gray-700 text-white";
  } else if (variant === "outline") {
    variantStyles =
      "border border-green-600 text-green-600 hover:bg-green-100";
  } else {
    variantStyles = "bg-blue-600 hover:bg-blue-700 text-white";
  }

  return (
    <button
      className={`${base} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
