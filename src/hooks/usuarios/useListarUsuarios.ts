import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Usuario from "../../models/Usuario"
import { listar } from "../../services/AxiosService"

export const useListarUsuarios = () => {
    const navigate = useNavigate()
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const { usuario, isAdmin, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const [isLoading, setIsLoading] = useState(true)

    const buscarUsuarios = async () => {
        setIsLoading(true)
        try {
            const resposta = await listar<Usuario[]>("/usuarios/all", token)
            setUsuarios(resposta)
        } catch (error: unknown) {
            if (typeof error === "string" && error.includes("401")) handleLogout()
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        buscarUsuarios()
    }, [])

    return {
        usuarios,
        isLoading,
        isAdmin,
        navigate,
        buscarUsuarios
    }
}