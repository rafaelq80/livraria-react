import {
  flexRender,
  ColumnDef,
  Table
} from '@tanstack/react-table'

// Updated type definition to be more flexible
export interface DataTableDesktopViewProps<TData = unknown> {
  table: Table<TData>
  columns: ColumnDef<TData>[]
  columnSpans?: string[]
}

export function DataTableDesktopView<TData = unknown>({
  table,
  columns,
  columnSpans
}: DataTableDesktopViewProps<TData>) {
  const defaultColumnSpans = columns.map(() => 'col-span-1')
  const effectiveColumnSpans = columnSpans || defaultColumnSpans
  
  return (
    <div className="hidden md:block">
      {/* Header Row */}
      <div className="grid grid-cols-12 bg-indigo-500 font-bold text-gray-50 text-base text-center uppercase tracking-wider">
        {table.getHeaderGroups().map((headerGroup) => (
          headerGroup.headers.map((header, index) => (
            <div
              key={header.id}
              className={`py-3 ${effectiveColumnSpans[index] || 'col-span-1'} ${
                header.column.getCanSort() ? 'cursor-pointer' : ''
              }`}
              onClick={header.column.getToggleSortingHandler()}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              <span>
                {header.column.getIsSorted() === 'asc' ? ' ▲' : header.column.getIsSorted() === 'desc' ? ' ▼' : ''}
              </span>
            </div>
          ))
        ))}
      </div>
      
      {/* Data Rows */}
      <div className="divide-y divide-indigo-500 bg-white">
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-12 text-gray-500 text-base whitespace-nowrap"
          >
            {row.getVisibleCells().map((cell, index) => (
              <div
                key={cell.id}
                className={`flex items-center justify-center px-3 py-4 ${effectiveColumnSpans[index] || 'col-span-1'}`}
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