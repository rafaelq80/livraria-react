import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import { listar } from "../../services/AxiosService"
import { ToastAlerta } from "../../utils/ToastAlerta"
import Usuario from "../../models/Usuario"


export const useListarUsuarios = () => {
    const navigate = useNavigate()
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const [isLoading, setIsLoading] = useState(true)
    const [showButton, setShowButton] = useState(false)

    const buscarUsuarios = async () => {
        setIsLoading(true)
        try {
            await listar("/usuarios/all", setUsuarios, {
                headers: {
                    Authorization: token,
                },
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
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
        buscarUsuarios()
    }, [])

    useEffect(() => {
        setShowButton(usuarios.length === 0)
    }, [usuarios])

    return {
        usuarios,
        isLoading,
        showButton,
        navigate,
        buscarUsuarios
    }
}