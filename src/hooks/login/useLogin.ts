// hooks/useLoginForm.ts
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../store/AuthStore"
import { loginSchema, LoginSchemaType } from "../../validations/LoginSchema"


export function useLogin() {
  const navigate = useNavigate()
  const { usuario, handleLogin, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  
  // Configuração do React Hook Form com Zod
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usuario: "",
      senha: ""
    }
  })

  // Verifica se o usuário já está logado e redireciona
  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/")
    }
  }, [usuario, navigate])

  // Função para processar o login quando o formulário for submetido
  const onSubmit = async (data: LoginSchemaType) => {
    const usuarioLogin = {
      id: 0,
      nome: "",
      usuario: data.usuario,
      foto: "",
      senha: data.senha,
      roles: [],
      token: "",
    }
    
    await handleLogin(usuarioLogin)
  }

  // Toggle para mostrar/esconder senha
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    showPassword,
    toggleShowPassword
  }
}