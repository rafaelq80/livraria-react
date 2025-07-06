import { NavigateFunction } from "react-router-dom";
import { ToastAlerta } from "../utils/ToastAlerta";
import messages from "../constants/messages";

/**
 * Opções para configuração do tratamento de sucesso
 */
export interface SuccessHandlerOptions<T = unknown> {
  /** Função de navegação do React Router */
  navigate?: NavigateFunction;
  /** Rota de destino para redirecionamento */
  redirectTo?: string;
  /** Mensagem de sucesso para exibir no toast */
  successMessage?: string;
  /** Controla se deve exibir toast de sucesso */
  showToast?: boolean;
  /** Função para resetar formulário após sucesso */
  resetForm?: () => void;
  /** Callback executado após o tratamento de sucesso */
  onSuccess?: (data?: T) => void;
  /** Função de logout para casos especiais */
  handleLogout?: () => void;
  /** ID do usuário atual (para comparação) */
  currentUserId?: number;
  /** ID do usuário alvo da operação */
  targetUserId?: number | string;
  /** Delay em ms antes do redirecionamento */
  redirectDelay?: number;
}

/**
 * Tipo para acessar mensagens de entidades específicas
 */
type EntityMessages = {
  createSuccess: string;
  updateSuccess: string;
  deleteSuccess: string;
};

/**
 * Serviço para tratamento centralizado de sucesso em operações
 * 
 * Funcionalidades:
 * - Toast de sucesso automático usando mensagens específicas por entidade
 * - Redirecionamento configurável
 * - Reset de formulários
 * - Logout automático para edições do próprio usuário
 * - Callbacks customizados
 * - Handlers CRUD pré-configurados
 * 
 * @example
 * ```typescript
 * // Com handlers CRUD usando mensagens específicas
 * const handlers = SuccessHandlerService.createCrudHandlers("autor", {
 *   navigate,
 *   redirectTo: "/autores",
 *   resetForm: () => form.reset()
 * });
 * 
 * // Usar handler específico
 * handlers.handleCreate(); // Usa messages.autor.createSuccess
 * handlers.handleUpdate(userId)(); // Usa messages.autor.updateSuccess
 * ```
 */
export class SuccessHandlerService {
  /**
   * Verifica se deve executar logout baseado na comparação de usuários
   */
  private static shouldLogout(
    handleLogout: (() => void) | undefined,
    currentUserId: number | undefined,
    targetUserId: number | string | undefined
  ): boolean {
    if (!handleLogout || !currentUserId || !targetUserId) {
      return false;
    }
    
    const current = Number(currentUserId);
    const target = Number(targetUserId);
    
    return !isNaN(current) && !isNaN(target) && current === target;
  }

  /**
   * Executa redirecionamento com delay opcional
   */
  private static executeRedirect(
    navigate: NavigateFunction | undefined,
    redirectTo: string | undefined,
    delay: number = 0
  ): void {
    if (!navigate || !redirectTo) {
      return;
    }

    if (delay > 0) {
      setTimeout(() => navigate(redirectTo), delay);
    } else {
      navigate(redirectTo);
    }
  }

  /**
   * Obtém mensagens específicas para uma entidade
   */
  private static getEntityMessages(entityName: string): EntityMessages | null {
    const entityMessages = messages[entityName as keyof typeof messages];
    
    if (entityMessages && 
        'createSuccess' in entityMessages && 
        'updateSuccess' in entityMessages && 
        'deleteSuccess' in entityMessages) {
      return entityMessages as EntityMessages;
    }
    
    return null;
  }

  /**
   * Trata operações de sucesso de forma padronizada na aplicação
   */
  private static handleSuccess<T = unknown>(data?: T, options: SuccessHandlerOptions<T> = {}): void {
    const {
      navigate,
      redirectTo,
      successMessage,
      showToast = true,
      resetForm,
      onSuccess,
      handleLogout,
      currentUserId,
      targetUserId,
      redirectDelay = 0
    } = options;
    
    // Exibe mensagem toast se configurado
    if (showToast && successMessage) {
      ToastAlerta(successMessage, "sucesso");
    }
   
    // Verifica se deve executar logout (usuário editando seus próprios dados)
    if (this.shouldLogout(handleLogout, currentUserId, targetUserId)) {
      handleLogout!();
      return;
    }
   
    // Executa redirecionamento com delay opcional
    this.executeRedirect(navigate, redirectTo, redirectDelay);
   
    // Reseta formulário se configurado
    if (resetForm) {
      resetForm();
    }
   
    // Executa callback customizado se fornecido
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
      currentUserId,
      redirectDelay
    } = options;

    const entityMessages = this.getEntityMessages(entityName);
   
    return {
      /**
       * Handler para operações de criação
       */
      handleCreate: this.createSuccessHandler<T>({
        navigate,
        redirectTo,
        resetForm,
        redirectDelay,
        successMessage: entityMessages?.createSuccess
      }),
     
      /**
       * Handler para operações de atualização
       */
      handleUpdate: (targetUserId?: number | string) => this.createSuccessHandler<T>({
        navigate,
        redirectTo,
        handleLogout,
        currentUserId,
        targetUserId,
        redirectDelay,
        successMessage: entityMessages?.updateSuccess
      }),
     
      /**
       * Handler para operações de exclusão
       */
      handleDelete: this.createSuccessHandler<T>({
        navigate,
        redirectTo,
        redirectDelay,
        successMessage: entityMessages?.deleteSuccess
      })
    };
  }
}