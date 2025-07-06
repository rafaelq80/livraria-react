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

/**
 * Interface que define as propriedades do componente de tabela de dados
 */
export interface DataTableProps<TData = unknown> {
  /** Array de dados a serem exibidos na tabela */
  data: TData[]
  /** Definições das colunas da tabela */
  columns: ColumnDef<TData>[]
  /** Título da tabela */
  title?: string
  /** Função chamada ao clicar no botão "Adicionar Novo" */
  onAddNew?: () => void
  /** Array de spans para colunas específicas (usado para layout responsivo) */
  columnSpans?: string[]
  /** Número de itens por página */
  pageSize?: number
  /** Indica se o usuário é administrador (controla permissões) */
  isAdmin?: boolean
  /** Mensagem exibida quando não há dados (para usuários admin) */
  emptyMessage?: string
  /** Mensagem exibida quando usuário não tem permissão */
  forbiddenMessage?: string
}

/**
 * Componente de tabela de dados responsiva com funcionalidades de:
 * - Ordenação de colunas
 * - Filtro global de busca
 * - Paginação
 * - Visualização responsiva (desktop e mobile)
 * - Controle de permissões baseado em admin
 * - Botão para adicionar novos registros
 * - Estados vazios e de carregamento
 */
function DataTable<TData = unknown>({
  data,
  columns,
  title = 'Dados',
  onAddNew,
  columnSpans,
  pageSize = 5,
  isAdmin = false,
  emptyMessage,
  forbiddenMessage = 'Você não tem permissão de acesso!'
}: Readonly<DataTableProps<TData>>) {
  // Estado para controlar a ordenação das colunas
  const [sorting, setSorting] = useState<SortingState>([])
  // Estado para controlar o filtro global de busca
  const [globalFilter, setGlobalFilter] = useState('')

  // Verifica se há dados para exibir
  const hasData = data.length > 0
  
  // Sempre cria a tabela, mas pode estar vazia
  const table = useReactTable<TData>({
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

  // Mostra o cabeçalho somente se houver dados ou usuário é admin
  // Permite que admins vejam o cabeçalho mesmo sem dados para adicionar novos
  const showHeader = hasData || isAdmin
  
  // Verifica se deve mostrar o conteúdo da tabela: apenas quando há dados
  // Garante que a tabela só seja renderizada quando há dados válidos
  const showTableContent = hasData

  return (
    <div className="p-2 md:p-4 space-y-4">
      {/* Cabeçalho da tabela com título, busca e botão de adicionar */}
      {showHeader && (
        <DataTableHeader
          title={title}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          onAddNew={isAdmin ? onAddNew : undefined}
        />
      )}
      
      {/* Conteúdo principal da tabela */}
      {showTableContent ? (
        <>
          {/* Container da tabela com visualizações responsivas */}
          <div className="border-none rounded-lg overflow-hidden">
            {/* Visualização para desktop */}
            <DataTableDesktopView
              table={table}
              columns={columns}
              columnSpans={columnSpans}
            />
            {/* Visualização para mobile */}
            <DataTableMobileView
              table={table}
              columns={columns}
            />
          </div>
          {/* Componente de paginação */}
          <DataTablePagination table={table} />
        </>
      ) : (
        // Mensagem para quando não houver registros
        // Diferencia entre usuário sem permissão e tabela vazia
        <div className="min-h-[50vh] py-8 text-xl md:text-2xl text-center text-gray-800">
          {isAdmin ? (emptyMessage ?? `Não foi encontrado(a) nenhum(a) ${title}!`) : forbiddenMessage}
        </div>
      )}
    </div>
  )
}

export default DataTable