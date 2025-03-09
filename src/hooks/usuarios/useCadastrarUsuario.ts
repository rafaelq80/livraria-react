import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Role from "../../models/Role"
import Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../services/AxiosService"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { UsuarioSchemaType, usuarioSchema } from "../../validations/UsuarioSchema"

export function useCadastrarUsuario() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const rolePadrao: Role = {
    id: 2,
    nome: "user",
  }

  const { 
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UsuarioSchemaType>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nome: "",
      usuario: "",
      foto: "",
      senha: "",
      confirmarSenha: ""
    }
  })

  function retornar() {
    navigate("/login")
  }

  async function onSubmit(data: UsuarioSchemaType) {
    setIsLoading(true)

    const novoUsuario: Usuario = {
      id: 0,
      nome: data.nome,
      usuario: data.usuario,
      senha: data.senha,
      foto: data.foto,
      roles: [rolePadrao]
    }

    try {
      await cadastrarUsuario(`/usuarios/cadastrar`, novoUsuario)
      ToastAlerta("Usuário cadastrado com sucesso!", "sucesso")
      reset()
      navigate("/login")
    } catch (error) {
      ToastAlerta("Erro ao cadastrar o usuário!", "erro")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    register,
    handleSubmit,
    errors,
    onSubmit,
    retornar
  }
}