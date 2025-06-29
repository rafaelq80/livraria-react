import { useCallback, useState } from "react";
import { deletar } from "../../services/AxiosService";
import { ErrorHandlerService } from "../../services/ErrorHandlerService";
import { SuccessHandlerService } from "../../services/SuccessHandlerService";
import { useAuth } from "../../shared/store/AuthStore";

export function useDeleteCategoria(categoriaId: string, onSuccess?: () => void) {
  const { handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  // Configurando os tratadores de sucesso para operação de exclusão
  const successHandlers = useCallback(() => 
    SuccessHandlerService.createCrudHandlers("Categoria", { handleLogout }),
    [handleLogout]
  );

  const excluirCategoria = useCallback(async () => {
    if (!categoriaId || isLoading) return;
    
    setIsLoading(true);
    try {
      await deletar(`/categorias/${categoriaId}`);
      successHandlers().handleDelete();
      onSuccess?.();
    } catch (error) {
      ErrorHandlerService.handleError(error, {
        errorMessage: "Erro ao excluir a categoria!",
        handleLogout,
      });
    } finally {
      setIsLoading(false);
    }
  }, [categoriaId, successHandlers, onSuccess, handleLogout, isLoading]);

  return {
    isLoading,
    excluirCategoria
  };
}