import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { SuccessHandlerService } from "../../services/SuccessHandlerService"
import { useAuth } from "../../shared/store/AuthStore"
import { editoraSchema, EditoraSchemaType } from "../validations/EditoraSchema"
import { useSanitizedForm } from "../../shared/hooks/sanitized/useSanitizedForm"
import Editora from "../models/Editora"
import CriarEditoraDto from "../dtos/CriarEditoraDto"
import AtualizarEditoraDto from "../dtos/AtualizarEditoraDto"

export function useFormEditora() {
	const navigate = useNavigate()
	const { handleLogout } = useAuth()
	const { id } = useParams<{ id: string }>()

	const [isLoading, setIsLoading] = useState(false)
	const [isFormLoading, setIsFormLoading] = useState(true)

	const form = useSanitizedForm<EditoraSchemaType>({
		resolver: zodResolver(editoraSchema),
		defaultValues: {
			nome: "",
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
	const successHandlers = SuccessHandlerService.createCrudHandlers("Editora", {
		navigate,
		redirectTo: "/editoras",
		resetForm: () => {
			reset()
		},
		handleLogout,
	})

	useEffect(() => {
		const loadEditoraData = async () => {
			if (!id) {
				setIsFormLoading(false)
				return
			}

			try {
				const resposta = await listar<{ data: Editora }>(`/editoras/${id}`)
				const editora = resposta.data
				reset({
					nome: editora.nome,
				})
			} catch (error) {
				ErrorHandlerService.handleError(error, { handleLogout })
			} finally {
				setIsFormLoading(false)
			}
		}

		loadEditoraData()
	}, [id, reset, handleLogout])

	const retornar = () => {
		navigate("/editoras")
	}

	const onSubmit = async (data: EditoraSchemaType) => {
		setIsLoading(true)
		try {
			if (id) {
				// Atualização
				const editora: AtualizarEditoraDto = {
					id: Number(id),
					nome: data.nome,
				}
				await atualizar(`/editoras`, editora)
				successHandlers.handleUpdate(id)()
			} else {
				// Cadastro
				const editora: CriarEditoraDto = {
					nome: data.nome,
				}
				await cadastrar(`/editoras`, editora)
				successHandlers.handleCreate()
			}
		} catch (error) {
			ErrorHandlerService.handleError(error, {
				errorMessage: "Erro ao salvar a editora!",
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
