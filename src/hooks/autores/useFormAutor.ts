import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Autor from "../../models/Autor"
import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { SuccessHandlerService } from "../../services/SuccessHandlerService"
import { AutorSchemaType, autorSchema } from "../../validations/AutorSchema"

export function useFormAutor() {
	const navigate = useNavigate()
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token
	const { id } = useParams<{ id: string }>()

	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<AutorSchemaType>({
		resolver: zodResolver(autorSchema),
		defaultValues: {
			nome: "",
			nacionalidade: "",
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
	const successHandlers = SuccessHandlerService.createCrudHandlers("Autor", {
		navigate,
		redirectTo: "/autores",
		resetForm: () => {
			reset()
		},
		handleLogout,
	})

	const fetchAutorData = async () => {
		if (!id) return

		try {
			const resposta = await listar<Autor>(`/autores/${id}`, token)
			setValue("nome", resposta.nome)
			setValue("nacionalidade", resposta.nacionalidade)
		} catch (error) {
			ErrorHandlerService.handleError(error, { handleLogout })
		}
	}

	useEffect(() => {
		fetchAutorData()
	}, [id])

	const retornar = () => {
		navigate("/autores")
	}

	const onSubmit = async (data: AutorSchemaType) => {
		setIsLoading(true)
		try {
			const autor: Autor = {
				id: id ? Number(id) : 0,
				nome: data.nome,
				nacionalidade: data.nacionalidade,
			}
			
			const acao = id ? atualizar : cadastrar
			const onSuccess = id ? successHandlers.handleUpdate(id) : successHandlers.handleCreate

			await acao(`/autores`, autor, token)
			onSuccess()

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
		register,
		handleSubmit,
		control,
		errors,
		onSubmit,
		retornar,
	}
}
