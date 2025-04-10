import React from 'react';

export interface Option {
  id: number | string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  options: Option[];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  placeholder = "Selecione uma opção",
  options,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = "",
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full bg-white border-2 appearance-none pr-10 ${
            error ? "border-red-500" : "border-slate-700"
          } rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            disabled ? "bg-gray-100 text-gray-500" : ""
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;