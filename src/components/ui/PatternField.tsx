import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { PatternFormat, PatternFormatProps } from 'react-number-format';

interface PatternFieldProps<T extends FieldValues> extends Omit<PatternFormatProps, 'format'> {
  id: string;
  name: Path<T>;
  label: string;
  control: Control<T>;
  error?: string;
  pattern: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  helperText?: string;
}

const PatternField = <T extends FieldValues>({
  id,
  name,
  label,
  control,
  error,
  pattern,
  placeholder,
  required = false,
  className = "",
  helperText,
  ...rest
}: PatternFieldProps<T>) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <div>
            <PatternFormat
              getInputRef={ref}
              id={id}
              value={value}
              onValueChange={(val) => onChange(val.value)}
              format={pattern}
              allowEmptyFormatting
              mask="_"
              placeholder={placeholder}
              className={`w-full bg-white border-2 ${
                error ? "border-red-500" : "border-slate-700"
              } rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              {...rest}
            />
            {helperText && !error && (
              <p className="text-gray-500 text-xs mt-1">{helperText}</p>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        )}
      />
    </div>
  );
};

export default PatternField;