import {
    flexRender,
    Row,
    Cell,
    ColumnDef,
    Table
  } from '@tanstack/react-table'
  
  export interface DataTableMobileViewProps<TData = unknown> {
    table: Table<TData>
    columns: ColumnDef<TData>[]
  }
  
  export function DataTableMobileView<TData = unknown>({
    table,
    columns
  }: DataTableMobileViewProps<TData>) {
    const renderMobileRow = (row: Row<TData>) => {
      return (
        <div key={row.id} className="p-4 bg-white shadow-sm rounded-lg mb-2">
          {row.getVisibleCells().map((cell: Cell<TData, unknown>, index: number) => {
            const headerText = columns[index] && typeof columns[index].header === 'string'
              ? String(columns[index].header)
              : ''
           
            return (
              <div
                key={cell.id}
                className="flex flex-col py-1"
              >
                <span className="text-xs text-gray-500 mb-1">
                  {headerText}
                </span>
                <span className="text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </span>
              </div>
            )
          })}
        </div>
      )
    }
    return (
      <div className="md:hidden">
        {table.getRowModel().rows.map(renderMobileRow)}
      </div>
    )
  }