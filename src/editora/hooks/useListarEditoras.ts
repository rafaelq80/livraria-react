import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { listar, ensureArrayResponse } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { useAuth } from "../../shared/store/AuthStore"
import Editora from "../models/Editora"

export const useListarEditoras = () => {
    const navigate = useNavigate()
    const [editoras, setEditoras] = useState<Editora[]>([])
    const { isAdmin, handleLogout } = useAuth()

    const [isLoading, setIsLoading] = useState(true)

    const buscarEditoras = async () => {
        setIsLoading(true)
        try {
            const resposta = await listar<Editora[]>("/editoras")
            setEditoras(ensureArrayResponse<Editora>(resposta))
        } catch (error) {
            ErrorHandlerService.handleError(error, { handleLogout })
            setEditoras([]) // Garante que editoras seja um array vazio em caso de erro
        } finally {
            setIsLoading(false)
        }
    }

    const recarregarEditoras = useCallback(() => {
        buscarEditoras();
    }, [buscarEditoras]);

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