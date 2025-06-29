import {
    flexRender,
    Row,
    Cell,
    ColumnDef,
    Table
  } from '@tanstack/react-table'
  
/**
 * Interface que define as propriedades da visualização mobile da tabela
 */
export interface DataTableMobileViewProps<TData = unknown> {
  /** Instância da tabela do TanStack Table */
  table: Table<TData>
  /** Definições das colunas da tabela */
  columns: ColumnDef<TData>[]
}

/**
 * Componente de visualização mobile da tabela de dados com funcionalidades de:
 * - Layout em cards para dispositivos móveis
 * - Exibição vertical de dados (chave-valor)
 * - Responsividade otimizada para telas pequenas
 * - Renderização flexível de células
 * - Estilização adaptada para mobile
 */
export function DataTableMobileView<TData = unknown>({
  table,
  columns
}: Readonly<DataTableMobileViewProps<TData>>) {
  
  /**
   * Renderiza uma linha da tabela no formato mobile (card)
   * Cada linha é exibida como um card com os dados organizados verticalmente
   */
  const renderMobileRow = (row: Row<TData>) => {
    return (
      <div key={row.id} className="p-4 bg-white shadow-sm rounded-lg mb-2">
        {/* Renderiza cada célula da linha como um par chave-valor */}
        {row.getVisibleCells().map((cell: Cell<TData, unknown>, index: number) => {
          // Extrai o texto do cabeçalho da coluna para usar como rótulo
          const headerText = columns[index] && typeof columns[index].header === 'string'
            ? String(columns[index].header)
            : ''
         
          return (
            <div
              key={cell.id}
              className="flex flex-col py-1"
            >
              {/* Rótulo da coluna (cabeçalho) */}
              <span className="text-xs text-gray-500 mb-1">
                {headerText}
              </span>
              {/* Valor da célula */}
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
      {/* Renderiza todas as linhas da tabela no formato mobile */}
      {table.getRowModel().rows.map(renderMobileRow)}
    </div>
  )
}