import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  error,
  required,
  helperText,
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",
  helperClassName = "",
  ...props
}) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        className={`w-full bg-white border-2 ${
          error ? "border-red-500" : "border-slate-700"
        } rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputClassName}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
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

export default InputField;