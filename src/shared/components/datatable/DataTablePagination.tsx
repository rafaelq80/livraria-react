import { SkipBackIcon, SkipForwardIcon } from '@phosphor-icons/react'
import { Table } from '@tanstack/react-table'
import Button from '../ui/Button'

/**
 * Interface que define as propriedades do componente de paginação
 */
export interface DataTablePaginationProps<TData = unknown> {
  /** Instância da tabela do TanStack Table */
  table: Table<TData>
}

/**
 * Componente de paginação da tabela de dados com funcionalidades de:
 * - Navegação entre páginas (anterior/próxima)
 * - Indicador de página atual e total
 * - Estados desabilitados para botões
 * - Layout responsivo
 * - Integração com TanStack Table
 */
export function DataTablePagination<TData = unknown>({ 
  table 
}: Readonly<DataTablePaginationProps<TData>>) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
      {/* Botões de navegação */}
      <div className="flex items-center gap-2">
        {/* Botão para página anterior */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="disabled:opacity-50"
        >
          <SkipBackIcon size={32} className="h-5 w-5" />
        </Button>
        
        {/* Botão para próxima página */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="disabled:opacity-50"
        >
          <SkipForwardIcon size={32} className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Indicador de página atual e total */}
      <span className="text-sm text-gray-500">
        Página {table.getState().pagination.pageIndex + 1} de{' '}
        {table.getPageCount()}
      </span>
    </div>
  )
}