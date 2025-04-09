import { ChangeEvent, useEffect, useRef, useState, useCallback } from "react";
import { ImageService } from "../../services/ImageService";
import { ErrorHandlerService } from "../../services/ErrorHandlerService";
import { Path, PathValue, UseFormSetValue } from "react-hook-form";
import { WithFotoFile } from "../../types/CampoFotoTypes";

interface UseCampoFotoProps<T extends WithFotoFile> {
  setValue: UseFormSetValue<T>;
  photoFieldName: Path<T>; // Adicionar o nome do campo diretamente
  initialPreview?: string;
}

export function useCampoFoto<T extends WithFotoFile>({ 
  setValue, 
  photoFieldName, 
  initialPreview = "" 
}: UseCampoFotoProps<T>) {
  const [photoPreview, setPhotoPreview] = useState(initialPreview);
  const [openCamera, setOpenCamera] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
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
  
  // Usando useCallback para funções que não mudam frequentemente
  const updateFormValue = useCallback((file: File) => {
    setValue(
      photoFieldName, 
      file as unknown as PathValue<T, Path<T>>, 
      { shouldValidate: true }
    );
  }, [setValue, photoFieldName]);

  // Processamento de imagem otimizado e com useCallback
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

  const handleFileSelect = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

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