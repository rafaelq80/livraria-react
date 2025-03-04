import { ReactNode } from "react"

export interface DataTableProps<T> {
    data: T[]
    columns: any[]
    pageSize?: number
    onAddNew?: () => void
    searchPlaceholder?: string
    addButtonLabel?: string
    addButtonIcon?: ReactNode
}

export interface DataTableColumnSpanConfig {
    isSmallScreen: boolean
    totalColumns: number
    columnIndex: number
    isActionColumn?: boolean
}

export const getColumnSpan = ({
    isSmallScreen,
    totalColumns,
    columnIndex,
}: DataTableColumnSpanConfig): string => {
    if (isSmallScreen) return "col-span-12"
       
    // Calcular o número de colunas excluindo a coluna de ações
    const nonActionColumns = totalColumns
    
    // Distribuir as colunas igualmente
    const baseSpan = Math.floor(12 / nonActionColumns)
    const remainingSpan = 12 % nonActionColumns
    
    // Adicionar span extra para as primeiras colunas com resto
    return columnIndex < remainingSpan 
        ? `col-span-${baseSpan + 1}` 
        : `col-span-${baseSpan}`
}