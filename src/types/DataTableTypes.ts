// types/DataTableTypes.ts
import { ColumnDef, Table } from '@tanstack/react-table'

// Header Component Types
export interface DataTableHeaderProps {
  title: string
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  onAddNew?: () => void
}

// Desktop View Component Types
export interface DataTableDesktopViewProps<TData extends object> {
  table: Table<TData>
  columns: ColumnDef<TData>[]
  columnSpans?: string[]
}

// Mobile View Component Types
export interface DataTableMobileViewProps<TData extends object> {
  table: Table<TData>
  columns: ColumnDef<TData>[]
}

// Pagination Component Types
export interface DataTablePaginationProps<TData extends object> {
  table: Table<TData>
}

// Main Generic DataTable Props
export interface DataTableProps<TData extends object> {
  data: TData[]
  columns: ColumnDef<TData>[]
  title?: string
  onAddNew?: () => void
  columnSpans?: string[]
  pageSize?: number
}

// Optional: Utility Types for Common Table Scenarios
export type SortableColumn<TData extends object> = ColumnDef<TData> & {
  sortable?: boolean
}

export type FilterableColumn<TData extends object> = ColumnDef<TData> & {
  filterable?: boolean
}

export interface TableConfig<TData extends object> {
  initialPageSize?: number
  defaultSorting?: (keyof TData)[]
  enableGlobalFilter?: boolean
  columnVisibility?: Partial<Record<keyof TData, boolean>>
}