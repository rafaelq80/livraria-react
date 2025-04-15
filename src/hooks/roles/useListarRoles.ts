import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Role from "../../models/Role"
import { listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { useAuth } from "../../store/AuthStore"

export const useListarRoles = () => {
	const navigate = useNavigate()
	const [roles, setRoles] = useState<Role[]>([])
	const { usuario, isAdmin, handleLogout } = useAuth()
	const token = usuario.token
	const [isLoading, setIsLoading] = useState(true)
	const [showButton, setShowButton] = useState(false)
	
	const buscarRoles = async () => {
		setIsLoading(true)
		try {
			const resposta = await listar<Role[]>("/roles",  token)
			setRoles(resposta)
		} catch (error) {
			ErrorHandlerService.handleError(error, {handleLogout});
		} finally {
			setIsLoading(false)
		}
	}

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
	}
}
