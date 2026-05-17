"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-[#A89EC0] uppercase tracking-wide">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={3}
          className={`w-full px-3 py-2 rounded-lg bg-[rgba(8,4,26,0.6)] border border-[rgba(124,58,237,0.3)] text-white placeholder-[#7B6FA0] text-sm transition-all duration-200 focus:outline-none focus:border-[#E8D44D] focus:ring-1 focus:ring-[rgba(232,212,77,0.35)] resize-none ${error ? "border-red-500/70" : ""} ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
