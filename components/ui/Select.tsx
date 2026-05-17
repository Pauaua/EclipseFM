"use client";

import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = "", id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={selectId} className="text-xs font-medium text-[#A89EC0] uppercase tracking-wide">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full px-3 py-2 rounded-lg bg-[rgba(8,4,26,0.6)] border border-[rgba(124,58,237,0.3)] text-white text-sm transition-all duration-200 focus:outline-none focus:border-[#E8D44D] focus:ring-1 focus:ring-[rgba(232,212,77,0.35)] ${error ? "border-red-500/70" : ""} ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#1C1040]">
              {o.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
