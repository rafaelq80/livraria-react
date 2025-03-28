import { useContext, useState } from "react"
import AuthContext from "../../contexts/AuthContext"

export const usePerfil = () => {

	const { usuario } = useContext(AuthContext)

	// Estado para o modo de edição
	const [modoEdicao, setModoEdicao] = useState(false)

	// Cancelar edição
	const cancelarEdicao = () => {
		setModoEdicao(false)
	}

	return {
		modoEdicao,
		setModoEdicao,
		cancelarEdicao,
		usuario,
	}
}
