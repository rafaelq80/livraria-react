/**
 * Tipos e interfaces para componentes de tabela de dados
 * Centraliza todas as definições de tipos relacionados ao DataTable
 */
import { ColumnDef, Table } from '@tanstack/react-table'

/**
 * Interface para as propriedades do componente de cabeçalho da tabela
 */
export interface DataTableHeaderProps {
  /** Título da tabela exibido no cabeçalho */
  title: string
  /** Valor atual do filtro global */
  globalFilter: string
  /** Função chamada quando o filtro global muda */
  onGlobalFilterChange: (value: string) => void
  /** Função opcional para adicionar novos registros */
  onAddNew?: () => void
}

/**
 * Interface para as propriedades da visualização desktop da tabela
 */
export interface DataTableDesktopViewProps<TData extends object> {
  /** Instância da tabela do TanStack Table */
  table: Table<TData>
  /** Definições das colunas da tabela */
  columns: ColumnDef<TData>[]
  /** Array de spans para colunas específicas (layout responsivo) */
  columnSpans?: string[]
}

/**
 * Interface para as propriedades da visualização mobile da tabela
 */
export interface DataTableMobileViewProps<TData extends object> {
  /** Instância da tabela do TanStack Table */
  table: Table<TData>
  /** Definições das colunas da tabela */
  columns: ColumnDef<TData>[]
}

/**
 * Interface para as propriedades do componente de paginação
 */
export interface DataTablePaginationProps<TData extends object> {
  /** Instância da tabela do TanStack Table */
  table: Table<TData>
}

/**
 * Interface principal para as propriedades do DataTable genérico
 */
export interface DataTableProps<TData extends object> {
  /** Array de dados a serem exibidos na tabela */
  data: TData[]
  /** Definições das colunas da tabela */
  columns: ColumnDef<TData>[]
  /** Título da tabela */
  title?: string
  /** Função chamada ao clicar no botão "Adicionar Novo" */
  onAddNew?: () => void
  /** Array de spans para colunas específicas */
  columnSpans?: string[]
  /** Número de itens por página */
  pageSize?: number
  /** Indica se o usuário é administrador (controla permissões) */
  isAdmin?: boolean
}

/**
 * Tipo utilitário para colunas ordenáveis
 * Estende ColumnDef com propriedade de ordenação opcional
 */
export type SortableColumn<TData extends object> = ColumnDef<TData> & {
  /** Indica se a coluna pode ser ordenada */
  sortable?: boolean
}

/**
 * Tipo utilitário para colunas filtráveis
 * Estende ColumnDef com propriedade de filtro opcional
 */
export type FilterableColumn<TData extends object> = ColumnDef<TData> & {
  /** Indica se a coluna pode ser filtrada */
  filterable?: boolean
}

/**
 * Interface para configuração avançada da tabela
 */
export interface TableConfig<TData extends object> {
  /** Tamanho inicial da página */
  initialPageSize?: number
  /** Ordenação padrão das colunas */
  defaultSorting?: (keyof TData)[]
  /** Habilita filtro global */
  enableGlobalFilter?: boolean
  /** Controle de visibilidade das colunas */
  columnVisibility?: Partial<Record<keyof TData, boolean>>
}