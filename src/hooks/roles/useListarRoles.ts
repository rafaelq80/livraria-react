import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Role from "../../models/Role"
import { listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"

export const useListarRoles = () => {
	const navigate = useNavigate()
	const [roles, setRoles] = useState<Role[]>([])
	const { usuario, isAdmin, handleLogout } = useContext(AuthContext)
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
