import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Editora from "../../models/Editora"
import { listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"

export const useListarEditoras = () => {
    const navigate = useNavigate()
    const [editoras, setEditoras] = useState<Editora[]>([])
    const { usuario, isAdmin, handleLogout } = useContext(AuthContext)
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

    useEffect(() => {
        buscarEditoras()
    }, [])

    return {
        editoras,
        isLoading,
        isAdmin,
        navigate,
        buscarEditoras
    }
}