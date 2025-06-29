import { useState, useMemo, useCallback } from "react"

/**
 * Interface que define as propriedades do hook useTagInput
 */
interface UseTagInputProps<T> {
	/** Lista completa de itens disponíveis para seleção */
	itensDisponiveis: T[]
	/** Lista de itens atualmente selecionados */
	itensSelecionados: T[]
	/** Função para atualizar a lista de itens selecionados */
	setItensSelecionados: (itens: T[]) => void
	/** Função para extrair o nome de exibição de um item */
	getNome: (item: T) => string
	/** Função para extrair o ID único de um item */
	getId: (item: T) => number
}

/**
 * Hook customizado que gerencia a lógica de entrada de tags com funcionalidades de:
 * - Busca em tempo real com filtragem
 * - Adição e remoção de itens
 * - Controle de estado do dropdown
 * - Otimização de performance com useMemo e useCallback
 * - Prevenção de duplicatas
 */
export function useTagInput<T extends { id: number }>({
	itensDisponiveis,
	itensSelecionados,
	setItensSelecionados,
	getNome,
	getId,
}: UseTagInputProps<T>) {
	// Estado para o termo de busca atual
	const [searchTerm, setSearchTerm] = useState("")
	// Estado para controlar se o dropdown está aberto
	const [dropdownOpen, setDropdownOpen] = useState(false)

	/**
	 * Adiciona um item à lista de selecionados
	 * Verifica se o item já não está selecionado para evitar duplicatas
	 * Limpa o campo de busca e fecha o dropdown após a adição
	 */
	const addItem = useCallback(
		(item: T) => {
			if (!itensSelecionados.some((a) => getId(a) === getId(item))) {
				setItensSelecionados([...itensSelecionados, item])
			}
			setSearchTerm("")
			setDropdownOpen(false)
		},
		[itensSelecionados, setItensSelecionados, getId]
	)

	/**
	 * Remove um item da lista de selecionados pelo ID
	 * Filtra a lista removendo o item com o ID especificado
	 */
	const removeItem = useCallback(
		(itemId: number) => {
			setItensSelecionados(itensSelecionados.filter((a) => getId(a) !== itemId))
		},
		[itensSelecionados, setItensSelecionados, getId]
	)

	/**
	 * Lista de itens filtrados baseada no termo de busca
	 * Exclui itens já selecionados e limita a 10 resultados para performance
	 */
	const filteredItems = useMemo(() => {
		return itensDisponiveis
			.filter((a) => !itensSelecionados.some((sa) => getId(sa) === getId(a))) // Remove itens já selecionados
			.filter((a) => getNome(a).toLowerCase().includes(searchTerm.toLowerCase())) // Filtra por termo de busca
			.slice(0, 10) // Limita a 10 resultados para melhor performance
	}, [itensDisponiveis, itensSelecionados, searchTerm, getNome, getId])

	/**
	 * Manipula mudanças no campo de busca
	 * Atualiza o termo de busca e controla a abertura do dropdown
	 */
	const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
		setDropdownOpen(e.target.value.trim() !== "")
	}, [])

	return {
		searchTerm,
		setSearchTerm,
		dropdownOpen,
		setDropdownOpen,
		filteredItems,
		addItem,
		removeItem,
		handleSearchChange,
	}
}
