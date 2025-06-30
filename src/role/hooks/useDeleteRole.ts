import { useCallback, useState } from "react";
import { deletar } from "../../services/AxiosService";
import { ErrorHandlerService } from "../../services/ErrorHandlerService";
import { SuccessHandlerService } from "../../services/SuccessHandlerService";
import { useAuth } from "../../shared/store/AuthStore";

export function useDeleteRole(roleId: string, onSuccess?: () => void) {
  const { handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  // Configurando os tratadores de sucesso para operação de exclusão
  const successHandlers = useCallback(() => 
    SuccessHandlerService.createCrudHandlers("Role", { handleLogout }),
    [handleLogout]
  );

  const excluirRole = useCallback(async () => {
    if (!roleId || isLoading) return;
    
    setIsLoading(true);
    try {
      await deletar(`/roles/${roleId}`);
      successHandlers().handleDelete();
      onSuccess?.();
    } catch (error) {
      ErrorHandlerService.handleError(error, {
        errorMessage: "Erro ao excluir a role!",
        handleLogout,
      });
    } finally {
      setIsLoading(false);
    }
  }, [roleId, successHandlers, onSuccess, handleLogout, isLoading]);

  return {
    isLoading,
    excluirRole
  };
}