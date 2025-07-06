import { useCallback, useState } from "react";
import { deletar } from "../../services/AxiosService";
import { ErrorHandlerService, SuccessHandlerService } from "../../shared/handlers";
import { useAuth } from "../../shared/store/AuthStore";
import messages from '../../shared/constants/messages';

/**
 * Hook para gerenciar a exclusão de editoras.
 *
 * Funcionalidades:
 * - Exclui editora por ID via API
 * - Exibe loading durante a operação
 * - Mostra toast de sucesso ou erro usando handlers padronizados
 * - Permite callback customizado após sucesso
 * - Integra tratamento de erro padronizado
 */
export function useDeleteEditora(editoraId: string, onSuccess?: () => void) {
  const { handleLogout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Handler de sucesso para exclusão
  const successHandler = SuccessHandlerService.createSuccessHandler({
    successMessage: messages.editora.deleteSuccess,
    onSuccess
  });

  // Handler de erro para exclusão
  const errorHandler = ErrorHandlerService.createErrorHandler({
    errorMessage: messages.editora.deleteError,
    handleLogout
  });

  /**
   * Função para excluir a editora.
   * - Garante que não executa se já estiver carregando ou sem ID
   * - Usa handlers padronizados para sucesso e erro
   */
  const excluirEditora = useCallback(async () => {
    if (!editoraId || isLoading) return;

    setIsLoading(true);
    try {
      await deletar(`/editoras/${editoraId}`);
      successHandler();
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }, [editoraId, isLoading, successHandler, errorHandler]);

  return {
    isLoading,      // Estado de loading para controle de UI
    excluirEditora    // Função para executar a exclusão
  };
}