import { SkipBack, SkipForward } from '@phosphor-icons/react'
import { Table } from '@tanstack/react-table'

// Updated type definition to be more flexible
export interface DataTablePaginationProps<TData = unknown> {
  table: Table<TData>
}

export function DataTablePagination<TData = unknown>({ 
  table 
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
      <div className="flex items-center gap-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="disabled:opacity-50"
        >
          <SkipBack size={32} className="h-5 w-5" />
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="disabled:opacity-50"
        >
          <SkipForward size={32} className="h-5 w-5" />
        </button>
      </div>
      <span className="text-sm text-gray-500">
        Página {table.getState().pagination.pageIndex + 1} de{' '}
        {table.getPageCount()}
      </span>
    </div>
  )
}