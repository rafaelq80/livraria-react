import { ToastAlerta } from "../utils/ToastAlerta";

export interface ErrorHandlerOptions {
  errorMessage?: string;
  onError?: (error: unknown) => void;
  handleLogout?: () => void;
}

interface ErrorMessages {
  [key: string]: string;
}

interface ErrorWithStatus {
  status: number | string;
}

export class ErrorHandlerService {
  private static readonly HTTP_ERROR_MESSAGES: ErrorMessages = {
    "401": "Acesso Negado!",
    "403": "Erro de autorização. Contate o Administrador.",
    "500": "Erro no servidor. Tente novamente mais tarde."
  };

  private static readonly NETWORK_ERROR_MESSAGE = "Erro de conexão. Verifique sua internet.";

  private static isErrorWithStatus(error: unknown): error is ErrorWithStatus {
    return Boolean(
      error && 
      typeof error === "object" && 
      "status" in error && 
      (typeof (error as ErrorWithStatus).status === "number" || 
       typeof (error as ErrorWithStatus).status === "string")
    );
  }

  private static getErrorCode(error: unknown): string | null {
    if (typeof error === "string") {
      for (const code of Object.keys(this.HTTP_ERROR_MESSAGES)) {
        if (error.includes(code)) {
          return code;
        }
      }
    } else if (error instanceof Error) {
      const errorMsg = error.message;
      for (const code of Object.keys(this.HTTP_ERROR_MESSAGES)) {
        if (errorMsg.includes(code)) {
          return code;
        }
      }
    } else if (this.isErrorWithStatus(error)) {
      const status = String(error.status);
      if (this.HTTP_ERROR_MESSAGES[status]) {
        return status;
      }
    }
    return null;
  }

  static handleError(error: unknown, options: ErrorHandlerOptions = {}): void {
    const { handleLogout, errorMessage = "Erro ao processar solicitação!", onError } = options;

    console.error("Erro capturado:", error);

    const errorCode = this.getErrorCode(error);
    let messageDisplayed = false;

    if (errorCode) {
      const message = this.HTTP_ERROR_MESSAGES[errorCode];
      if (errorCode === "401" && handleLogout) {
        handleLogout();
        ToastAlerta(message, "info");
      } else {
        ToastAlerta(message, "erro");
      }
      messageDisplayed = true;
    }
    
    if (!messageDisplayed && error instanceof Error && error.message.includes("Network")) {
      ToastAlerta(this.NETWORK_ERROR_MESSAGE, "erro");
      messageDisplayed = true;
    }
    
    if (!messageDisplayed && errorMessage) {
      ToastAlerta(errorMessage, "erro");
    }
    
    if (onError) {
      onError(error);
    }
  }

  static createErrorHandler(options: ErrorHandlerOptions = {}) {
    return (error: unknown) => this.handleError(error, options);
  }

  static registerErrorMessages(customMessages: ErrorMessages): void {
    Object.assign(this.HTTP_ERROR_MESSAGES, customMessages);
  }
}
