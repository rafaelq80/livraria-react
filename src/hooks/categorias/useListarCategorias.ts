import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Categoria from "../../models/Categoria"
import { listar } from "../../services/AxiosService"
import { ToastAlerta } from "../../utils/ToastAlerta"


export const useListarCategorias = () => {
    const navigate = useNavigate()
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const [isLoading, setIsLoading] = useState(true)
    const [showButton, setShowButton] = useState(false)

    const buscarCategorias = async () => {
        setIsLoading(true)
        try {
            await listar("/categorias", setCategorias, {
                headers: {
                    Authorization: token,
                },
            })
        } catch (error: unknown) {
            if (typeof error === "string" && error.includes("401")) handleLogout()
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado", "info")
            navigate("/")
        }
    }, [token, navigate])

    useEffect(() => {
        buscarCategorias()
    }, [])

    useEffect(() => {
        setShowButton(categorias.length === 0)
    }, [categorias])

    return {
        categorias,
        isLoading,
        showButton,
        navigate,
        buscarCategorias
    }
}