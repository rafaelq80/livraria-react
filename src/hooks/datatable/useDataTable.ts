import { useState } from "react"
import { 
    ColumnDef, 
    getCoreRowModel, 
    getFilteredRowModel, 
    getPaginationRowModel, 
    getSortedRowModel, 
    SortingState, 
    useReactTable 
} from "@tanstack/react-table"

export interface DataTableConfig<T> {
    data: T[]
    columns: ColumnDef<T>[]
    pageSize?: number
}

export const useDataTable = <T,>({ 
    data, 
    columns, 
    pageSize = 5 
}: DataTableConfig<T>) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState("")

    const table = useReactTable({
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

    return {
        table,
        globalFilter,
        setGlobalFilter,
        sorting,
        setSorting
    }
}