// hooks/useLoginForm.ts
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import AuthContext from "../../contexts/AuthContext"
import { loginSchema, LoginSchemaType } from "../../validations/LoginSchema"


export function useLogin() {
  const navigate = useNavigate()
  const { usuario, handleLogin, isLoading } = useContext(AuthContext)
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