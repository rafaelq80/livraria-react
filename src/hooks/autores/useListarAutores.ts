import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Autor from "../../models/Autor"
import { listar } from "../../services/AxiosService"

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