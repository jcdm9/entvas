import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={`text-sm px-3 py-2 border rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${className}`}
      {...props}
    />
  );
};
