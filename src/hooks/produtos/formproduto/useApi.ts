import { useCallback, useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { atualizar, cadastrar, listar } from "../../../services/AxiosService";
import { ErrorHandlerService } from "../../../services/ErrorHandlerService";

// Tipo genérico para respostas da API
type ApiResponse<T> = {
  data: T | null;
  success: boolean;
  error?: unknown;
};

export function useApi<T>() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Handler de erro unificado para todas as operações
  const handleApiError = useCallback(
    <R>(error: unknown): ApiResponse<R> => {
      ErrorHandlerService.handleError(error, { handleLogout });
      return { data: null, success: false, error };
    }, 
    [handleLogout]
  );

  // Busca dados da API
  const fetchData = useCallback(
    async <R = T>(url: string): Promise<ApiResponse<R>> => {
      try {
        const data = await listar<R>(url, token);
        return { data, success: true };
      } catch (error) {
        return handleApiError(error);
      }
    },
    [token, handleApiError]
  );

  // Atualiza dados na API
  const updateData = useCallback(
    async <R = T>(url: string, data: R): Promise<ApiResponse<R>> => {
      try {
        const result = await atualizar<R>(url, data, token);
        return { data: result || data, success: true };
      } catch (error) {
        return handleApiError(error);
      }
    },
    [token, handleApiError]
  );

  // Cria novos dados na API
  const createData = useCallback(
    async <R = T>(url: string, data: R): Promise<ApiResponse<R>> => {
      try {
        const result = await cadastrar<R>(url, data, token);
        return { data: result || data, success: true };
      } catch (error) {
        return handleApiError(error);
      }
    },
    [token, handleApiError]
  );

  return { fetchData, updateData, createData };
}