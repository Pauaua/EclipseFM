import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
}
