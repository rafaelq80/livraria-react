import { useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

/**
 * Interface que define as propriedades do componente de campo de percentual
 * Estende as propriedades do NumericFormat e adiciona funcionalidades específicas
 */
interface PercentFieldProps<T extends FieldValues> extends Omit<NumericFormatProps, 'onChange'> {
  /** ID único do campo */
  id: string;
  /** Nome do campo no formulário (usado pelo react-hook-form) */
  name: Path<T>;
  /** Texto do rótulo do campo */
  label: string;
  /** Controle do react-hook-form */
  control: Control<T>;
  /** Mensagem de erro a ser exibida */
  error?: string;
  /** Indica se o campo é obrigatório */
  required?: boolean;
  /** Classes CSS customizadas */
  className?: string;
  /** Número de casas decimais */
  decimalScale?: number;
  /** Texto de ajuda/descrição */
  helperText?: string;
  /** Função chamada quando o campo recebe foco */
  onFocus?: () => void;
  /** Função chamada quando o campo perde foco */
  onBlur?: () => void;
}

/**
 * Componente de campo de entrada para valores percentuais com funcionalidades de:
 * - Formatação automática de percentual (%)
 * - Integração com react-hook-form
 * - Formatação de separadores (ponto para milhares, vírgula para decimais)
 * - Estado de foco visual
 * - Validação e mensagens de erro
 */
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
  // Estado para controlar o foco visual do campo
  const [isFocused, setIsFocused] = useState(false);

  /**
   * Manipula o evento de foco no campo
   * Ativa o estado de foco e chama a função onFocus se fornecida
   */
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  /**
   * Manipula o evento de perda de foco no campo
   * Desativa o estado de foco e chama a função onBlur se fornecida
   */
  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <div className={className}>
      {/* Rótulo do campo */}
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div>
        {/* Controller do react-hook-form para integração com formulários */}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <NumericFormat
              id={id}
              getInputRef={ref}
              value={value}
              onValueChange={(values) => {
                // Passa o valor numérico diretamente para o react-hook-form
                onChange(values.floatValue);
              }}
              thousandSeparator="." // Separador de milhares (ponto)
              decimalSeparator="," // Separador decimal (vírgula)
              suffix="%" // Sufixo de percentual
              decimalScale={decimalScale}
              fixedDecimalScale // Força sempre o número de casas decimais definido
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
        
        {/* Exibe texto de ajuda apenas se não houver erro */}
        {helperText && !error && (
          <p className="text-gray-500 text-xs mt-1">{helperText}</p>
        )}
        
        {/* Exibe mensagem de erro se houver */}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default PercentField;
