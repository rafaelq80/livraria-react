import { Trash } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal";

interface DeleteButtonProps<T> {
  // Dados do item a ser excluído
  item: T;
  
  // Função que executa a exclusão e retorna uma Promise
  onDelete: (item: T) => Promise<void>;
  
  // Função chamada após exclusão bem-sucedida
  onDeleteSuccess?: () => void;
  
  // Personalização do texto e aparência
  buttonLabel?: string;
  buttonIcon?: ReactNode;
  buttonClassName?: string;
  modalTitle?: string;
  
  // Nome do item a ser exibido na mensagem de confirmação
  itemName?: string;
  
  // Mensagem completa (para compatibilidade)
  message?: ReactNode;
  
  // Textos dos botões
  confirmButtonText?: string;
  cancelButtonText?: string;
  
  // Item desabilitado
  disabled?: boolean;
}

/**
 * Componente genérico para botão de exclusão com modal de confirmação
 */
function DeleteButton<T>({
  item,
  onDelete,
  onDeleteSuccess,
  buttonLabel = "Excluir",
  buttonIcon = <Trash size={32} className="h-5 w-5" />,
  buttonClassName = "text-red-500 hover:text-red-700 cursor-pointer rounded-full p-1",
  modalTitle = "Confirmar exclusão",
  itemName,
  message,
  confirmButtonText = "Excluir",
  cancelButtonText = "Cancelar",
  disabled = false
}: DeleteButtonProps<T>) {
  const [modalState, setModalState] = useState<{ isOpen: boolean, isLoading: boolean }>({
    isOpen: false,
    isLoading: false
  });

  const handleOpenModal = () => setModalState(prev => ({ ...prev, isOpen: true }));
  const handleCloseModal = () => setModalState(prev => ({ ...prev, isOpen: false }));

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

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={buttonClassName}
        aria-label={buttonLabel}
        disabled={disabled}
        title={buttonLabel}
        type="button"
      >
        {buttonIcon}
      </button>

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