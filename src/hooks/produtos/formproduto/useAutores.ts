import { useState, useEffect, useMemo, useCallback, useContext } from "react"
import Autor from "../../../models/Autor"
import { useApi } from "./useApi"
import { debounce } from "lodash"
import { ErrorHandlerService } from "../../../services/ErrorHandlerService"
import AuthContext from "../../../contexts/AuthContext"

export function useAutores() {
	const [autores, setAutores] = useState<Autor[]>([])
	const [selectedAutores, setSelectedAutores] = useState<Autor[]>([])
	const [selectedAutorToAdd, setSelectedAutorToAdd] = useState<string>("")
	const [selectedAutorToRemove, setSelectedAutorToRemove] = useState<string>("")
	const [filtrarAutor, setFiltrarAutor] = useState<string>("")
	const { handleLogout } = useContext(AuthContext)
	const { fetchData } = useApi<Autor>()

	// Carrega todos os autores ao inicializar
	useEffect(() => {
		const loadAutores = async () => {
			const response = await fetchData("/autores")
			if (response) {
				setAutores(Array.isArray(response) ? response : [])
			}
		}
		loadAutores()
	}, [fetchData])

	// Filtra autores disponíveis com useMemo para melhorar performance
	const availableAutores = useMemo(() => {
		return autores
			.filter((autor) => !selectedAutores.some((selected) => selected.id === autor.id))
			.filter((autor) => autor.nome.toUpperCase().includes(filtrarAutor.toUpperCase()))
	}, [autores, selectedAutores, filtrarAutor])

	// Debounce para o filtro de autor
	const debouncedSetFiltrarAutor = useCallback(
		debounce((value: string) => {
			setFiltrarAutor(value)
		}, 300),
		[]
	)

	const handleFiltrarAutor = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			debouncedSetFiltrarAutor(e.target.value)
		},
		[debouncedSetFiltrarAutor]
	)

	const handleAddAutor = useCallback(async () => {
		if (!selectedAutorToAdd) return

		try {
			const autor = await fetchData(`/autores/${selectedAutorToAdd}`)
			if (autor) {
				setSelectedAutores((prev) => [...prev, autor])
				setSelectedAutorToAdd("")
			}
		} catch (error) {
			ErrorHandlerService.handleError(error, { handleLogout })
		}
	}, [selectedAutorToAdd, fetchData])

	const handleRemoveAutor = useCallback(() => {
		if (!selectedAutorToRemove) return

		setSelectedAutores((prev) =>
			prev.filter((autor) => autor.id.toString() !== selectedAutorToRemove)
		)
		setSelectedAutorToRemove("")
	}, [selectedAutorToRemove])

	const handleSelectAutorToAdd = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedAutorToAdd(e.target.value)
	}, [])

	const handleSelectAutorToRemove = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedAutorToRemove(e.target.value)
	}, [])

	const resetAutores = useCallback(() => {
		setSelectedAutores([])
		setSelectedAutorToAdd("")
		setSelectedAutorToRemove("")
		setFiltrarAutor("")
	}, [])

	return {
		autores,
		availableAutores,
		selectedAutores,
		setSelectedAutores,
		selectedAutorToAdd,
		selectedAutorToRemove,
		filtrarAutor,
		handleFiltrarAutor,
		handleAddAutor,
		handleRemoveAutor,
		handleSelectAutorToAdd,
		handleSelectAutorToRemove,
		resetAutores,
	}
}
