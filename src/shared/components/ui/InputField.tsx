import React from "react";

/**
 * Interface que estende as propriedades padrão do input HTML
 * e adiciona funcionalidades específicas do componente
 */
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** ID único do campo (obrigatório para acessibilidade) */
  id: string;
  /** Texto do rótulo do campo */
  label?: string;
  /** Mensagem de erro a ser exibida */
  error?: string;
  /** Indica se o campo é obrigatório */
  required?: boolean;
  /** Texto de ajuda/descrição do campo */
  helperText?: string;
  /** Classes CSS customizadas para o container */
  containerClassName?: string;
  /** Classes CSS customizadas para o rótulo */
  labelClassName?: string;
  /** Classes CSS customizadas para o input */
  inputClassName?: string;
  /** Classes CSS customizadas para a mensagem de erro */
  errorClassName?: string;
  /** Classes CSS customizadas para o texto de ajuda */
  helperClassName?: string;
}

/**
 * Componente de campo de entrada reutilizável com suporte a:
 * - Rótulos customizáveis
 * - Validação com mensagens de erro
 * - Texto de ajuda
 * - Acessibilidade (ARIA)
 * - Estilização customizada
 */
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
  
  // Determina qual elemento será referenciado pelo aria-describedby
  // Prioriza mensagem de erro sobre texto de ajuda
  let ariaDescribedBy: string | undefined;
  if (error) {
    ariaDescribedBy = `${id}-error`;
  } else if (helperText) {
    ariaDescribedBy = `${id}-helper`;
  }

  return (
    <div className={`w-full ${containerClassName}`}>
      {/* Renderiza o rótulo apenas se fornecido */}
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {/* Campo de entrada principal */}
      <input
        id={id}
        className={`w-full bg-white border-2 ${
          error ? "border-red-500" : "border-slate-700"
        } rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputClassName}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={ariaDescribedBy}
        {...props}
      />
      
      {/* Exibe mensagem de erro se houver */}
      {error && (
        <p id={`${id}-error`} className={`text-red-500 text-sm mt-1 ${errorClassName}`}>
          {error}
        </p>
      )}
      
      {/* Exibe texto de ajuda apenas se não houver erro */}
      {helperText && !error && (
        <p id={`${id}-helper`} className={`text-gray-500 text-sm mt-1 ${helperClassName}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;