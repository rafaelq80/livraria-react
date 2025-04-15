import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Autor from "../../models/Autor"
import { listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { useAuth } from "../../store/AuthStore"

export const useListarAutores = () => {
	const navigate = useNavigate()
	const [autores, setAutores] = useState<Autor[]>([])
	const { usuario, isAdmin, handleLogout } = useAuth()
	const token = usuario.token
	const [isLoading, setIsLoading] = useState(true)

	const buscarAutores = async () => {
		setIsLoading(true)
		try {
			const resposta = await listar<Autor[]>("/autores", token)
			setAutores(resposta)
		} catch (error: unknown) {
			ErrorHandlerService.handleError(error, { handleLogout })
		} finally {
			setIsLoading(false)
		}
	}

	const recarregarAutores = useCallback(() => {
		buscarAutores()
	}, [buscarAutores])

	useEffect(() => {
		buscarAutores()
	}, [])

	return {
		autores,
		isLoading,
		isAdmin,
		navigate,
		buscarAutores,
        recarregarAutores
	}
}
