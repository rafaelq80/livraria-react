import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Autor from "../models/Autor"
import { listar, ensureArrayResponse } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../shared/handlers/ErrorHandlerService"
import { useAuth } from "../../shared/store/AuthStore"
import messages from '../../shared/constants/messages';

/**
 * Hook para gerenciar a listagem de autores.
 *
 * Funcionalidades:
 * - Busca e armazena a lista de autores da API
 * - Exibe estado de loading durante a requisição
 * - Permite recarregar a lista sob demanda
 * - Integra tratamento de erro padronizado
 * - Expõe flag de admin e função de navegação
 */
export const useListarAutores = () => {
	const navigate = useNavigate()
	const [autores, setAutores] = useState<Autor[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const { isAdmin, handleLogout } = useAuth()

	/**
	 * Função para buscar autores da API.
	 * Atualiza o estado de loading e trata erros de forma padronizada.
	 */
	const buscarAutores = useCallback(async () => {
		setIsLoading(true)
		try {
			const resposta = await listar<Autor[]>("/autores")
			setAutores(ensureArrayResponse<Autor>(resposta))
		} catch (error: unknown) {
			setAutores([])
			ErrorHandlerService.handleError(error, {
				errorMessage: messages.autor.loadError,
				handleLogout
			})
		} finally {
			setIsLoading(false)
		}
	}, [handleLogout])

	// Carrega autores ao montar o componente
	useEffect(() => {
		buscarAutores()
	}, [buscarAutores])

	return {
		autores,
		isLoading,
		isAdmin,
		navigate,
		buscarAutores, // Função principal para buscar/recarregar
		recarregarAutores: buscarAutores // Alias para compatibilidade
	}
}
