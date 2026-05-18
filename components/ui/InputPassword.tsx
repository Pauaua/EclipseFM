"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";

interface InputPasswordProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-[#A89EC0] uppercase tracking-wide">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={show ? "text" : "password"}
            className={`w-full px-3 py-2 pr-10 rounded-lg bg-[rgba(8,4,26,0.6)] border border-[rgba(124,58,237,0.3)] text-white placeholder-[#7B6FA0] text-sm transition-all duration-200 focus:outline-none focus:border-[#E8D44D] focus:ring-1 focus:ring-[rgba(232,212,77,0.35)] ${error ? "border-red-500/70 focus:border-red-500" : ""} ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShow(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B6FA0] hover:text-[#A89EC0] transition-colors"
            tabIndex={-1}
            aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {show ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
      </div>
    );
  }
);
InputPassword.displayName = "InputPassword";
