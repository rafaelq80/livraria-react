import React from "react";
import { RotatingLines } from "react-loader-spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "success" | "outline";
  size?: "sm" | "md" | "lg" | "full";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loaderSize?: number;
  loaderColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  loaderSize = 24,
  loaderColor = "white",
  className = "",
  ...props
}) => {
  // Variant styles
  const variantStyles = {
    primary: "bg-indigo-900 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-500 text-white",
    danger: "bg-red-600 hover:bg-red-500 text-white",
    success: "bg-green-600 hover:bg-green-500 text-white",
    outline: "bg-transparent border-2 border-indigo-900 text-indigo-900 hover:bg-indigo-50",
  };

  // Size styles
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
      <div className="flex items-center justify-center">
        {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
        
        {isLoading ? (
          <RotatingLines
            strokeColor={loaderColor}
            strokeWidth="5"
            animationDuration="0.75"
            width={loaderSize.toString()}
            visible={true}
          />
        ) : (
          <span>{children}</span>
        )}
        
        {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
      </div>
    </button>
  );
};

export default Button;