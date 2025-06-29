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

/**
 * Interface que define a configuração da tabela de dados
 * Especifica os dados, colunas e configurações de paginação
 */
export interface DataTableConfig<T> {
    /** Array de dados a serem exibidos na tabela */
    data: T[]
    /** Definições das colunas da tabela */
    columns: ColumnDef<T>[]
    /** Número de itens por página (padrão: 5) */
    pageSize?: number
}

/**
 * Hook customizado para gerenciar tabelas de dados com funcionalidades de:
 * - Ordenação de colunas (ascendente/descendente)
 * - Filtro global de busca em todas as colunas
 * - Paginação automática com tamanho configurável
 * - Estado persistente de ordenação e filtros
 * - Integração completa com TanStack Table
 * - Performance otimizada com modelos de dados eficientes
 * 
 * Este hook encapsula toda a lógica de gerenciamento de estado
 * da tabela, fornecendo uma API simples e consistente.
 * 
 * @param config Configuração da tabela com dados, colunas e paginação
 * @returns Objeto com tabela configurada e estados de ordenação/filtro
 */
export const useDataTable = <T,>({ 
    data, 
    columns, 
    pageSize = 5 
}: DataTableConfig<T>) => {
    // Estado para controlar a ordenação das colunas
    // Permite ordenar por múltiplas colunas simultaneamente
    const [sorting, setSorting] = useState<SortingState>([])
    
    // Estado para controlar o filtro global de busca
    // Aplica o filtro em todas as colunas da tabela
    const [globalFilter, setGlobalFilter] = useState("")

    // Configuração da tabela usando TanStack Table
    // Combina todos os modelos de dados para funcionalidade completa
    const table = useReactTable({
        // Dados e estrutura da tabela
        data,
        columns,
        
        // Estados gerenciados pelo hook
        state: {
            sorting,
            globalFilter,
        },
        
        // Handlers para mudanças de estado
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        
        // Modelos de dados para funcionalidades específicas
        getCoreRowModel: getCoreRowModel(),        // Modelo base para renderização
        getSortedRowModel: getSortedRowModel(),    // Modelo para ordenação
        getPaginationRowModel: getPaginationRowModel(), // Modelo para paginação
        getFilteredRowModel: getFilteredRowModel(), // Modelo para filtros
        
        // Configuração inicial da tabela
        initialState: {
            pagination: {
                pageSize,
            },
        },
    })

    // Retorna a tabela configurada e os estados para controle externo
    return {
        table,              // Instância da tabela com todas as funcionalidades
        globalFilter,       // Valor atual do filtro global
        setGlobalFilter,    // Função para atualizar o filtro global
        sorting,            // Estado atual da ordenação
        setSorting          // Função para atualizar a ordenação
    }
}