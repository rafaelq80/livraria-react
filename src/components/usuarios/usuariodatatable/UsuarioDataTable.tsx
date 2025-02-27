import {
	MagnifyingGlass,
	Plus,
	SkipBack,
	SkipForward,
  } from '@phosphor-icons/react'
  import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
  } from '@tanstack/react-table'
  import { useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import { createDepartamentoColumns } from './UsuariosColumns'
import Usuario from '../../../models/Usuario'
  
  interface UsuarioDataTableProps {
	usuarios: Usuario[]
  }
  
  function UsuarioDataTable({ usuarios }: UsuarioDataTableProps) {
	const navigate = useNavigate()
	const [sorting, setSorting] = useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = useState('')
	const columns = createDepartamentoColumns()
  
	const table = useReactTable({
	  data: usuarios,
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
		  pageSize: 5,
		},
	  },
	})
  
	const getColumnSpan = (index: number, isSmallScreen: boolean) => {
	  if (isSmallScreen) return 'col-span-12'
	  if (index === 1 || index == 2)  return 'col-span-5'
	  return 'col-span-1'
	}
  
	// Função para verificar se é a coluna de ações
	const isActionsColumn = (columnHeader: string | unknown) => {
	  return typeof columnHeader === 'string' && columnHeader.toLowerCase() === 'ações'
	}
  
	return (
	  <div className="p-2 md:p-4 space-y-4">
		{/* Header Section */}
		<div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
		  <div className="relative w-full sm:w-64">
			<MagnifyingGlass
			  size={32}
			  className="absolute left-2 top-1.5 h-4 w-4 text-gray-500"
			/>
			<input
			  placeholder="Pesquisar usuarios..."
			  value={globalFilter}
			  onChange={(e) => setGlobalFilter(e.target.value)}
			  className="w-full pl-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
			/>
		  </div>
		  <button
			onClick={() => navigate('/cadastrarusuario')}
			className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-800 px-4 py-2 text-white font-bold rounded-xl"
		  >
			<Plus size={32} className="h-4 w-4" />
			Novo Usuario
		  </button>
		</div>
  
		{/* Table Section */}
		<div className="border rounded-lg overflow-hidden">
		  {/* Desktop View */}
		  <div className="hidden md:block">
			<div className="grid grid-cols-12 bg-indigo-500 font-bold text-gray-50 text-base text-center uppercase tracking-wider">
			  {columns.map((column, index) => (
				<div
				  key={column.id}
				  className={`py-3 ${getColumnSpan(index, false)}`}
				>
				  {typeof column.header === 'string' ? column.header : ''}
				</div>
			  ))}
			</div>
			<div className="divide-y divide-indigo-500 bg-white">
			  {table.getRowModel().rows.map((row) => (
				<div
				  key={row.id}
				  className="grid grid-cols-12 text-gray-500 text-base whitespace-nowrap"
				>
				  {row.getVisibleCells().map((cell, index) => (
					<div
					  key={cell.id}
					  className={`flex items-center px-3 py-4 ${getColumnSpan(
						index,
						false
					  )} ${
						index === 0 || index === 2 || index === 3
						  ? 'justify-center'
						  : 'justify-start'
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
		  <div className="md:hidden">
			{table.getRowModel().rows.map((row) => (
			  <div key={row.id} className="p-4 border-b">
				{row.getVisibleCells().map((cell, index) => {
				  const headerText = typeof columns[index].header === 'string' 
					? columns[index].header 
					: ''
				  
				  // Se for a coluna de ações, renderiza apenas os botões centralizados
				  if (isActionsColumn(headerText)) {
					return (
					  <div key={cell.id} className="flex justify-center items-center py-2">
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					  </div>
					)
				  }
  
				  // Para outras colunas, mantém o layout original
				  return (
					<div key={cell.id} className="flex items-center py-2">
					  <span className="font-bold text-gray-500 w-1/3">
						{headerText}
					  </span>
					  <span className="w-2/3">
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					  </span>
					</div>
				  )
				})}
			  </div>
			))}
		  </div>
		</div>
  
		{/* Pagination Section */}
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
	  </div>
	)
  }
  
  export default UsuarioDataTable