import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { listar, ensureArrayResponse } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../shared/handlers/ErrorHandlerService"
import { useAuth } from "../../shared/store/AuthStore"
import Usuario from "../models/Usuario"
import messages from '../../shared/constants/messages';

export const useListarUsuarios = () => {
	const navigate = useNavigate()
	const [usuarios, setUsuarios] = useState<Usuario[]>([])
	const { isAdmin, handleLogout } = useAuth()

	const [isLoading, setIsLoading] = useState(true)

	const buscarUsuarios = async () => {
		setIsLoading(true)
		try {
			const resposta = await listar<Usuario[]>("/usuarios/all")
			setUsuarios(ensureArrayResponse<Usuario>(resposta))
		} catch (error) {
			ErrorHandlerService.handleError(error, { 
				errorMessage: messages.usuario.loadError,
				handleLogout 
			})
			setUsuarios([]) // Garante que usuarios seja um array vazio em caso de erro
		} finally {
			setIsLoading(false)
		}
	}

	const recarregarUsuarios = useCallback(() => {
        buscarUsuarios();
    }, [buscarUsuarios]);

	useEffect(() => {
		buscarUsuarios()
	}, [])

	return {
		usuarios,
		isLoading,
		isAdmin,
		navigate,
		buscarUsuarios,
		recarregarUsuarios
	}
}