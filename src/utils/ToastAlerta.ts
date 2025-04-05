import { toast, ToastOptions, ToastPosition } from "react-toastify";

export function ToastAlerta(mensagem: string, tipo: string) {
  if (toast.isActive(mensagem)) return; // Evita toasts duplicados

  const config: ToastOptions = {
    position: "top-right" as ToastPosition, // Converte para o tipo correto
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "colored",
    progress: undefined,
    toastId: mensagem, // Evita toasts duplicados
  };

  switch (tipo) {
    case "sucesso":
      toast.success(mensagem, config);
      break;
    case "erro":
      toast.error(mensagem, config);
      break;
    case "info":
    default:
      toast.info(mensagem, config);
      break;
  }
}
