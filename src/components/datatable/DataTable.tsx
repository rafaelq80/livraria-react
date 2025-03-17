import { useState } from 'react'
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable} from '@tanstack/react-table'
import { DataTableHeader } from './DataTableHeader'
import { DataTableDesktopView } from './DataTableDesktopView'
import { DataTableMobileView } from './DataTableMobileView'
import { DataTablePagination } from './DataTablePagination'

// Updated type definition to be more flexible
export interface DataTableProps<TData = unknown> {
  data: TData[]
  columns: ColumnDef<TData>[]
  title?: string
  onAddNew?: () => void
  columnSpans?: string[]
  pageSize?: number
}

function DataTable<TData = unknown>({
  data,
  columns,
  title = 'Dados',
  onAddNew,
  columnSpans,
  pageSize = 5
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  return (
    <div className="p-2 md:p-4 space-y-4">
      <DataTableHeader
        title={title}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        onAddNew={onAddNew}
      />
      <div className="border-none rounded-lg overflow-hidden">
        <DataTableDesktopView
          table={table}
          columns={columns}
          columnSpans={columnSpans}
        />
        <DataTableMobileView
          table={table}
          columns={columns}
        />
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}

export default DataTable