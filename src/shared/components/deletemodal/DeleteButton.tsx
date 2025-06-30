import { TrashIcon } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";
import DeleteConfirmationModal from "./DeleteModal";
import { TooltipWrapper } from "../tooltipbutton/TooltipButton";

/**
 * Interface que define as propriedades do componente de botão de exclusão
 */
interface DeleteButtonProps<T> {
  /** Dados do item a ser excluído */
  item: T;
  
  /** Função que executa a exclusão e retorna uma Promise */
  onDelete: (item: T) => Promise<void>;
  
  /** Função chamada após exclusão bem-sucedida */
  onDeleteSuccess?: () => void;
  
  /** Personalização do texto e aparência */
  buttonLabel?: string;
  buttonIcon?: ReactNode;
  buttonClassName?: string;
  modalTitle?: string;
  
  /** Nome do item a ser exibido na mensagem de confirmação */
  itemName?: string;
  
  /** Mensagem completa customizada (para compatibilidade) */
  message?: ReactNode;
  
  /** Textos dos botões */
  confirmButtonText?: string;
  cancelButtonText?: string;
  
  /** Indica se o botão está desabilitado */
  disabled?: boolean;

  /** Tooltip label para exibir tooltip nativo */
  tooltipLabel?: string;
}

/**
 * Componente genérico para botão de exclusão com modal de confirmação
 * Funcionalidades:
 * - Botão de exclusão customizável
 * - Modal de confirmação integrado
 * - Estado de carregamento durante exclusão
 * - Tratamento de erros
 * - Callback de sucesso
 * - Personalização completa de textos e estilos
 * - Suporte nativo a tooltip
 */
function DeleteButton<T>({
  item,
  onDelete,
  onDeleteSuccess,
  buttonLabel = "Excluir",
  buttonIcon = <TrashIcon size={32} className="h-5 w-5" />,
  buttonClassName = "text-red-500 cursor-pointer rounded-full p-1 focus:outline-none focus:ring-0 focus:shadow-none hover:bg-transparent",
  modalTitle = "Confirmar exclusão",
  itemName,
  message,
  confirmButtonText = "Excluir",
  cancelButtonText = "Cancelar",
  disabled = false,
  tooltipLabel
}: Readonly<DeleteButtonProps<T>>) {
  // Estado para controlar o modal e o carregamento
  const [modalState, setModalState] = useState<{ isOpen: boolean, isLoading: boolean }>({
    isOpen: false,
    isLoading: false
  });

  /**
   * Abre o modal de confirmação
   */
  const handleOpenModal = () => setModalState(prev => ({ ...prev, isOpen: true }));
  
  /**
   * Fecha o modal de confirmação
   */
  const handleCloseModal = () => setModalState(prev => ({ ...prev, isOpen: false }));

  /**
   * Executa a exclusão do item
   * Gerencia o estado de carregamento e tratamento de erros
   */
  const handleDelete = async () => {
    setModalState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await onDelete(item);
      onDeleteSuccess?.();
    } catch (error) {
      console.error("Erro ao excluir:", error);
    } finally {
      setModalState({ isOpen: false, isLoading: false });
    }
  };

  const button = (
    <button
      onClick={handleOpenModal}
      className={buttonClassName}
      aria-label={buttonLabel}
      disabled={disabled}
      {...(!tooltipLabel ? { title: buttonLabel } : {})}
      type="button"
    >
      {buttonIcon}
    </button>
  );

  return (
    <>
      {/* Botão de exclusão customizável, agora com suporte a tooltip nativo */}
      {tooltipLabel ? (
        <TooltipWrapper label={tooltipLabel}>
          {button}
        </TooltipWrapper>
      ) : (
        button
      )}

      {/* Modal de confirmação integrado */}
      <DeleteConfirmationModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        title={modalTitle}
        itemName={itemName}
        message={message}
        confirmButtonText={confirmButtonText}
        cancelButtonText={cancelButtonText}
        isLoading={modalState.isLoading}
      />
    </>
  );
}

export default DeleteButton;