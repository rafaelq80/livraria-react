import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { SuccessHandlerService } from "../../services/SuccessHandlerService"
import { useAuth } from "../../shared/store/AuthStore"
import { RoleSchemaType, roleSchema } from "../validations/RoleSchema"
import { useSanitizedForm } from "../../shared/hooks/sanitized/useSanitizedForm"
import Role from "../models/Role"

export function useFormRole() {
	const navigate = useNavigate()
	const { usuario, handleLogout } = useAuth()
	const token = usuario.token

	const { id } = useParams<{ id: string }>()

	const [isLoading, setIsLoading] = useState(false)

	const form = useSanitizedForm<RoleSchemaType>({
		resolver: zodResolver(roleSchema),
		defaultValues: {
			nome: "",
			descricao: "",
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
	const successHandlers = SuccessHandlerService.createCrudHandlers("Role", {
		navigate,
		redirectTo: "/roles",
		resetForm: () => {
			reset()
		},
		handleLogout,
	})

	const fetchRoleData = async () => {
		if (!id) return

		try {
			const resposta = await listar<Role>(`/roles/${id}`)
            setValue("nome", resposta.nome)
			setValue("descricao", resposta.descricao)
		} catch (error) {
			ErrorHandlerService.handleError(error, { handleLogout })
		}
	}

	useEffect(() => {
		fetchRoleData()
	}, [id, token])

	const retornar = () => {
		navigate("/roles")
	}

	const onSubmit = async (data: RoleSchemaType) => {
		setIsLoading(true)
		try {
			const role: Role = {
				id: id ? Number(id) : 0,
				nome: data.nome,
				descricao: data.descricao,
			}
			const acao = id ? atualizar : cadastrar
			const onSuccess = id ? successHandlers.handleUpdate(id) : successHandlers.handleCreate

			await acao(`/roles`, role)
			onSuccess()
		} catch (error) {
			ErrorHandlerService.handleError(error, { handleLogout })
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
