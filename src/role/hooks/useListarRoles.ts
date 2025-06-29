import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { listar, ensureArrayResponse } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { useAuth } from "../../shared/store/AuthStore"
import Role from "../models/Role"

export const useListarRoles = () => {
	const navigate = useNavigate()
	const [roles, setRoles] = useState<Role[]>([])
	const { isAdmin, handleLogout } = useAuth()

	const [isLoading, setIsLoading] = useState(true)
	const [showButton, setShowButton] = useState(false)
	
	const buscarRoles = async () => {
		setIsLoading(true)
		try {
			const resposta = await listar<Role[]>("/roles")
			setRoles(ensureArrayResponse<Role>(resposta))
		} catch (error) {
			ErrorHandlerService.handleError(error, { handleLogout })
			setRoles([]) // Garante que roles seja um array vazio em caso de erro
		} finally {
			setIsLoading(false)
		}
	}

	const recarregarRoles = useCallback(() => {
        buscarRoles();
    }, [buscarRoles]);

	useEffect(() => {
		buscarRoles()
	}, [])

	useEffect(() => {
		setShowButton(roles.length === 0)
	}, [roles])

	return {
		roles,
		isLoading,
		isAdmin,
		showButton,
		navigate,
		buscarRoles,
		recarregarRoles
	}
}
