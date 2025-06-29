import React from "react";
import { ClipLoader } from "react-spinners";

/**
 * Interface que define as propriedades do componente de botão
 * Estende as propriedades padrão do botão HTML e adiciona funcionalidades específicas
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Indica se o botão está em estado de carregamento */
  isLoading?: boolean;
  /** Variante visual do botão */
  variant?: "primary" | "secondary" | "danger" | "success" | "outline" | "ghost";
  /** Tamanho do botão */
  size?: "sm" | "md" | "lg" | "full";
  /** Ícone exibido à esquerda do texto */
  leftIcon?: React.ReactNode;
  /** Ícone exibido à direita do texto */
  rightIcon?: React.ReactNode;
  /** Tamanho do spinner de carregamento */
  loaderSize?: number;
  /** Cor do spinner de carregamento */
  loaderColor?: string;
}

/**
 * Componente de botão reutilizável com funcionalidades de:
 * - Múltiplas variantes visuais (primary, secondary, danger, etc.)
 * - Diferentes tamanhos (sm, md, lg, full)
 * - Estado de carregamento com spinner
 * - Ícones à esquerda e direita
 * - Acessibilidade e foco
 * - Estados desabilitados
 */
const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) => {
  // Estilos de variante
  const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    ghost: "text-indigo-600 hover:bg-indigo-50",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
  };

  // Estilos de tamanho
  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2",
    lg: "px-8 py-3",
    full: "px-8 py-3 w-full",
  };

  return (
    <button
      className={`
        rounded-md font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2
        disabled:bg-gray-400 disabled:cursor-not-allowed
        ${variantStyles[variant]} 
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Container flexível para organizar ícones e texto */}
      <div className="flex items-center justify-center">
        {/* Ícone à esquerda (não exibido durante carregamento) */}
        {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
        
        {/* Conteúdo principal: spinner de carregamento ou texto */}
        {isLoading ? (
          <ClipLoader
          color="#ffffff"
          size={24}
          />
        ) : (
          <span>{children}</span>
        )}
        
        {/* Ícone à direita (não exibido durante carregamento) */}
        {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
      </div>
    </button>
  );
};

export default Button;