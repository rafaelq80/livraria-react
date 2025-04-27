import React, { useState, useEffect } from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  textareaClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
  counterClassName?: string;
  rows?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  error,
  required,
  helperText,
  containerClassName = "",
  labelClassName = "",
  textareaClassName = "",
  errorClassName = "",
  helperClassName = "",
  counterClassName = "",
  rows = 4,
  maxLength,
  showCharacterCount = false,
  value,
  onChange,
  ...props
}) => {
  const [characterCount, setCharacterCount] = useState<number>(
    typeof value === "string" ? value.length : 0
  );

  // Handle controlled component
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
    setCharacterCount(e.target.value.length);
  };

  // Update character count if value changes externally
  useEffect(() => {
    if (typeof value === "string") {
      setCharacterCount(value.length);
    }
  }, [value]);

  const showCounter = maxLength !== undefined || showCharacterCount;

  return (
    <div className={`w-full ${containerClassName}`}>
      <div className="flex justify-between items-center mb-1">
        {label && (
          <label
            htmlFor={id}
            className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        {showCounter && (
          <span 
            className={`text-xs text-gray-500 ${
              maxLength && characterCount > maxLength ? "text-red-500" : ""
            } ${counterClassName}`}
          >
            {characterCount}
            {maxLength ? `/${maxLength}` : ""}
          </span>
        )}
      </div>
      <textarea
        id={id}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        className={`w-full bg-white border-2 ${
          error || (maxLength && characterCount > maxLength) 
            ? "border-red-500" 
            : "border-slate-700"
        } rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${textareaClassName}`}
        aria-invalid={error || (maxLength && characterCount > maxLength) ? "true" : "false"}
        aria-describedby={
          error 
            ? `${id}-error` 
            : helperText 
              ? `${id}-helper` 
              : undefined
        }
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className={`text-red-500 text-sm mt-1 ${errorClassName}`}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${id}-helper`} className={`text-gray-500 text-sm mt-1 ${helperClassName}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextArea;