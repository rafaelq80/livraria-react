import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { listar, ensureArrayResponse } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../shared/handlers/ErrorHandlerService"
import { useAuth } from "../../shared/store/AuthStore"
import Categoria from "../models/Categoria"
import messages from '../../shared/constants/messages';

/**
 * Hook para gerenciar a listagem de categorias.
 *
 * Funcionalidades:
 * - Busca e armazena a lista de categorias da API
 * - Exibe estado de loading durante a requisição
 * - Permite recarregar a lista sob demanda
 * - Integra tratamento de erro padronizado
 * - Expõe flag de admin e função de navegação
 */
export const useListarCategorias = () => {
	const navigate = useNavigate()
	const [categorias, setCategorias] = useState<Categoria[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const { isAdmin, handleLogout } = useAuth()

	/**
	 * Função para buscar categorias da API.
	 * Atualiza o estado de loading e trata erros de forma padronizada.
	 */
	const buscarCategorias = useCallback(async () => {
		setIsLoading(true)
		try {
			const resposta = await listar<Categoria[]>("/categorias")
			setCategorias(ensureArrayResponse<Categoria>(resposta))
		} catch (error: unknown) {
			setCategorias([])
			ErrorHandlerService.handleError(error, {
				errorMessage: messages.categoria.loadError,
				handleLogout
			})
		} finally {
			setIsLoading(false)
		}
	}, [handleLogout])

	// Carrega categorias ao montar o componente
	useEffect(() => {
		buscarCategorias()
	}, [buscarCategorias])

	return {
		categorias,
		isLoading,
		isAdmin,
		navigate,
		buscarCategorias, // Função principal para buscar/recarregar
		recarregarCategorias: buscarCategorias // Alias para compatibilidade
	}
}
