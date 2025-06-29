import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { PatternFormat, PatternFormatProps } from 'react-number-format';

/**
 * Interface que define as propriedades do componente de campo com padrão
 * Estende as propriedades do PatternFormat e adiciona funcionalidades específicas
 */
interface PatternFieldProps<T extends FieldValues> extends Omit<PatternFormatProps, 'format'> {
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
  /** Padrão de formatação (ex: "##.###.###/####-##" para CNPJ) */
  pattern: string;
  /** Texto de placeholder */
  placeholder?: string;
  /** Indica se o campo é obrigatório */
  required?: boolean;
  /** Classes CSS customizadas */
  className?: string;
  /** Texto de ajuda/descrição */
  helperText?: string;
}

/**
 * Componente de campo de entrada com formatação de padrão específico com funcionalidades de:
 * - Formatação automática baseada em padrão (ex: telefone, CPF, CNPJ)
 * - Integração com react-hook-form
 * - Máscara de entrada com caracteres especiais
 * - Validação e mensagens de erro
 * - Suporte a campos obrigatórios
 */
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
      {/* Rótulo do campo */}
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Controller do react-hook-form para integração com formulários */}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <div>
            {/* Campo de entrada com formatação de padrão */}
            <PatternFormat
              getInputRef={ref}
              id={id}
              value={value}
              onValueChange={(val) => onChange(val.value)}
              format={pattern} // Padrão de formatação (ex: "##.###.###/####-##")
              allowEmptyFormatting // Permite formatação mesmo com campo vazio
              mask="_" // Caractere usado para posições vazias
              placeholder={placeholder}
              className={`w-full bg-white border-2 ${
                error ? "border-red-500" : "border-slate-700"
              } rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              {...rest}
            />
            
            {/* Exibe texto de ajuda apenas se não houver erro */}
            {helperText && !error && (
              <p className="text-gray-500 text-xs mt-1">{helperText}</p>
            )}
            
            {/* Exibe mensagem de erro se houver */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        )}
      />
    </div>
  );
};

export default PatternField;