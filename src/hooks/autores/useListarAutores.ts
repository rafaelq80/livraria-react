import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Autor from "../../models/Autor"
import { listar } from "../../services/AxiosService"
import { ToastAlerta } from "../../utils/ToastAlerta"


export const useListarAutores = () => {
    const navigate = useNavigate()
    const [autores, setAutores] = useState<Autor[]>([])
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const [isLoading, setIsLoading] = useState(true)
    const [showButton, setShowButton] = useState(false)

    const buscarAutores = async () => {
        setIsLoading(true)
        try {
            await listar("/autores", setAutores, {
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
        buscarAutores()
    }, [])

    useEffect(() => {
        setShowButton(autores.length === 0)
    }, [autores])

    return {
        autores,
        isLoading,
        showButton,
        navigate,
        buscarAutores
    }
}