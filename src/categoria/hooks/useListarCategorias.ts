import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { listar, ensureArrayResponse } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { useAuth } from "../../shared/store/AuthStore"
import Categoria from "../models/Categoria"

export const useListarCategorias = () => {
	const navigate = useNavigate()
	const [categorias, setCategorias] = useState<Categoria[]>([])
	const { isAdmin, handleLogout } = useAuth()

	const [isLoading, setIsLoading] = useState(true)

	const buscarCategorias = async () => {
		setIsLoading(true)
		try {
			const resposta = await listar<Categoria[]>("/categorias")
			setCategorias(ensureArrayResponse<Categoria>(resposta))
		} catch (error) {
			ErrorHandlerService.handleError(error, { handleLogout })
			setCategorias([]) // Garante que categorias seja um array vazio em caso de erro
		} finally {
			setIsLoading(false)
		}
	}

	const recarregarCategorias = useCallback(() => {
        buscarCategorias();
    }, [buscarCategorias]);

	useEffect(() => {
		buscarCategorias()
	}, [])

	return {
		categorias,
		isLoading,
		isAdmin,
		navigate,
		buscarCategorias,
		recarregarCategorias
	}
}
