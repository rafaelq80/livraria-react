import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Produto from "../models/Produto"
import { listar, ensureArrayResponse } from "../../services/AxiosService"
import { useAuth } from "../../shared/store/AuthStore"
import { ErrorHandlerService } from "../../shared/handlers/ErrorHandlerService"
import messages from '../../shared/constants/messages';

export const useListarProdutos = () => {

    const navigate = useNavigate();

    const { isAdmin } = useAuth()

    const [produtos, setProdutos] = useState<Produto[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const buscarProdutos = async () => {
        setIsLoading(true)
        try {
            const resposta = await listar<Produto[]>("/produtos")
            setProdutos(ensureArrayResponse<Produto>(resposta))
        } catch (error: unknown) {
            ErrorHandlerService.handleError(error, {
                errorMessage: messages.produto.loadError
            })
            setProdutos([]) // Garante que produtos seja um array vazio em caso de erro
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        buscarProdutos()
    }, [])


    return {
        produtos,
        isLoading,
        buscarProdutos,
        navigate,
        isAdmin,
    }
}