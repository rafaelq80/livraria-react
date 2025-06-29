/**
 * Módulo de componentes de loading
 * 
 * Este módulo exporta componentes padronizados para exibição
 * de estados de carregamento em toda a aplicação:
 * 
 * - LoadingSpinner: Componente base com configurações flexíveis
 * - PageLoadingSpinner: Variante para carregamento de páginas completas
 * - InlineLoadingSpinner: Variante para carregamento inline de componentes
 * - ContainerLoadingSpinner: Variante para carregamento centralizado dentro de containers
 * - TransparentContainerLoadingSpinner: Variante para carregamento sem overlay dentro de containers
 * - StrictContainerLoadingSpinner: Variante que carrega ESTRITAMENTE dentro do componente pai
 */

export { 
  LoadingSpinner, 
  PageLoadingSpinner, 
  InlineLoadingSpinner,
  ContainerLoadingSpinner,
  TransparentContainerLoadingSpinner,
  StrictContainerLoadingSpinner
} from './LoadingSpinner' 