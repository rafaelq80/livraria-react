import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Editora from "../../models/Editora"
import { listar } from "../../services/AxiosService"
import { ToastAlerta } from "../../utils/ToastAlerta"


export const useListarEditoras = () => {
    const navigate = useNavigate()
    const [editoras, setEditoras] = useState<Editora[]>([])
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const [isLoading, setIsLoading] = useState(true)
    const [showButton, setShowButton] = useState(false)

    const buscarEditoras = async () => {
        setIsLoading(true)
        try {
            await listar("/editoras", setEditoras, {
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
        buscarEditoras()
    }, [])

    useEffect(() => {
        setShowButton(editoras.length === 0)
    }, [editoras])

    return {
        editoras,
        isLoading,
        showButton,
        navigate,
        buscarEditoras
    }
}