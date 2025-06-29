// hooks/useLoginForm.ts
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../shared/store/AuthStore"
import { loginSchema, LoginSchemaType } from "../validations/LoginSchema"


export function useLogin() {
  const navigate = useNavigate()
  const { handleLogin, isLoading, isAuthenticated } = useAuth()
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
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  // Função para processar o login quando o formulário for submetido
  const onSubmit = async (data: LoginSchemaType) => {
    const usuarioLogin = {
      usuario: data.usuario,
      senha: data.senha,
    }
    try {
      await handleLogin(usuarioLogin)
    } catch (error) {
      console.error("Erro no login:", error)
    }
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