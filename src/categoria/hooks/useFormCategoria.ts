import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { SuccessHandlerService } from "../../services/SuccessHandlerService"
import { useAuth } from "../../shared/store/AuthStore"
import { CategoriaSchemaType, categoriaSchema } from "../validations/CategoriaSchema"
import { useSanitizedForm } from "../../shared/hooks/sanitized/useSanitizedForm"
import Categoria from "../models/Categoria"

export function useFormCategoria() {
	const navigate = useNavigate()
	const { usuario, handleLogout } = useAuth()
	const token = usuario.token
	
	const { id } = useParams<{ id: string }>()

	const [isLoading, setIsLoading] = useState(false)

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
		setValue,
	} = form

	// Configurando os tratadores de sucesso para operações CRUD
	const successHandlers = SuccessHandlerService.createCrudHandlers("Categoria", {
		navigate,
		redirectTo: "/categorias",
		resetForm: () => {
			reset()
		},
		handleLogout,
	})

	const fetchCategoriaData = async () => {
		if (!id) return

		try {
			const resposta = await listar<Categoria>(`/categorias/${id}`)
			setValue("tipo", resposta.tipo)
		} catch (error) {
			ErrorHandlerService.handleError(error, { handleLogout })
		}
	}

	useEffect(() => {
		fetchCategoriaData()
	}, [id, token])

	const retornar = () => {
		navigate("/categorias")
	}

	const onSubmit = async (data: CategoriaSchemaType) => {
		setIsLoading(true)
		try {
			const categoria: Categoria = {
				id: id ? Number(id) : 0,
				tipo: data.tipo,
			}
			
			const acao = id ? atualizar : cadastrar
			const onSuccess = id ? successHandlers.handleUpdate(id) : successHandlers.handleCreate

			await acao(`/categorias`, categoria)
			onSuccess()

		} catch (error) {
			ErrorHandlerService.handleError(error, {
				errorMessage: "Erro ao salvar a categoria!",
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
