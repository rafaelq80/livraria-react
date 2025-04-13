import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Categoria from "../../models/Categoria"
import { listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"

export const useListarCategorias = () => {
	const navigate = useNavigate()
	const [categorias, setCategorias] = useState<Categoria[]>([])
	const { usuario, isAdmin, handleLogout } = useContext(AuthContext)
	const token = usuario.token
	const [isLoading, setIsLoading] = useState(true)

	const buscarCategorias = async () => {
		setIsLoading(true)
		try {
			const resposta = await listar<Categoria[]>("/categorias", token)
			setCategorias(resposta)
		} catch (error) {
			ErrorHandlerService.handleError(error, { handleLogout })
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
