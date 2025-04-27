// useAutorSelector.ts
import { useState, useMemo, useCallback } from "react"
import Autor from "../../models/Autor"

interface UseAutorSelectorProps {
	autoresDisponiveis: Autor[]
	autoresSelecionados: Autor[]
	setAutoresSelecionados: (autores: Autor[]) => void
}

export function useSeletorAutores({
	autoresDisponiveis,
	autoresSelecionados,
	setAutoresSelecionados,
}: UseAutorSelectorProps) {
	const [searchTerm, setSearchTerm] = useState("")
	const [dropdownOpen, setDropdownOpen] = useState(false)

	// Funções para adicionar e remover autores
	const addAuthor = useCallback(
		(autor: Autor) => {
			if (!autoresSelecionados.some((a) => a.id === autor.id)) {
				setAutoresSelecionados([...autoresSelecionados, autor])
			}
			setSearchTerm("")
			setDropdownOpen(false)
		},
		[autoresSelecionados, setAutoresSelecionados]
	)

	const removeAuthor = useCallback(
		(autorId: number) => {
			setAutoresSelecionados(autoresSelecionados.filter((a) => a.id !== autorId))
		},
		[autoresSelecionados, setAutoresSelecionados]
	)

	// Autores filtrados pela busca
	const filteredAuthors = useMemo(() => {
		return autoresDisponiveis
			.filter((a) => !autoresSelecionados.some((sa) => sa.id === a.id))
			.filter((a) => a.nome.toLowerCase().includes(searchTerm.toLowerCase()))
			.slice(0, 10) // Limita para os 10 primeiros resultados para performance
	}, [autoresDisponiveis, autoresSelecionados, searchTerm])

	// Manipulador para mudanças no input de busca
	const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
		// Mostrar o dropdown somente se houver texto digitado
		setDropdownOpen(e.target.value.trim() !== "")
	}, [])

	return {
		searchTerm,
		setSearchTerm,
		dropdownOpen,
		setDropdownOpen,
		filteredAuthors,
		addAuthor,
		removeAuthor,
		handleSearchChange,
	}
}
