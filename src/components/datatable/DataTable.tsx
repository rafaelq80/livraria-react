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


export interface DataTableProps<TData = unknown> {
  data: TData[]
  columns: ColumnDef<TData>[]
  title?: string
  onAddNew?: () => void
  columnSpans?: string[]
  pageSize?: number
  isAdmin?: boolean
}

function DataTable<TData = unknown>({
  data,
  columns,
  title = 'Dados',
  onAddNew,
  columnSpans,
  pageSize = 5,
  isAdmin = false
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const hasData = data.length > 0
  
  // Só cria a tabela se houver dados
  const table = hasData ? useReactTable<TData>({
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
  }) : null

  // Mostra o cabeçalho somente se houver dados ou usuário é admin
  const showHeader = hasData || isAdmin
  
  // Verifica se deve mostrar o conteúdo da tabela: apenas quando há dados
  const showTableContent = hasData && table

  return (
    <div className="p-2 md:p-4 space-y-4">
      {showHeader && (
        <DataTableHeader
          title={title}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          onAddNew={isAdmin ? onAddNew : undefined}
        />
      )}
      
      {showTableContent ? (
        <>
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
        </>
      ) : (
        // Mensagem para quando não houver registros
        <div className="min-h-[50vh] py-8 text-xl md:text-2xl text-center text-gray-800">
          {isAdmin ? `Não foi encontrado(a) nenhum(a) ${title}!` : 'Você não tem permissão de acesso!'}
        </div>
      )}
    </div>
  )
}

export default DataTable