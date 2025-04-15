import { useCallback, useState } from "react";
import { deletar } from "../../services/AxiosService";
import { ErrorHandlerService } from "../../services/ErrorHandlerService";
import { SuccessHandlerService } from "../../services/SuccessHandlerService";
import { useAuth } from "../../store/AuthStore";

export function useDeleteEditora(editoraId: string, onSuccess?: () => void) {
  const { usuario, handleLogout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Configurando os tratadores de sucesso para operação de exclusão
  const successHandlers = useCallback(() => 
    SuccessHandlerService.createCrudHandlers("Editora", { handleLogout }),
    [handleLogout]
  );

  const excluirEditora = useCallback(async () => {
    if (!editoraId || isLoading) return;
    
    setIsLoading(true);
    try {
      await deletar(`/editoras/${editoraId}`, usuario.token);
      successHandlers().handleDelete();
      onSuccess?.();
    } catch (error) {
      ErrorHandlerService.handleError(error, {
        errorMessage: "Erro ao excluir a editora!",
        handleLogout,
      });
    } finally {
      setIsLoading(false);
    }
  }, [editoraId, usuario.token, successHandlers, onSuccess, handleLogout, isLoading]);

  return {
    isLoading,
    excluirEditora
  };
}