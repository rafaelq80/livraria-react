import { MagnifyingGlass, Plus } from '@phosphor-icons/react'
import { DataTableHeaderProps } from '../../types/DataTableTypes'

export function DataTableHeader({ 
  title, 
  globalFilter, 
  onGlobalFilterChange, 
  onAddNew 
}: DataTableHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
      <div className="relative w-full sm:w-64">
        <MagnifyingGlass
          size={32}
          className="absolute left-2 top-1.5 h-4 w-4 text-gray-500"
        />
        <input
          placeholder={`Pesquisar ${title}...`}
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          className="w-full pl-8 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
        />
      </div>
      {onAddNew && (
        <button
          onClick={onAddNew}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-700 px-4 py-2 text-white font-bold rounded-xl"
        >
          <Plus size={32} className="h-4 w-4" />
          Adicionar {title}
        </button>
      )}
    </div>
  )
}