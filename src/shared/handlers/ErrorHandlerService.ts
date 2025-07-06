import { ToastAlerta } from "../utils/ToastAlerta";
import messages from "../constants/messages";

/**
 * Opções para configuração do tratamento de erros
 */
export interface ErrorHandlerOptions {
  /** Mensagem de erro customizada para exibir ao usuário */
  errorMessage?: string;
  /** Callback executado após o tratamento do erro */
  onError?: (error: unknown) => void;
  /** Função de logout para casos de erro de autenticação */
  handleLogout?: () => void;
}

/**
 * Interface para erros que possuem propriedade status
 */
interface ErrorWithStatus {
  status: number | string;
}

/**
 * Serviço para tratamento centralizado de erros
 * 
 * Funcionalidades:
 * - Tratamento automático de erros HTTP usando mensagens padronizadas
 * - Mensagens de erro amigáveis
 * - Suporte a logout automático para erros 401
 * - Detecção de erros de rede
 * - Callbacks customizados
 * 
 * @example
 * ```typescript
 * // Uso básico
 * ErrorHandlerService.handleError(error);
 * 
 * // Com opções customizadas
 * ErrorHandlerService.handleError(error, {
 *   errorMessage: "Erro ao salvar dados",
 *   handleLogout: () => logout(),
 *   onError: (error) => console.log(error)
 * });
 * ```
 */
export class ErrorHandlerService {
  /**
   * Verifica se o erro possui propriedade status
   */
  private static isErrorWithStatus(error: unknown): error is ErrorWithStatus {
    return Boolean(
      error && 
      typeof error === "object" && 
      "status" in error && 
      (typeof (error as ErrorWithStatus).status === "number" || 
       typeof (error as ErrorWithStatus).status === "string")
    );
  }

  /**
   * Extrai o código de erro do objeto de erro
   */
  private static extractErrorCode(error: unknown): string | null {
    // Caso 1: Erro com propriedade status
    if (this.isErrorWithStatus(error)) {
      const status = String(error.status);
      return status in messages.error.http ? status : null;
    }

    // Caso 2: String contendo código de erro
    if (typeof error === "string") {
      return this.findErrorCodeInString(error);
    }

    // Caso 3: Objeto Error com mensagem contendo código
    if (error instanceof Error) {
      return this.findErrorCodeInString(error.message);
    }

    return null;
  }

  /**
   * Busca código de erro em uma string
   */
  private static findErrorCodeInString(text: string): string | null {
    const codes = Object.keys(messages.error.http);
    return codes.find(code => text.includes(code)) ?? null;
  }

  /**
   * Verifica se é um erro de rede
   */
  private static isNetworkError(error: unknown): boolean {
    if (error instanceof Error) {
      return error.message.toLowerCase().includes("network") ||
             error.message.toLowerCase().includes("fetch") ||
             error.message.toLowerCase().includes("connection");
    }
    return false;
  }

  /**
   * Extrai mensagem de erro do objeto de erro
   */
  private static extractErrorMessage(error: unknown): string | null {
    // Caso 1: AxiosError com response.data.message
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      if (axiosError.response?.data?.message) {
        return axiosError.response.data.message;
      }
    }

    // Caso 2: String contendo mensagem
    if (typeof error === "string") {
      return error;
    }

    // Caso 3: Error com message
    if (error instanceof Error) {
      return error.message;
    }

    return null;
  }

  /**
   * Trata um erro aplicando as regras de negócio configuradas
   */
  static handleError(error: unknown, options: ErrorHandlerOptions = {}): void {
    const { handleLogout, errorMessage = messages.error.default, onError } = options;

    console.error("Erro capturado:", error);

    // Tenta extrair código de erro HTTP
    const errorCode = this.extractErrorCode(error);
    
    if (errorCode) {
      // Tenta extrair mensagem específica do servidor primeiro
      const serverMessage = this.extractErrorMessage(error);
      
      // Se não houver mensagem específica do servidor, usa a mensagem padrão
      const message = serverMessage ?? messages.error.http[errorCode as '401' | '403' | '404' | '500' | '502' | '503'];
      
      // Tratamento especial para erro 401 (não autorizado)
      if (errorCode === "401" && handleLogout) {
        handleLogout();
        ToastAlerta(message, "info");
      } else {
        ToastAlerta(message, "erro");
      }
      return;
    }
    
    // Verifica se é erro de rede
    if (this.isNetworkError(error)) {
      ToastAlerta(messages.error.network, "erro");
      return;
    }
    
    // Usa mensagem customizada como fallback
    if (errorMessage) {
      ToastAlerta(errorMessage, "erro");
    }
    
    // Executa callback customizado se fornecido
    if (onError) {
      onError(error);
    }
  }

  /**
   * Cria uma função de tratamento de erro com opções pré-configuradas
   */
  static createErrorHandler(options: ErrorHandlerOptions = {}) {
    return (error: unknown) => this.handleError(error, options);
  }
}
