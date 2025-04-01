import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Categoria from "../../models/Categoria"
import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { SuccessHandlerService } from "../../services/SuccessHandlerService"
import { CategoriaSchemaType, categoriaSchema } from "../../validations/CategoriaSchema"

export function useFormCategoria() {
	const navigate = useNavigate()
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token
	const { id } = useParams<{ id: string }>()

	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<CategoriaSchemaType>({
		resolver: zodResolver(categoriaSchema),
		defaultValues: {
			tipo: "",
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

	// Configurando o tratador de erros para usuário não autenticado
    const handleErrorWithLogout = ErrorHandlerService.createLoadErrorWithLogout(handleLogout);
	
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
			await listar<Categoria>(
				`/categorias/${id}`,
				(categoriaData: Categoria) => {
					setValue("tipo", categoriaData.tipo)
				},
				{ headers: { Authorization: token } }
			)
		} catch (error) {
			handleErrorWithLogout(error)
		}
	}

	useEffect(() => {
		fetchCategoriaData()
	}, [id])

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
			if (id) {
				await atualizar(`/categorias`, categoria, successHandlers.handleUpdate(id), {
					headers: { Authorization: token },
				})
			} else {
				await cadastrar(`/categorias`, categoria, successHandlers.handleCreate, {
					headers: { Authorization: token },
				})
			}
		} catch (error) {
            ErrorHandlerService.handleError(error, {
                errorMessage: "Erro ao salvar a categoria!"
            });
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
