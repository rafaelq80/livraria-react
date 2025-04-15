import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Produto from "../../models/Produto"
import { listar } from "../../services/AxiosService"
import { useAuth } from "../../store/AuthStore"
import { ToastAlerta } from "../../utils/ToastAlerta"


export const useListarProdutos = () => {

    const navigate = useNavigate();

    const { isAdmin } = useAuth()

    const [produtos, setProdutos] = useState<Produto[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const buscarProdutos = async () => {
        setIsLoading(true)
        try {
            const resposta = await listar<Produto[]>("/produtos")
            setProdutos(resposta)
        } catch (error: unknown) {
            console.error("Erro: ", error)
           ToastAlerta("Erro ao Listar Produtos", 'error')
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