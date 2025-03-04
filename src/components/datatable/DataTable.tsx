import { MagnifyingGlass, Plus, SkipBack, SkipForward } from "@phosphor-icons/react"
import { flexRender } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import { useDataTable } from "../../hooks/datatable/useDataTable"
import { DataTableProps, getColumnSpan } from "../../types/DataTableTypes"

function DataTable<T>({
	data,
	columns,
	pageSize = 5,
	onAddNew,
	searchPlaceholder = "Pesquisar...",
	addButtonLabel = "Novo Item",
	addButtonIcon,
}: DataTableProps<T>) {
	const navigate = useNavigate()
	const { table, globalFilter, setGlobalFilter } = useDataTable({
		data,
		columns,
		pageSize,
	})

	const handleAddNew = () => {
		if (onAddNew) {
			onAddNew()
		} else {
			// Fallback para navegação padrão se não for fornecido
			navigate("/cadastrar")
		}
	}

	const isActionsColumn = (columnHeader: string | unknown) =>
		typeof columnHeader === "string" && columnHeader.toLowerCase() === "ações"

	return (
		<div className="p-2 md:p-4 space-y-4">
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-2">
				<div className="relative w-full sm:w-64">
					<MagnifyingGlass size={20} className="absolute left-3 top-2 text-gray-500" />
					<input
						placeholder={searchPlaceholder}
						value={globalFilter}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400"
					/>
				</div>
				<button
					onClick={handleAddNew}
					className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-700 px-4 py-2 text-white font-bold rounded-lg min-w-[150px]"
				>
					{addButtonIcon || <Plus size={20} />}
					{addButtonLabel}
				</button>
			</div>

			{/* Table Section */}
			<div className="border rounded-lg overflow-x-auto">
				<div className="hidden md:block">
					<div className="grid grid-cols-auto md:grid-cols-12 bg-indigo-500 font-bold text-white text-sm text-center uppercase tracking-wider">
						{columns.map((column, columnIndex) => (
							<div
								key={column.id}
								className={`py-3 px-2 min-w-[100px] ${getColumnSpan({
									isSmallScreen: false,
									totalColumns: columns.length,
									columnIndex,
									isActionColumn: isActionsColumn(column.header),
								})}`}
							>
								{typeof column.header === "string" ? column.header : ""}
							</div>
						))}
					</div>
					<div className="divide-y divide-indigo-500 bg-white">
						{table.getRowModel().rows.map((row) => (
							<div
								key={row.id}
								className="grid grid-cols-auto md:grid-cols-12 text-gray-500 text-sm"
							>
								{row.getVisibleCells().map((cell, index) => (
									<div
										key={cell.id}
										className={`px-3 py-2 min-w-[100px] ${getColumnSpan({
											isSmallScreen: false,
											totalColumns: columns.length,
											columnIndex: index,
											isActionColumn: isActionsColumn(columns[index].header),
										})} ${
											isActionsColumn(columns[index].header)
												? "justify-center"
												: "justify-start"
										}`}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</div>
								))}
							</div>
						))}
					</div>
				</div>

				{/* Mobile View */}
				<div className="md:hidden bg-white">
					{table.getRowModel().rows.map((row) => (
						<div key={row.id} className="p-4 border-b">
							{row.getVisibleCells().map((cell, index) => {
								const headerText =
									typeof columns[index].header === "string"
										? columns[index].header
										: ""
								if (isActionsColumn(headerText)) {
									return (
										<div
											key={cell.id}
											className="flex justify-center items-center py-2"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</div>
									)
								}
								return (
									<div key={cell.id} className="flex flex-col py-1">
										<span className="font-bold text-gray-500">
											{headerText}
										</span>
										<span className="text-gray-700">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</span>
									</div>
								)
							})}
						</div>
					))}
				</div>
			</div>

			{/* Pagination Section */}
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
				<div className="flex items-center gap-2">
					<button
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className="disabled:opacity-50"
					>
						<SkipBack size={24} />
					</button>
					<button
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className="disabled:opacity-50"
					>
						<SkipForward size={24} />
					</button>
				</div>
				<span className="text-sm text-gray-500">
					Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
				</span>
			</div>
		</div>
	)
}

export default DataTable
