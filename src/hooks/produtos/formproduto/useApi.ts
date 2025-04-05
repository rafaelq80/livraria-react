import { useCallback, useContext } from "react"
import AuthContext from "../../../contexts/AuthContext"
import { atualizar, cadastrar, listar } from "../../../services/AxiosService"
import { ErrorHandlerService } from "../../../services/ErrorHandlerService"

export function useApi<T>() {

    const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	const fetchData = useCallback(
		async <R = T>(url: string): Promise<R | null> => {
			try {
				return await listar<R>(url, token)
			} catch (error) {
				ErrorHandlerService.handleError(error, { handleLogout })
				return null
			}
		},
		[token, handleLogout]
	)

	const updateData = useCallback(
		async <R = T>(url: string, data: R): Promise<boolean> => {
			try {
				await atualizar<R>(url, data, token)
				return true
			} catch (error) {
				ErrorHandlerService.handleError(error, { handleLogout })
				return false
			}
		},
		[token, handleLogout]
	)

	const createData = useCallback(
		async <R = T>(url: string, data: R): Promise<boolean> => {
			try {
				await cadastrar<R>(url, data, token)
				return true
			} catch (error) {
				ErrorHandlerService.handleError(error, { handleLogout })
				return false
			}
		},
		[token, handleLogout]
	)

	return { fetchData, updateData, createData }
}
