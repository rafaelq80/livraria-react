import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { atualizar, cadastrar, listar } from "../../services/AxiosService"
import { ErrorHandlerService } from "../../shared/handlers/ErrorHandlerService"
import { criarUsuarioFormData } from "../../shared/services/FormDataService"
import { SuccessHandlerService } from "../../shared/handlers/SuccessHandlerService"

import { useAuth } from "../../shared/store/AuthStore"
import { UsuarioSchemaType } from "../validations/UsuarioSchema"
import Role from "../../role/models/Role"
import Usuario from "../models/Usuario"
import CriarUsuarioDto, { RoleIdDto } from "../dtos/CriarUsuarioDto"
import AtualizarUsuarioDto from "../dtos/AtualizarUsuarioDto"

export function useCadastrarUsuario(isPerfil?: boolean) {
  const navigate = useNavigate()
  const { usuario, handleLogout } = useAuth()
  const token = usuario.token
  const { id: rotaId } = useParams<{ id: string }>()

  const id = isPerfil ? usuario.id : rotaId

  const [isLoading, setIsLoading] = useState(false)
  const [fotoPreview, setFotoPreview] = useState("")
  const [rolesList, setRolesList] = useState<Role[]>([])
  const [userData, setUserData] = useState<Usuario | null>(null)

  const defaultRole: Role = {
    id: 2,
    nome: "user",
    descricao: "Usuário",
  }

  const retornar = () => {
    navigate("/login")
  }

  const successHandlers = SuccessHandlerService.createCrudHandlers("usuario", {
    navigate,
    redirectTo: "/login",
    resetForm: () => {
      setFotoPreview("")
    },
    handleLogout,
    currentUserId: usuario.id,
  })

  const fetchRoles = async () => {
    try {
      const resposta = await listar<Role[]>("/roles")
      setRolesList(resposta)
    } catch (error) {
      ErrorHandlerService.handleError(error, { handleLogout })
    }
  }

  const fetchUserData = async () => {
    if (!id) return
    try {
      const resposta = await listar<Usuario>(`/usuarios/${id}`)
      setUserData(resposta)
      return resposta
    } catch (error) {
      ErrorHandlerService.handleError(error, { handleLogout })
    }
  }

  useEffect(() => {
    // Para cadastro, sempre busca roles (não precisa ser admin)
    if (rolesList.length === 0) {
      fetchRoles()
    }
    
    // Só carrega dados do usuário se houver ID e token (para edição)
    if (id && token) {
      const loadUserData = async () => {
        const userData = await fetchUserData()
        if (userData) {
          setFotoPreview(userData.foto || "")
        }
      }
      loadUserData()
    }
  }, [id, token, rolesList.length])

  const onSubmit = async (data: UsuarioSchemaType) => {
    setIsLoading(true)

    try {
      // Mapeia os roles para apenas os IDs
      const roleIds: RoleIdDto[] = data.roles.map(role => ({ id: role.id }))

      if (id) {
        // Atualização - usa AtualizarUsuarioDto DTO (precisa de token)
        const updateUser: AtualizarUsuarioDto = {
          id: Number(id),
          nome: data.nome,
          usuario: data.usuario,
          senha: data.senha,
          foto: data.foto,
          roles: roleIds,
        }
        const formData = criarUsuarioFormData(updateUser, data.fotoFile || null)
        await atualizar("usuarios/atualizar", formData)
        successHandlers.handleUpdate(id)()
      } else {
        // Criação - usa CriarUsuarioDto DTO (não precisa de token)
        // A validação de confirmarSenha já foi feita pelo schema do Zod
        const newUser: CriarUsuarioDto = {
          nome: data.nome,
          usuario: data.usuario,
          senha: data.senha,
          foto: data.foto,
          roles: roleIds,
        }
        
        const formData = criarUsuarioFormData(newUser, data.fotoFile || null)
        
        await cadastrar("usuarios/cadastrar", formData) // Sem token
        successHandlers.handleCreate()
      }
    } catch (error) {
      ErrorHandlerService.handleError(error, {
        errorMessage: "Erro ao salvar o usuário!",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    id,
    isLoading,
    onSubmit,
    retornar,
    fotoPreview,
    rolesList,
    isAdmin: usuario.roles.some((role) => role.nome === "admin"),
    defaultRole,
    userData,
  }
}