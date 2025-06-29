import { PulseLoader } from "react-spinners"

/**
 * Interface que define as propriedades do componente de loading
 */
interface LoadingSpinnerProps {
  /** Cor do spinner (padrão: indigo-900) */
  color?: string
  /** Margem entre os pontos do spinner (padrão: 4px) */
  margin?: number
  /** Tamanho do spinner (padrão: 28px) */
  size?: number
  /** Multiplicador de velocidade da animação (padrão: 1) */
  speedMultiplier?: number
  /** Texto de loading opcional */
  text?: string
  /** Classes CSS customizadas para o container */
  className?: string
  /** Indica se deve centralizar o spinner na tela */
  centerScreen?: boolean
  /** Indica se deve ter overlay de fundo (padrão: true quando centerScreen é true) */
  overlay?: boolean
}

/**
 * Componente de loading spinner centralizado com funcionalidades de:
 * - Animação de pulse usando react-spinners
 * - Configuração flexível de cores, tamanho e velocidade
 * - Texto de loading opcional
 * - Centralização automática na tela
 * - Estilização customizável
 * - Acessibilidade com role e aria-label
 * 
 * Este componente padroniza a exibição de loading em toda a aplicação,
 * garantindo consistência visual e melhor experiência do usuário.
 */
export function LoadingSpinner({
  color = "#312e81", // Indigo-900
  margin = 4,
  size = 28,
  speedMultiplier = 1,
  text,
  className = "",
  centerScreen = false,
  overlay
}: Readonly<LoadingSpinnerProps>) {
  // Determina se deve usar overlay baseado nas props
  const shouldUseOverlay = overlay ?? centerScreen
  
  // Determina as classes do container baseado na prop centerScreen e overlay
  let containerClasses: string
  if (centerScreen) {
    containerClasses = shouldUseOverlay
      ? "fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75 z-50"
      : "absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75 z-10"
  } else {
    containerClasses = "flex flex-col items-center justify-center p-4"
  }

  return (
    <div className={`${containerClasses} ${className}`} aria-live="polite">
      {/* Spinner principal */}
      <PulseLoader
        color={color}
        margin={margin}
        size={size}
        speedMultiplier={speedMultiplier}
        aria-hidden="true"
      />
      
      {/* Texto de loading opcional */}
      {text && (
        <p className="mt-4 text-sm text-gray-600 font-medium">
          {text}
        </p>
      )}
    </div>
  )
}

/**
 * Variante do LoadingSpinner otimizada para carregamento de páginas
 * Centraliza automaticamente na tela com overlay semi-transparente
 */
export function PageLoadingSpinner({ text = "Carregando..." }: Readonly<{ text?: string }>) {
  return (
    <LoadingSpinner
      text={text}
      centerScreen={true}
      overlay={true}
      size={32}
      color="#312e81"
    />
  )
}

/**
 * Variante do LoadingSpinner otimizada para carregamento de componentes
 * Sem centralização na tela, ideal para loading inline
 */
export function InlineLoadingSpinner({ text }: Readonly<{ text?: string }>) {
  return (
    <LoadingSpinner
      text={text}
      centerScreen={false}
      overlay={false}
      size={24}
      color="#312e81"
    />
  )
}

/**
 * Variante do LoadingSpinner otimizada para carregamento dentro de containers
 * Centraliza dentro do componente pai com overlay semi-transparente
 * Ideal para loading de seções específicas sem ocupar a tela toda
 */
export function ContainerLoadingSpinner({ 
  text = "Carregando...",
  overlay = true,
  size = 28,
  color = "#312e81"
}: Readonly<{ 
  text?: string
  overlay?: boolean
  size?: number
  color?: string
}>) {
  return (
    <LoadingSpinner
      text={text}
      centerScreen={true}
      overlay={overlay}
      size={size}
      color={color}
    />
  )
}

/**
 * Variante do LoadingSpinner otimizada para carregamento dentro de containers sem overlay
 * Centraliza dentro do componente pai sem fundo semi-transparente
 * Ideal para loading de seções específicas com transparência
 */
export function TransparentContainerLoadingSpinner({ 
  text = "Carregando...",
  size = 28,
  color = "#312e81"
}: Readonly<{ 
  text?: string
  size?: number
  color?: string
}>) {
  return (
    <ContainerLoadingSpinner
      text={text}
      overlay={false}
      size={size}
      color={color}
    />
  )
}

/**
 * Variante do LoadingSpinner que carrega ESTRITAMENTE dentro do componente pai
 * Usa apenas flex para centralizar, sem posicionamento absolute ou fixed
 * Ideal para loading inline que precisa ser centralizado no container
 */
export function StrictContainerLoadingSpinner({ 
  text = "Carregando...",
  size = 28,
  color = "#312e81",
  className = ""
}: Readonly<{ 
  text?: string
  size?: number
  color?: string
  className?: string
}>) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[100px] ${className}`} aria-live="polite">
      <PulseLoader
        color={color}
        margin={4}
        size={size}
        speedMultiplier={1}
        aria-hidden="true"
      />
      
      {text && (
        <p className="mt-4 text-sm text-gray-600 font-medium">
          {text}
        </p>
      )}
    </div>
  )
} 