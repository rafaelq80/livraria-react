import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useSanitizedForm } from "../../shared/hooks/sanitized/useSanitizedForm"
import { useNavigate, useParams } from "react-router-dom"
import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { SuccessHandlerService } from "../../services/SuccessHandlerService"
import { useAuth } from "../../shared/store/AuthStore"
import { CategoriaSchemaType, categoriaSchema } from "../validations/CategoriaSchema"
import Categoria from "../models/Categoria"
import CriarCategoriaDto from "../dtos/CriarCategoriaDto"
import AtualizarCategoriaDto from "../dtos/AtualizarCategoriaDto"

export function useFormCategoria() {
	const navigate = useNavigate()
	const { handleLogout } = useAuth()
	const { id } = useParams<{ id: string }>()

	const [isLoading, setIsLoading] = useState(false)
	const [isFormLoading, setIsFormLoading] = useState(true)

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

	const successHandlers = SuccessHandlerService.createCrudHandlers("Categoria", {
		navigate,
		redirectTo: "/categorias",
		resetForm: () => {
			reset()
		},
		handleLogout,
	})

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
			} catch (error) {
				ErrorHandlerService.handleError(error, { handleLogout })
			} finally {
				setIsFormLoading(false)
			}
		}
		loadCategoriaData()
	}, [id, reset, handleLogout])

	const retornar = () => {
		navigate("/categorias")
	}

	const onSubmit = async (data: CategoriaSchemaType) => {
		setIsLoading(true)
		try {
			if (id) {
				const atualizarCategoria: AtualizarCategoriaDto = {
					id: Number(id),
					tipo: data.tipo,
				}
				await atualizar(`/categorias`, atualizarCategoria)
				successHandlers.handleUpdate(id)()
			} else {
				const criarCategoria: CriarCategoriaDto = {
					tipo: data.tipo,
				}
				await cadastrar(`/categorias`, criarCategoria)
				successHandlers.handleCreate()
			}
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
		isFormLoading,
		register,
		handleSubmit,
		control,
		errors,
		onSubmit,
		retornar,
	}
}
