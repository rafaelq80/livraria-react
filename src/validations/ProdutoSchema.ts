import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const produtoSchema = z.object({
  id: z.number().optional(),
  titulo: z.string().min(1, "Título é obrigatório"),
  preco: z.coerce.number().min(0.01, "Preço deve ser maior que zero"),
  desconto: z.coerce.number()
    .min(0, "Desconto deve ser no mínimo 0%")
    .max(100, "Desconto não pode ultrapassar 100%")
    .default(0),
  isbn10: z.string().min(1, "ISBN-10 é obrigatório"),
  isbn13: z.string().min(1, "ISBN-13 é obrigatório"),
  foto: z.string().optional().default(""),
      fotoFile: z
        .custom<File | null | undefined>(
          (file) => file instanceof File || file === null || file === undefined,
          { message: "Arquivo inválido" }
        )
        .optional()
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
          message: "Tamanho máximo do arquivo é 5MB",
        })
        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message: "Tipo de arquivo não suportado. Formatos aceitos: JPG, PNG e WEBP",
        }),
  categoria: z.object({
    id: z.number().min(1, "Categoria é obrigatória"),
    tipo: z.string().optional(),
  }),
  editora: z.object({
    id: z.number().min(1, "Editora é obrigatória"),
    nome: z.string().optional(),
  }),
  autores: z.array(
    z.object({
      id: z.number(),
      nome: z.string(),
    })
  ).min(1, "Selecione pelo menos um autor")
});

export type ProdutoSchemaType = z.infer<typeof produtoSchema>;