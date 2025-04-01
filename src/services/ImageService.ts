import { ChangeEvent } from "react";

interface ImageOptions {
  onSuccess?: (imageFile: File, preview: string) => void;
  onError?: (error: unknown) => void;
  fileName?: string;
  fileType?: string;
}

export class ImageService {
  /**
   * Converte uma imagem base64 para um objeto File (arquivo)
   */
  static async convertBase64ToFile(
    base64Image: string, 
    fileName: string = "image.jpg", 
    fileType: string = "image/jpeg"
  ): Promise<File> {
    try {
      const response = await fetch(base64Image);
      const blob = await response.blob();
      return new File([blob], fileName, { type: fileType });
    } catch (error) {
      console.error("Erro ao converter base64 para File:", error);
      throw error;
    }
  }

  /**
   * Processa uma imagem (File ou string base64) e retorna o preview e o arquvo
   */
  static async processImage(
    imageSource: string | File,
    options: ImageOptions = {}
  ): Promise<{ preview: string; file: File }> {
    const { 
      onSuccess, 
      onError, 
      fileName = "image.jpg", 
      fileType = "image/jpeg" 
    } = options;

    try {
      let preview: string = "";
      let file: File;

      if (imageSource instanceof File) {
        // Processar arquivo de imagem
        file = imageSource;
        preview = await this.fileToDataURL(file);
      } else {
        // Processar string base64
        preview = imageSource;
        file = await this.convertBase64ToFile(imageSource, fileName, fileType);
      }

      if (onSuccess) {
        onSuccess(file, preview);
      }

      return { preview, file };
    } catch (error) {
      console.error("Erro ao processar imagem:", error);
      if (onError) {
        onError(error);
      }
      throw error;
    }
  }

  /**
   * Converte um arquivo para uma string DataURL (base64)
   */
  static fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === "string") {
          resolve(result);
        } else {
          reject(new Error("Falha ao converter arquivo para DataURL"));
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Erro ao ler o arquivo"));
      };
      
      reader.readAsDataURL(file);
    });
  }

  /**
   * Manipula a seleção de arquivo via input file
   */
  static handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
    options: ImageOptions = {}
  ): void {
    const file = event.target.files?.[0];
    
    if (file) {
      this.processImage(file, options).catch(error => {
        console.error("Erro ao processar arquivo:", error);
        if (options.onError) {
          options.onError(error);
        }
      });
    }
  }

  /**
   * Cria um hook para gerenciar a lógica de captura de imagens
   */
  static createImageHandler(initialPreview: string = "") {
    let preview = initialPreview;
    let imageFile: File | null = null;
    
    return {
      getPreview: () => preview,
      getFile: () => imageFile,
      
      setPreview: (newPreview: string) => {
        preview = newPreview;
      },
      
      setFile: (newFile: File | null) => {
        imageFile = newFile;
      },
      
      handleImage: async (source: string | File) => {
        try {
          const result = await ImageService.processImage(source);
          preview = result.preview;
          imageFile = result.file;
          return result;
        } catch (error) {
          console.error("Erro ao processar imagem:", error);
          throw error;
        }
      },
      
      reset: () => {
        preview = "";
        imageFile = null;
      }
    };
  }
}