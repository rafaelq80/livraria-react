import { useCallback, useState } from "react";
import { deletar } from "../../services/AxiosService";
import { ErrorHandlerService } from "../../services/ErrorHandlerService";
import { useAuth } from "../../shared/store/AuthStore";
import { ToastAlerta } from "../../utils/ToastAlerta";

/**
 * Hook para gerenciar a exclusão de autores
 */
export function useDeleteAutor(autorId: string, onSuccess?: () => void) {
  const { handleLogout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const excluirAutor = useCallback(async () => {
    if (!autorId || isLoading) return;
    
    setIsLoading(true);
    try {
      await deletar(`/autores/${autorId}`);
      ToastAlerta("Autor excluído com sucesso!", "sucesso");
      onSuccess?.();
    } catch (error) {
      ErrorHandlerService.handleError(error, {
        errorMessage: "Erro ao excluir o autor!",
        handleLogout,
      });
    } finally {
      setIsLoading(false);
    }
  }, [autorId, onSuccess, handleLogout, isLoading]);

  return {
    isLoading,
    excluirAutor
  };
}