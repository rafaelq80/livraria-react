import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { atualizarSenhaSchema, AtualizarSenhaSchemaType } from "../../validations/AtualizarSenhaSchema";
import { resetarSenha } from "../../services/AxiosService";

export const useAtualizarSenha = () => {
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenError, setTokenError] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AtualizarSenhaSchemaType>({
    resolver: zodResolver(atualizarSenhaSchema),
    mode: "onBlur"
  });

  useEffect(() => {
    // Extrair o token da URL
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get("token");

    if (!tokenParam) {
      setTokenError("Token de recuperação não encontrado na URL");
      return;
    }

    setToken(tokenParam);
  }, [location]);

  const onSubmit = async (data: AtualizarSenhaSchemaType) => {
    if (!token) return;
    
    setIsLoading(true);
    setMessage("");

    try {
      await resetarSenha("/usuarios/atualizarsenha", {
        token,
        senha: data.senha,
        confirmarSenha: data.confirmarSenha
      }, setMessage);
      
      // Limpar formulário após sucesso
      reset();
      
      // Redireciona para a tela de login após alguns segundos
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Erro ao atualizar senha");
      } else {
        setMessage("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const voltar = () => {
    navigate("/recuperarsenha");
  };

  return {
    token,
    tokenError,
    message,
    isLoading,
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    voltar
  };
};