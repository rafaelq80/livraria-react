import { NavigateFunction } from "react-router-dom";
import { ToastAlerta } from "../utils/ToastAlerta";

// Tipo genérico para dados retornados de operações
export type OperationResult<T = unknown> = T;

export interface SuccessHandlerOptions<T = unknown> {
  navigate?: NavigateFunction;
  redirectTo?: string;
  successMessage?: string;
  showToast?: boolean;
  resetForm?: () => void;
  onSuccess?: (data?: T) => void;
  handleLogout?: () => void;
  currentUserId?: number;
  targetUserId?: number | string;
}

/**
 * Serviço para tratamento centralizado de sucesso em operações
 */
export class SuccessHandlerService {
  /**
   * Trata operações de sucesso de forma padronizada na aplicação
   */
  static handleSuccess<T = unknown>(data?: T, options: SuccessHandlerOptions<T> = {}): void {
    const {
      navigate,
      redirectTo,
      successMessage,
      showToast = true,
      resetForm,
      onSuccess,
      handleLogout,
      currentUserId,
      targetUserId
    } = options;
    
    // Exibe mensagem toast se configurado
    if (showToast && successMessage) {
      ToastAlerta(successMessage, "sucesso");
    }
   
    // Se o usuário editou seus próprios dados e existe função de logout, executa logout
    if (
      handleLogout &&
      currentUserId &&
      targetUserId &&
      Number(currentUserId) === Number(targetUserId)
    ) {
      handleLogout();
      return; // Encerra a execução, pois o logout já fará o redirecionamento
    }
   
    // Se existe destino de redirecionamento e função de navegação, redireciona
    if (navigate && redirectTo) {
      navigate(redirectTo);
    }
   
    // Se existe função para resetar formulário, executa
    if (resetForm) {
      resetForm();
    }
   
    // Se existe uma função de callback adicional, executa
    if (onSuccess) {
      onSuccess(data);
    }
  }

  /**
   * Cria uma função de tratamento de sucesso configurada
   */
  static createSuccessHandler<T = unknown>(options: SuccessHandlerOptions<T> = {}) {
    return (data?: T) => this.handleSuccess<T>(data, options);
  }
 
  /**
   * Cria funções de tratamento de sucesso para operações CRUD comuns
   */
  static createCrudHandlers<T = unknown>(entityName: string, options: SuccessHandlerOptions<T> = {}) {
    const {
      navigate,
      redirectTo,
      resetForm,
      handleLogout,
      currentUserId
    } = options;
   
    return {
      // Handler para criação
      handleCreate: this.createSuccessHandler<T>({
        navigate,
        redirectTo,
        resetForm,
        successMessage: `${entityName} cadastrado(a) com sucesso!`
      }),
     
      // Handler para atualização
      handleUpdate: (targetUserId?: number | string) => this.createSuccessHandler<T>({
        navigate,
        redirectTo,
        handleLogout,
        currentUserId,
        targetUserId,
        successMessage: `${entityName} atualizado(a) com sucesso!`
      }),
     
      // Handler para exclusão
      handleDelete: this.createSuccessHandler<T>({
        navigate,
        redirectTo,
        successMessage: `${entityName} excluído(a) com sucesso!`
      }),
     
      // Handler personalizado (permite sobrescrever opções)
      createCustomHandler: (customOptions: SuccessHandlerOptions<T> = {}) =>
        this.createSuccessHandler<T>({
          navigate,
          redirectTo,
          resetForm,
          ...customOptions
        })
    };
  }
}