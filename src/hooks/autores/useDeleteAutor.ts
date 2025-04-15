import { useCallback, useState } from "react";
import { deletar } from "../../services/AxiosService";
import { ErrorHandlerService } from "../../services/ErrorHandlerService";
import { SuccessHandlerService } from "../../services/SuccessHandlerService";
import { useAuth } from "../../store/AuthStore";

export function useDeleteAutor(autorId: string, onSuccess?: () => void) {
  const { usuario, handleLogout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Configurando os tratadores de sucesso para operação de exclusão
  const successHandlers = useCallback(() => 
    SuccessHandlerService.createCrudHandlers("Autor", { handleLogout }),
    [handleLogout]
  );

  const excluirAutor = useCallback(async () => {
    if (!autorId || isLoading) return;
    
    setIsLoading(true);
    try {
      await deletar(`/autores/${autorId}`, usuario.token);
      successHandlers().handleDelete();
      onSuccess?.();
    } catch (error) {
      ErrorHandlerService.handleError(error, {
        errorMessage: "Erro ao excluir o autor!",
        handleLogout,
      });
    } finally {
      setIsLoading(false);
    }
  }, [autorId, usuario.token, successHandlers, onSuccess, handleLogout, isLoading]);

  return {
    isLoading,
    excluirAutor
  };
}