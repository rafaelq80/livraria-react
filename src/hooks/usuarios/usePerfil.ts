import { useContext, useEffect, useState } from "react"
import AuthContext from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { ToastAlerta } from "../../utils/ToastAlerta"

export const usePerfil = () => {
	const navigate = useNavigate()

	const { usuario } = useContext(AuthContext)
	const token = usuario.token

	// Estado para o modo de edição
	const [modoEdicao, setModoEdicao] = useState(false)

	// Cancelar edição
	const cancelarEdicao = () => {
		setModoEdicao(false)
	}

	useEffect(() => {
		if (token === "") {
			ToastAlerta("Você precisa estar logado", "info")
			navigate("/")
		}
	}, [token, navigate])

	return {
		modoEdicao,
		setModoEdicao,
		cancelarEdicao,
		usuario,
	}
}
