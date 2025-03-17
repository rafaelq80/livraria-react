import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recuperarSenhaSchema, RecuperarSenhaSchemaType } from "../../validations/RecuperarSenhaSchema";
import { recuperarSenha } from "../../services/AxiosService";


export const useRecuperarSenha = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecuperarSenhaSchemaType>({
    resolver: zodResolver(recuperarSenhaSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RecuperarSenhaSchemaType) => {
    setIsLoading(true);
    setMessage("");
    
    try {

      await recuperarSenha('/usuarios/recuperarsenha', { usuario: data.usuario }, setMessage);
      reset();

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro: ", error);
        setMessage("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const voltar = () => {
    navigate("/login");
  };

  return {
    message,
    isLoading,
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    voltar,
  };
};