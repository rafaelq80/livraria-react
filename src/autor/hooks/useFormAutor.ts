import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { SuccessHandlerService } from "../../services/SuccessHandlerService"
import { useAuth } from "../../shared/store/AuthStore"
import { AutorSchemaType, autorSchema } from "../validations/AutorSchema"
import Autor from "../models/Autor"
import CriarAutorDto from "../dtos/criarautor.dto"
import AtualizarAutorDto from "../dtos/atualizarautor.dto"
import { useSanitizedForm } from "../../shared/hooks/sanitized/useSanitizedForm"

export function useFormAutor() {
	const navigate = useNavigate()
	const { handleLogout } = useAuth()

	const { id } = useParams<{ id: string }>()

	const [isLoading, setIsLoading] = useState(false)
	const [isFormLoading, setIsFormLoading] = useState(true)

	const form = useSanitizedForm<AutorSchemaType>({
		resolver: zodResolver(autorSchema),
		defaultValues: {
			nome: "",
			nacionalidade: "",
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

	// Configurando os tratadores de sucesso para operações CRUD
	const successHandlers = SuccessHandlerService.createCrudHandlers("Autor", {
		navigate,
		redirectTo: "/autores",
		resetForm: () => {
			reset()
		},
		handleLogout,
	})

	useEffect(() => {
		const loadAutorData = async () => {
			if (!id) {
				setIsFormLoading(false)
				return
			}

			try {
				const resposta = await listar<{ data: Autor }>(`/autores/${id}`)
				// Acessa os dados do autor dentro da estrutura de resposta da API
				const autor = resposta.data
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

	const retornar = () => {
		navigate("/autores")
	}

	const onSubmit = async (data: AutorSchemaType) => {
		setIsLoading(true)
		try {
			if (id) {
				// Atualização - usa AtualizarAutorDto
				const atualizarAutor: AtualizarAutorDto = {
					id: Number(id),
					nome: data.nome,
					nacionalidade: data.nacionalidade,
				}
				await atualizar(`/autores`, atualizarAutor)
				successHandlers.handleUpdate(id)()
			} else {
				// Criação - usa CriarAutorDto
				const criarAutor: CriarAutorDto = {
					nome: data.nome,
					nacionalidade: data.nacionalidade,
				}
				await cadastrar(`/autores`, criarAutor)
				successHandlers.handleCreate()
			}
		} catch (error) {
			ErrorHandlerService.handleError(error, {
				errorMessage: "Erro ao salvar o autor!",
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
