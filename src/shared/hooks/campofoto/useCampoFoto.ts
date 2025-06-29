import { ChangeEvent, useEffect, useRef, useState, useCallback } from "react";
import { ImageService } from "../../../services/ImageService";
import { ErrorHandlerService } from "../../../services/ErrorHandlerService";
import { Path, PathValue, UseFormSetValue } from "react-hook-form";
import { WithFotoFile } from "../../types/CampoFotoTypes";

/**
 * Interface que define as propriedades do hook de campo de foto
 */
interface UseCampoFotoProps<T extends WithFotoFile> {
  /** Função para atualizar valores do formulário */
  setValue: UseFormSetValue<T>;
  /** Nome do campo de foto no formulário */
  photoFieldName: Path<T>;
  /** URL da imagem de preview inicial */
  initialPreview?: string;
}

/**
 * Hook customizado para gerenciar campo de foto com funcionalidades de:
 * - Upload e processamento de imagens
 * - Preview de imagem em tempo real
 * - Integração com react-hook-form
 * - Captura de fotos via webcam
 * - Tratamento de erros centralizado
 * - Otimização de performance com useCallback
 * - Reset automático baseado em initialPreview
 */
export function useCampoFoto<T extends WithFotoFile>({ 
  setValue, 
  photoFieldName, 
  initialPreview = "" 
}: UseCampoFotoProps<T>) {
  // Estado para URL do preview da imagem
  const [photoPreview, setPhotoPreview] = useState(initialPreview);
  // Estado para controlar abertura do modal de câmera
  const [openCamera, setOpenCamera] = useState(false);
  
  // Referência para o input de arquivo oculto
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  /**
   * Efeito que sincroniza o preview com initialPreview
   * Reseta o formulário quando initialPreview muda
   */
  useEffect(() => {
    // Reset completo quando initialPreview muda ou está vazio
    setPhotoPreview(initialPreview || "");
    
    // Se initialPreview não existir, certifique-se que o valor do formulário também seja reset
    if (!initialPreview) {
      setValue('fotoFile' as Path<T>, undefined as unknown as PathValue<T, Path<T>>, { 
        shouldValidate: false 
      });
    }
  }, [initialPreview, setValue]);
  
  /**
   * Função otimizada para atualizar o valor do formulário
   * Usa useCallback para evitar re-renders desnecessários
   */
  const updateFormValue = useCallback((file: File) => {
    setValue(
      photoFieldName, 
      file as unknown as PathValue<T, Path<T>>, 
      { shouldValidate: true }
    );
  }, [setValue, photoFieldName]);

  /**
   * Processa imagem (string ou File) e atualiza preview e formulário
   * Suporta tanto URLs quanto arquivos de imagem
   */
  const handleImageUpdate = useCallback(async (imageSource: string | File) => {
    try {
      const { preview, file } = await ImageService.processImage(imageSource, {
        fileName: "user-photo.jpg",
        fileType: "image/jpeg",
      });

      setPhotoPreview(preview);
      updateFormValue(file);
    } catch (error) {
      ErrorHandlerService.handleError(error, {
        errorMessage: "Erro ao processar imagem!",
      });
    }
  }, [updateFormValue]);

  /**
   * Manipula mudança no input de arquivo
   * Valida e processa o arquivo selecionado
   */
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    ImageService.handleFileChange(e, {
      onSuccess: (file, preview) => {
        setPhotoPreview(preview);
        updateFormValue(file);
      },
      onError: (error) => {
        ErrorHandlerService.handleError(error, {
          errorMessage: "Erro ao selecionar imagem!",
        });
      },
    });
  }, [updateFormValue]);

  /**
   * Abre o seletor de arquivo programaticamente
   * Simula clique no input file oculto
   */
  const handleFileSelect = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  /**
   * Processa foto capturada via webcam
   * Fecha o modal após processamento
   */
  const capturePhoto = useCallback((imageSrc: string) => {
    handleImageUpdate(imageSrc);
    setOpenCamera(false);
  }, [handleImageUpdate]);

  return {
    photoPreview,
    setPhotoPreview,
    openCamera,
    setOpenCamera,
    fileInputRef,
    handleFileChange,
    handleFileSelect,
    capturePhoto
  };
}