import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../shared/handlers/ErrorHandlerService"
import { SuccessHandlerService } from "../../shared/handlers/SuccessHandlerService"
import { useSanitizedForm } from "../../shared/hooks/sanitized/useSanitizedForm"
import { useAuth } from "../../shared/store/AuthStore"
import AtualizarAutorDto from "../dtos/atualizarautor.dto"
import CriarAutorDto from "../dtos/criarautor.dto"
import Autor from "../models/Autor"
import { AutorSchemaType, autorSchema } from "../validations/AutorSchema"
import messages from '../../shared/constants/messages';

/**
 * Hook customizado para gerenciar o formulário de Autor (criação e edição)
 *
 * Funcionalidades:
 * - Validação de dados com Zod
 * - Sanitização automática de campos
 * - Carregamento de dados existentes para edição
 * - Operações CRUD (Create/Update)
 * - Tratamento de erros e feedback de sucesso
 * - Estados de loading para melhor experiência do usuário
 */
export function useFormAutor() {
	const navigate = useNavigate()
	const { handleLogout } = useAuth()
	const { id } = useParams<{ id: string }>()

	// Estado de loading durante submissão e carregamento inicial
	const [isLoading, setIsLoading] = useState(false)
	const [isFormLoading, setIsFormLoading] = useState(true)

	// Configuração do formulário com sanitização automática
	const form = useSanitizedForm<AutorSchemaType>(
		{
			resolver: zodResolver(autorSchema),
			defaultValues: {
				nome: "",
				nacionalidade: "",
			},
		},
		{
			sanitizeStrings: true,
			sanitizeNames: true,
			sanitizeNumbers: false,
			sanitizeEmails: false,
		}
	)

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = form

	// Handlers de sucesso para operações CRUD (redireciona, reseta formulário, faz logout se necessário)
	const successHandlers = SuccessHandlerService.createCrudHandlers("autor", {
		navigate,
		redirectTo: "/autores",
		resetForm: reset,
		handleLogout,
	})

	// Carrega dados do autor para edição, se houver id na URL
	useEffect(() => {
		const loadAutorData = async () => {
			if (!id) {
				setIsFormLoading(false)
				return
			}

			try {
				const { data: autor } = await listar<{ data: Autor }>(`/autores/${id}`)
				// Só preenche se autor existir
				if (!autor) {
					ErrorHandlerService.handleError(messages.autor.notFound, { handleLogout })
					setIsFormLoading(false)
					return
				}
				reset({
					nome: autor.nome,
					nacionalidade: autor.nacionalidade || "",
				})
			} catch (error) {
				ErrorHandlerService.handleError(error, { handleLogout })
			} finally {
				setIsFormLoading(false)
			}
		}

		loadAutorData()
	}, [id, reset, handleLogout])

	// Navega de volta para a listagem de autores
	const retornar = () => navigate("/autores")

	/**
	 * Cria o objeto de dados do autor para envio à API
	 * Centraliza a lógica de criação dos DTOs
	 */
	const createAutorData = (data: AutorSchemaType): CriarAutorDto => ({
		nome: data.nome,
		nacionalidade: data.nacionalidade,
	})

	/**
	 * Handler principal para submissão do formulário
	 * Gerencia tanto criação quanto atualização baseado na presença do id
	 */
	const onSubmit = async (data: AutorSchemaType) => {
		setIsLoading(true)

		try {
			if (id) {
				// Modo edição: cria DTO de atualização com id
				const atualizarAutor: AtualizarAutorDto = {
					...createAutorData(data),
					id: Number(id),
				}
				await atualizar(`/autores`, atualizarAutor)
				successHandlers.handleUpdate(id)()
			} else {
				// Modo criação: usa DTO de criação
				await cadastrar(`/autores`, createAutorData(data))
				successHandlers.handleCreate()
			}
		} catch (error) {
			ErrorHandlerService.handleError(error, {
				errorMessage: messages.autor.saveError,
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
