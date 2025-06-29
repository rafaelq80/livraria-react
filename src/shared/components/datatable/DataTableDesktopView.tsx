import {
  flexRender,
  ColumnDef,
  Table
} from '@tanstack/react-table'
import Button from '../ui/Button'

/**
 * Interface que define as propriedades da visualização desktop da tabela
 */
export interface DataTableDesktopViewProps<TData = unknown> {
  /** Instância da tabela do TanStack Table */
  table: Table<TData>
  /** Definições das colunas da tabela */
  columns: ColumnDef<TData>[]
  /** Array de spans para colunas específicas (usado para layout responsivo) */
  columnSpans?: string[]
}

/**
 * Retorna o ícone de ordenação baseado no estado atual da coluna
 * @param isSorted Estado de ordenação da coluna
 * @returns String contendo o ícone de ordenação
 */
function getSortIcon(isSorted: false | 'asc' | 'desc'): string {
  if (isSorted === 'asc') return ' ▲'
  if (isSorted === 'desc') return ' ▼'
  return ''
}

/**
 * Componente de visualização desktop da tabela de dados com funcionalidades de:
 * - Layout em grid responsivo
 * - Ordenação de colunas com indicadores visuais
 * - Spans customizáveis para colunas
 * - Renderização flexível de células
 * - Estilização consistente
 */
export function DataTableDesktopView<TData = unknown>({
  table,
  columns,
  columnSpans
}: Readonly<DataTableDesktopViewProps<TData>>) {
  // Define spans padrão para todas as colunas se não fornecidos
  const defaultColumnSpans = columns.map(() => 'col-span-1')
  const effectiveColumnSpans = columnSpans || defaultColumnSpans
  
  return (
    <div className="hidden md:block">
      {/* Cabeçalho da Tabela */}
      <div className="grid grid-cols-12 bg-indigo-500 font-bold text-gray-50 text-base text-center uppercase tracking-wider">
        {table.getHeaderGroups().map((headerGroup) => (
          headerGroup.headers.map((header, index) => (
            // Renderiza cabeçalho clicável se a coluna for ordenável
            header.column.getCanSort() ? (
              <Button
                key={header.id}
                variant="ghost"
                size="sm"
                className={`w-full py-3 ${effectiveColumnSpans[index] || 'col-span-1'} cursor-pointer overflow-hidden text-ellipsis whitespace-normal text-white hover:bg-indigo-600`}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                <span>
                  {getSortIcon(header.column.getIsSorted())}
                </span>
              </Button>
            ) : (
              // Renderiza cabeçalho estático se a coluna não for ordenável
              <div
                key={header.id}
                className={`py-3 ${effectiveColumnSpans[index] || 'col-span-1'} overflow-hidden text-ellipsis whitespace-normal`}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            )
          ))
        ))}
      </div>
      
      {/* Linhas de dados da tabela */}
      <div className="divide-y divide-indigo-500 bg-white">
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-12 text-gray-500 text-base"
          >
            {/* Renderiza cada célula da linha */}
            {row.getVisibleCells().map((cell, index) => (
              <div
                key={cell.id}
                className={`flex items-center justify-center px-3 py-4 ${effectiveColumnSpans[index] || 'col-span-1'} overflow-hidden text-ellipsis whitespace-normal text-center`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}