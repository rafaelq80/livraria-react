import { z } from "zod";

export const produtoSchema = z.object({
  id: z.number().optional(),
  titulo: z.string().min(1, "Título é obrigatório"),
  preco: z.coerce.number().min(0.01, "Preço deve ser maior que zero"),
  isbn10: z.string().min(1, "ISBN-10 é obrigatório"),
  isbn13: z.string().min(1, "ISBN-13 é obrigatório"),
  foto: z.string().url("Formato de URL inválido").min(1, "URL da foto é obrigatória"),
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