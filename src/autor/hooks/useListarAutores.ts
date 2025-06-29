import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Autor from "../models/Autor"
import { listar, ensureArrayResponse } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { useAuth } from "../../shared/store/AuthStore"

/**
 * Hook para gerenciar a listagem de autores
 */
export const useListarAutores = () => {
	const navigate = useNavigate()
	const [autores, setAutores] = useState<Autor[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const { isAdmin, handleLogout } = useAuth()

	const buscarAutores = useCallback(async () => {
		setIsLoading(true)
		try {
			const resposta = await listar<Autor[]>("/autores")
			setAutores(ensureArrayResponse<Autor>(resposta))
		} catch (error: unknown) {
			ErrorHandlerService.handleError(error, { 
				errorMessage: "Erro ao carregar autores",
				handleLogout 
			})
			setAutores([])
		} finally {
			setIsLoading(false)
		}
	}, [handleLogout])

	const recarregarAutores = useCallback(() => {
		buscarAutores()
	}, [buscarAutores])

	useEffect(() => {
		buscarAutores()
	}, [buscarAutores])

	return {
		autores,
		isLoading,
		isAdmin,
		navigate,
		buscarAutores,
		recarregarAutores
	}
}
