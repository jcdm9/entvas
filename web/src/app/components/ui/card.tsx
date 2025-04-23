import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`rounded-lg bg-white shadow border border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`text-base ${className}`} {...props}>
      {children}
    </div>
  );
};
