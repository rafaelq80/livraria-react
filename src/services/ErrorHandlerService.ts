import { ToastAlerta } from "../utils/ToastAlerta";

export interface ErrorHandlerOptions {
 
  handleLogout?: () => void;
  errorMessage?: string;
  onError?: (error: unknown) => void;

}

/**
 * Serviço para tratamento centralizado de erros
 */
export class ErrorHandlerService {
  
  /**
   * Trata erros de forma padronizada na aplicação
   */
  static handleError(error: unknown, options: ErrorHandlerOptions = {}): void {
    const { 
      handleLogout,
      errorMessage = "Erro ao processar solicitação!",
      onError
    } = options;

    // Log detalhado do erro para depuração
    console.error("Erro capturado:", error);
    
    // Tratamento para erros de autenticação (401)
    if (typeof error === "string" && error.includes("401")) {
      // Se for erro de autenticação e existir função de logout, executa
      if (handleLogout) {
        handleLogout();
        ToastAlerta("Sessão expirada. Por favor, faça login novamente.", "info");
      } else {
        ToastAlerta("Erro de autenticação. Verifique suas credenciais.", "erro");
      }
    } 

    // Tratamento para erros de autorização (403)
    else if (typeof error === "string" && error.includes("403")) {
      // Se for erro de autorização executa
      ToastAlerta("Erro de autorização. Verifique suas permissões e tente novamente.", "erro");
    } 

    // Tratamento para erros de servidor (500)
    else if (typeof error === "string" && error.includes("500")) {
      ToastAlerta("Erro no servidor. Tente novamente mais tarde.", "erro");
    }
    // Tratamento para erros de rede
    else if (error instanceof Error && error.message.includes("Network")) {
      ToastAlerta("Erro de conexão. Verifique sua internet.", "erro");
    }

    // Tratamento para erros gerais
    else {
      ToastAlerta(errorMessage, "erro");
    }
    
    // Se existir uma função de callback adicional, executa
    if (onError) {
      onError(error);
    }
    
  }

  /**
   * Cria uma função de tratamento de erro configurada
   */
  static createErrorHandler(options: ErrorHandlerOptions = {}) {
    return (error: unknown) => this.handleError(error, options);
  }

  /**
   * Cria um handler de erro com logout configurado para tratamento de erros
   * comuns ao carregar dados
   */
  static createLoadErrorWithLogout(
    handleLogout: () => void, 
    customErrorMessage: string = "Usuário não autenticado!"
  ) {
    return this.createErrorHandler({
      handleLogout,
      errorMessage: customErrorMessage
    });
  }

}