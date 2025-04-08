import { ChangeEvent, useEffect, useRef, useState } from "react"
import { ImageService } from "../../services/ImageService"
import { ErrorHandlerService } from "../../services/ErrorHandlerService"
import { Path, PathValue, UseFormSetValue } from "react-hook-form"
import { WithFotoFile } from "../../types/CampoFotoTypes"


interface UseCampoFotoProps<T extends WithFotoFile> {
  setValue: UseFormSetValue<T>
  initialPreview?: string
}

export function useCampoFoto<T extends WithFotoFile>({ setValue, initialPreview = "" }: UseCampoFotoProps<T>) {
  const [photoPreview, setPhotoPreview] = useState(initialPreview)
  const [openCamera, setOpenCamera] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialPreview) {
      setPhotoPreview(initialPreview)
    }
  }, [initialPreview])
  
  // Usando o ImageService para processar imagens
  const handleImageUpdate = async (imageSource: string | File) => {
    try {
      const { preview, file } = await ImageService.processImage(imageSource, {
        fileName: "user-photo.jpg",
        fileType: "image/jpeg",
      })

      setPhotoPreview(preview)
      setValue("fotoFile" as Path<T>, file as unknown as PathValue<T, Path<T>>, { shouldValidate: true })
    } catch (error) {
      ErrorHandlerService.handleError(error, {
        errorMessage: "Erro ao processar imagem!",
      })
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    ImageService.handleFileChange(e, {
      onSuccess: (file, preview) => {
        setPhotoPreview(preview)
        setValue("fotoFile" as Path<T>, file as unknown as PathValue<T, Path<T>>, { shouldValidate: true })
      },
      onError: (error) => {
        ErrorHandlerService.handleError(error, {
          errorMessage: "Erro ao selecionar imagem!",
        })
      },
    })
  }

  const handleFileSelect = () => fileInputRef.current?.click()

  const capturePhoto = (imageSrc: string) => {
    handleImageUpdate(imageSrc)
    setOpenCamera(false)
  }

  return {
    photoPreview,
    setPhotoPreview,
    openCamera,
    setOpenCamera,
    fileInputRef,
    cameraInputRef,
    handleFileChange,
    handleFileSelect,
    capturePhoto
  }
}