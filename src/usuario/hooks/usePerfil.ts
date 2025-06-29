import { useState } from "react"
import { useAuth } from "../../shared/store/AuthStore"

export const usePerfil = () => {

	const { usuario } = useAuth()

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
