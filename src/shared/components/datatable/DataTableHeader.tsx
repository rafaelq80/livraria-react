import { MagnifyingGlassIcon, PlusIcon } from '@phosphor-icons/react'
import { DataTableHeaderProps } from '../../types/DataTableTypes'
import Button from '../ui/Button'

/**
 * Componente de cabeçalho da tabela de dados com funcionalidades de:
 * - Campo de busca global responsivo
 * - Botão para adicionar novos registros
 * - Layout adaptativo (mobile/desktop)
 * - Integração com filtros da tabela
 */
export function DataTableHeader({ 
  title, 
  globalFilter, 
  onGlobalFilterChange, 
  onAddNew 
}: Readonly<DataTableHeaderProps>) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
      {/* Campo de busca global */}
      <div className="relative w-full sm:w-64">
        {/* Ícone de lupa */}
        <MagnifyingGlassIcon
          size={32}
          className="absolute left-2 top-1.5 h-4 w-4 text-gray-500"
        />
        {/* Input de busca */}
        <input
          placeholder={`Pesquisar ${title}...`}
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          className="w-full pl-8 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
        />
      </div>
      
      {/* Botão para adicionar novo registro (exibido apenas se a função for fornecida) */}
      {onAddNew && (
        <Button
          variant="success"
          size="md"
          leftIcon={<PlusIcon size={32} className="h-4 w-4" />}
          onClick={onAddNew}
          className="w-full sm:w-auto"
        >
          Adicionar {title}
        </Button>
      )}
    </div>
  )
}