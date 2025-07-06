import { useCallback, useState } from "react";
import { deletar } from "../../services/AxiosService";
import { ErrorHandlerService, SuccessHandlerService } from "../../shared/handlers";
import { useAuth } from "../../shared/store/AuthStore";
import messages from '../../shared/constants/messages';

/**
 * Hook para gerenciar a exclusão de categorias.
 *
 * Funcionalidades:
 * - Exclui categoria por ID via API
 * - Exibe loading durante a operação
 * - Mostra toast de sucesso ou erro usando handlers padronizados
 * - Permite callback customizado após sucesso
 * - Integra tratamento de erro padronizado
 * 
 * @param categoriaId - ID da categoria a ser excluída
 * @param onSuccess - Callback opcional executado após sucesso
 */
export function useDeleteCategoria(categoriaId: string, onSuccess?: () => void) {
  const { handleLogout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Handler de sucesso para exclusão
  const successHandler = SuccessHandlerService.createSuccessHandler({
    successMessage: messages.categoria.deleteSuccess,
    onSuccess
  });

  // Handler de erro para exclusão
  const errorHandler = ErrorHandlerService.createErrorHandler({
    errorMessage: messages.categoria.deleteError,
    handleLogout
  });

  /**
   * Função para excluir a categoria.
   * - Garante que não executa se já estiver carregando ou sem ID
   * - Usa handlers padronizados para sucesso e erro
   */
  const excluirCategoria = useCallback(async () => {
    if (!categoriaId || isLoading) return;

    setIsLoading(true);
    try {
      await deletar(`/categorias/${categoriaId}`);
      successHandler();
    } catch (error: unknown) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }, [categoriaId, isLoading, successHandler, errorHandler]);

  return {
    isLoading,      // Estado de loading para controle de UI
    excluirCategoria    // Função para executar a exclusão
  };
}