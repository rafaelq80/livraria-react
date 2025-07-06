import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useSanitizedForm } from "../../shared/hooks/sanitized/useSanitizedForm"
import { useNavigate, useParams } from "react-router-dom"
import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../shared/handlers/ErrorHandlerService"
import { SuccessHandlerService } from "../../shared/handlers/SuccessHandlerService"
import { useAuth } from "../../shared/store/AuthStore"
import { CategoriaSchemaType, categoriaSchema } from "../validations/CategoriaSchema"
import Categoria from "../models/Categoria"
import CriarCategoriaDto from "../dtos/CriarCategoriaDto"
import AtualizarCategoriaDto from "../dtos/AtualizarCategoriaDto"
import messages from '../../shared/constants/messages';

/**
 * Hook para gerenciar formulário de categoria (criar/editar).
 *
 * Funcionalidades:
 * - Gerencia estado do formulário com validação Zod
 * - Carrega dados da categoria para edição
 * - Submete formulário para criar ou atualizar
 * - Integra tratamento de erro e sucesso padronizado
 * - Sanitiza dados de entrada automaticamente
 */
export function useFormCategoria() {
	const navigate = useNavigate()
	const { handleLogout } = useAuth()
	const { id } = useParams<{ id: string }>()

	const [isLoading, setIsLoading] = useState(false)
	const [isFormLoading, setIsFormLoading] = useState(true)

	// Configuração do formulário com sanitização
	const form = useSanitizedForm<CategoriaSchemaType>({
		resolver: zodResolver(categoriaSchema),
		defaultValues: {
			tipo: "",
		},
	}, {
		sanitizeStrings: true,
		sanitizeNumbers: false,
		sanitizeEmails: false,
		sanitizeNames: true,
	})

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = form

	// Handlers padronizados para operações CRUD
	const successHandlers = SuccessHandlerService.createCrudHandlers("categoria", {
		navigate,
		redirectTo: "/categorias",
		resetForm: () => {
			reset()
		},
		handleLogout,
	})

	// Carrega dados da categoria para edição
	useEffect(() => {
		const loadCategoriaData = async () => {
			if (!id) {
				setIsFormLoading(false)
				return
			}
			try {
				const resposta = await listar<{ data: Categoria }>(`/categorias/${id}`)
				const categoria = resposta.data
				reset({
					tipo: categoria.tipo,
				})
			} catch (error: unknown) {
				ErrorHandlerService.handleError(error, { 
					errorMessage: messages.categoria.loadError,
					handleLogout 
				})
			} finally {
				setIsFormLoading(false)
			}
		}
		loadCategoriaData()
	}, [id, reset, handleLogout])

	/**
	 * Navega de volta para a listagem de categorias
	 */
	const retornar = () => {
		navigate("/categorias")
	}

	/**
	 * Submete o formulário para criar ou atualizar categoria
	 */
	const onSubmit = async (data: CategoriaSchemaType) => {
		setIsLoading(true)
		try {
			if (id) {
				// Atualiza categoria existente
				const atualizarCategoria: AtualizarCategoriaDto = {
					id: Number(id),
					tipo: data.tipo,
				}
				await atualizar(`/categorias`, atualizarCategoria)
				successHandlers.handleUpdate(id)()
			} else {
				// Cria nova categoria
				const criarCategoria: CriarCategoriaDto = {
					tipo: data.tipo,
				}
				await cadastrar(`/categorias`, criarCategoria)
				successHandlers.handleCreate()
			}
		} catch (error: unknown) {
			ErrorHandlerService.handleError(error, {
				errorMessage: messages.categoria.saveError,
			})
		} finally {
			setIsLoading(false)
		}
	}

	return {
		id,
		isLoading,
		isFormLoading,
		register,
		handleSubmit,
		control,
		errors,
		onSubmit,
		retornar,
	}
}
