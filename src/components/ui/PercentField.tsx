import { useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface PercentFieldProps<T extends FieldValues> extends Omit<NumericFormatProps, 'onChange'> {
  id: string;
  name: Path<T>;
  label: string;
  control: Control<T>;
  error?: string;
  required?: boolean;
  className?: string;
  decimalScale?: number;
  helperText?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const PercentField = <T extends FieldValues>({
  id,
  name,
  label,
  control,
  error,
  required = false,
  className = "",
  decimalScale = 2,
  helperText,
  onFocus,
  onBlur,
  ...rest
}: PercentFieldProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <NumericFormat
              id={id}
              getInputRef={ref}
              value={value}
              onValueChange={(values) => {
                onChange(values.floatValue);
              }}
              thousandSeparator="."
              decimalSeparator=","
              suffix="%"
              decimalScale={decimalScale}
              fixedDecimalScale
              placeholder="0,00%"
              className={`w-full bg-white border-2 ${
                error ? "border-red-500" : "border-slate-700"
              } rounded p-2 focus:outline-none ${isFocused ? "ring-2 ring-indigo-500 rounded" : ""}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...rest}
            />
          )}
        />
        {helperText && !error && (
          <p className="text-gray-500 text-xs mt-1">{helperText}</p>
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default PercentField;
