"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-[#E8D44D] to-[#F5E878] text-[#0D0825] font-bold hover:opacity-90",
  secondary:
    "bg-transparent border border-[rgba(124,58,237,0.5)] text-purple-bright hover:bg-[rgba(124,58,237,0.1)]",
  danger:
    "bg-transparent border border-red-500/50 text-red-400 hover:bg-red-500/10",
  ghost: "bg-transparent text-gray-light hover:text-white hover:bg-white/5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", loading, className = "", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
        {...props}
      >
        {loading && (
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
