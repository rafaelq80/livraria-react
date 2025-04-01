import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"
import Role from "../../models/Role"
import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { SuccessHandlerService } from "../../services/SuccessHandlerService"
import { RoleSchemaType, roleSchema } from "../../validations/RoleSchema"

export function useFormRole() {
    const navigate = useNavigate()
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const { id } = useParams<{ id: string }>()

    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<RoleSchemaType>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            nome: "",
            descricao: "",
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
            await listar<Role>(
                `/roles/${id}`,
                (roleData: Role) => {
                    setValue("nome", roleData.nome)
                    setValue("descricao", roleData.descricao)
                },
                { headers: { Authorization: token } }
            )
        } catch (error) {
            handleErrorWithLogout(error)
        }
    }

    useEffect(() => {
        fetchRoleData()
    }, [id])

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
            if (id) {
                await atualizar(`/roles`, role, successHandlers.handleUpdate(id), {
                    headers: { Authorization: token },
                })
            } else {
                await cadastrar(`/roles`, role, successHandlers.handleCreate, {
                    headers: { Authorization: token },
                })
            }
        } catch (error) {
            ErrorHandlerService.handleError(error, {
                errorMessage: "Erro ao salvar a role!"
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
