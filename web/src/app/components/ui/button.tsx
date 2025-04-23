import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`text-sm px-4 py-2 rounded-md bg-blue-900 text-white font-bold shadow-md transition hover:brightness-90 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
