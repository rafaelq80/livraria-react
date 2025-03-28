import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Usuario from "../../models/Usuario"
import { listar } from "../../services/AxiosService"

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
        } catch (error: unknown) {
            if (typeof error === "string" && error.includes("401")) handleLogout()
        } finally {
            setIsLoading(false)
        }
    }

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