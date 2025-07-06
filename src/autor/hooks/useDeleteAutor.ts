import { useCallback, useState } from "react";
import { deletar } from "../../services/AxiosService";
import { ErrorHandlerService, SuccessHandlerService } from "../../shared/handlers";
import { useAuth } from "../../shared/store/AuthStore";
import messages from '../../shared/constants/messages';

/**
 * Hook para gerenciar a exclusão de autores.
 *
 * Funcionalidades:
 * - Exclui autor por ID via API
 * - Exibe loading durante a operação
 * - Mostra toast de sucesso ou erro usando handlers padronizados
 * - Permite callback customizado após sucesso
 * - Integra tratamento de erro padronizado
 */
export function useDeleteAutor(autorId: string, onSuccess?: () => void) {
  const { handleLogout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Handler de sucesso para exclusão
  const successHandler = SuccessHandlerService.createSuccessHandler({
    successMessage: messages.autor.deleteSuccess,
    onSuccess
  });

  // Handler de erro para exclusão
  const errorHandler = ErrorHandlerService.createErrorHandler({
    errorMessage: messages.autor.deleteError,
    handleLogout
  });

  /**
   * Função para excluir o autor.
   * - Garante que não executa se já estiver carregando ou sem ID
   * - Usa handlers padronizados para sucesso e erro
   */
  const excluirAutor = useCallback(async () => {
    if (!autorId || isLoading) return;

    setIsLoading(true);
    try {
      await deletar(`/autores/${autorId}`);
      successHandler();
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }, [autorId, isLoading, successHandler, errorHandler]);

  return {
    isLoading,      // Estado de loading para controle de UI
    excluirAutor    // Função para executar a exclusão
  };
}