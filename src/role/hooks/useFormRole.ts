import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../shared/handlers/ErrorHandlerService"
import { SuccessHandlerService } from "../../shared/handlers/SuccessHandlerService"
import { useSanitizedForm } from "../../shared/hooks/sanitized/useSanitizedForm"
import { useAuth } from "../../shared/store/AuthStore"
import AtualizarRoleDto from "../dtos/AtualizarRoleDto"
import CriarRoleDto from "../dtos/CriarRoleDto"
import Role from "../models/Role"
import { RoleSchemaType, roleSchema } from "../validations/RoleSchema"

export function useFormRole() {
	const navigate = useNavigate()
	const { handleLogout } = useAuth()
	const { id } = useParams<{ id: string }>()

	const [isLoading, setIsLoading] = useState(false)
	const [isFormLoading, setIsFormLoading] = useState(true)

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
	} = form

	// Configurando os tratadores de sucesso para operações CRUD
	const successHandlers = SuccessHandlerService.createCrudHandlers("role", {
		navigate,
		redirectTo: "/roles",
		resetForm: () => {
			reset()
		},
		handleLogout,
	})

	useEffect(() => {
		const loadRoleData = async () => {
			if (!id) {
				setIsFormLoading(false)
				return
			}

			try {
				const resposta = await listar<{ data: Role }>(`/roles/${id}`)
				const role = resposta.data
				reset({
					nome: role.nome,
					descricao: role.descricao,
				})
			} catch (error) {
				ErrorHandlerService.handleError(error, { handleLogout })
			} finally {
				setIsFormLoading(false)
			}
		}

		loadRoleData()
	}, [id, reset, handleLogout])

	const retornar = () => {
		navigate("/roles")
	}

	const onSubmit = async (data: RoleSchemaType) => {
		setIsLoading(true)
		try {
			if (id) {
				// Atualização
				const role: AtualizarRoleDto = {
					id: Number(id),
					nome: data.nome,
					descricao: data.descricao,
				}
				await atualizar(`/roles`, role)
				successHandlers.handleUpdate(id)()
			} else {
				// Cadastro
				const role: CriarRoleDto = {
					nome: data.nome,
					descricao: data.descricao,
				}
				await cadastrar(`/roles`, role)
				successHandlers.handleCreate()
			}
		} catch (error) {
			ErrorHandlerService.handleError(error, { handleLogout })
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
