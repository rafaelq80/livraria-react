import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Role from "../../models/Role"
import { listar } from "../../services/AxiosService"
import { ToastAlerta } from "../../utils/ToastAlerta"


export const useListarRoles = () => {
    const navigate = useNavigate()
    const [roles, setRoles] = useState<Role[]>([])
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const [isLoading, setIsLoading] = useState(true)
    const [showButton, setShowButton] = useState(false)
    const [message, setSMessage] = useState<string>('')

    const buscarRoles = async () => {
        setIsLoading(true)
        try {
            await listar("/roles", setRoles, {
                headers: {
                    Authorization: token,
                },
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            } if (error.toString().includes("403")) {
                setShowButton(false)
                setSMessage("Acesso Negado!")
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
        buscarRoles()
    }, [])

    useEffect(() => {
        setShowButton(roles.length === 0)
    }, [roles])

    return {
        roles,
        isLoading,
        showButton,
        message,
        navigate,
        buscarRoles
    }
}