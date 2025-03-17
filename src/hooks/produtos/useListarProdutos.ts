import { useEffect, useState } from "react"
import Produto from "../../models/Produto"
import { listarProdutos } from "../../services/AxiosService"
import { ToastAlerta } from "../../utils/ToastAlerta"


export const useListarProdutos = () => {

    const [produtos, setProdutos] = useState<Produto[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const buscarProdutos = async () => {
        setIsLoading(true)
        try {
            await listarProdutos("/produtos", setProdutos)
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
        buscarProdutos
    }
}