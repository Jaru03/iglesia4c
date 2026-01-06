import React, { forwardRef } from "react";

interface TextareaProps {
  placeholder?: string;
  className?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ placeholder, className, name, value, onChange, rows = 4, required }, ref) => {
    const baseStyles = `
      w-full px-4 py-3 text-base transition-all duration-200
      bg-white border-2 border-gray-200 rounded-xl
      focus:border-primary-3 focus:ring-4 focus:ring-primary-3/10 focus:outline-none
      hover:border-gray-300 hover:shadow-sm resize-none
      placeholder:text-gray-400 placeholder:font-normal
      disabled:bg-gray-50 disabled:cursor-not-allowed
    `;

    return (
      <textarea
        ref={ref}
        placeholder={placeholder}
        className={`${baseStyles} ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;