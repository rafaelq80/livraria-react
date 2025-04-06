import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Editora from "../../models/Editora"
import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { SuccessHandlerService } from "../../services/SuccessHandlerService"
import { editoraSchema, EditoraSchemaType } from "../../validations/EditoraSchema"


export function useFormEditora() {
	const navigate = useNavigate()
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token
	const { id } = useParams<{ id: string }>()

	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<EditoraSchemaType>({
		resolver: zodResolver(editoraSchema),
		defaultValues: {
			nome: "",
		},
	})

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
		setValue,
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

	const fetchEditoraData = async () => {
		if (!id) return

		try {
			const resposta = await listar<Editora>(`/editoras/${id}`, token)
			setValue("nome", resposta.nome)
		} catch (error) {
			ErrorHandlerService.handleError(error, { handleLogout })
		}
	}

	useEffect(() => {
		fetchEditoraData()
	}, [id])

	const retornar = () => {
		navigate("/editoras")
	}

	const onSubmit = async (data: EditoraSchemaType) => {
		setIsLoading(true)
		try {
			const editora: Editora = {
				id: id ? Number(id) : 0,
				nome: data.nome,
			}
			
			const acao = id ? atualizar : cadastrar
			const onSuccess = id ? successHandlers.handleUpdate(id) : successHandlers.handleCreate

			await acao(`/editoras`, editora, token)
			onSuccess()

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
		register,
		handleSubmit,
		control,
		errors,
		onSubmit,
		retornar,
	}
}
