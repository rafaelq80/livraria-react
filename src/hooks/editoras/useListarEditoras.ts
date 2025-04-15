import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Editora from "../../models/Editora"
import { listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { useAuth } from "../../store/AuthStore"

export const useListarEditoras = () => {
    const navigate = useNavigate()
    const [editoras, setEditoras] = useState<Editora[]>([])
    const { usuario, isAdmin, handleLogout } = useAuth()
    const token = usuario.token
    const [isLoading, setIsLoading] = useState(true)

    const buscarEditoras = async () => {
        setIsLoading(true)
        try {
            const resposta = await listar<Editora[]>("/editoras", token)
            setEditoras(resposta)
        } catch (error) {
            ErrorHandlerService.handleError(error, { handleLogout })
        } finally {
            setIsLoading(false)
        }
    }

    const recarregarEditoras = useCallback(() => {
		buscarEditoras()
	}, [buscarEditoras])

    useEffect(() => {
        buscarEditoras()
    }, [])

    return {
        editoras,
        isLoading,
        isAdmin,
        navigate,
        buscarEditoras,
        recarregarEditoras
    }
}