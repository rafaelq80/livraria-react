import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

// Função para validar ISBN-10
const isValidISBN10 = (isbn: string) => {
  // Remove hífens ou espaços
  const cleanedISBN = isbn.replace(/[-\s]/g, '');
  
  // Verifica se tem exatamente 10 caracteres
  if (cleanedISBN.length !== 10) {
    return false;
  }
  
  // Verifica se os primeiros 9 caracteres são dígitos e o último pode ser dígito ou 'X'
  if (!/^\d{9}[\dX]$/.test(cleanedISBN)) {
    return false;
  }
  
  // Calcula o dígito verificador (checksum)
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanedISBN[i]) * (10 - i);
  }
  
  // Verifica o último dígito (ou 'X')
  const checkDigit = cleanedISBN[9];
  const calculatedChecksum = (11 - (sum % 11)) % 11;
  
  if (checkDigit === 'X') {
    return calculatedChecksum === 10;
  } else {
    return parseInt(checkDigit) === calculatedChecksum;
  }
};

// Função para validar ISBN-13
const isValidISBN13 = (isbn: string) => {
  // Remove hífens ou espaços
  const cleanedISBN = isbn.replace(/[-\s]/g, '');
  
  // Verifica se tem exatamente 13 caracteres
  if (cleanedISBN.length !== 13) {
    return false;
  }
  
  // Verifica se são todos dígitos
  if (!/^\d{13}$/.test(cleanedISBN)) {
    return false;
  }
  
  // Verifica se começa com 978 ou 979 (prefixos padrão)
  if (!cleanedISBN.startsWith('978') && !cleanedISBN.startsWith('979')) {
    return false;
  }
  
  // Calcula o dígito verificador (checksum)
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanedISBN[i]) * (i % 2 === 0 ? 1 : 3);
  }
  
  const checkDigit = parseInt(cleanedISBN[12]);
  const calculatedChecksum = (10 - (sum % 10)) % 10;
  
  return checkDigit === calculatedChecksum;
};

export const produtoSchema = z.object({
  id: z.number().optional(),
  titulo: z.string().min(1, "Título é obrigatório"),
  preco: z.coerce.number().min(0.01, "Preço deve ser maior que zero"),
  desconto: z.coerce.number()
    .min(0, "Desconto deve ser no mínimo 0%")
    .max(100, "Desconto não pode ultrapassar 100%")
    .default(0),
  isbn10: z.string()
    .min(1, "ISBN-10 é obrigatório")
    .refine(value => isValidISBN10(value), {
      message: "ISBN-10 inválido. Deve conter 10 caracteres no formato correto (ex: 0-306-40615-2)"
    }),
  isbn13: z.string()
    .min(1, "ISBN-13 é obrigatório")
    .refine(value => isValidISBN13(value), {
      message: "ISBN-13 inválido. Deve conter 13 dígitos e começar com 978 ou 979 (ex: 978-3-16-148410-0)"
    }),
  
  // Novos campos adicionados
  descricao: z.string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres")
    .max(5000, "A descrição não pode exceder 5000 caracteres")
    .default(""),
  
  paginas: z.coerce.number()
    .int("O número de páginas deve ser um número inteiro")
    .positive("O número de páginas deve ser positivo")
    .min(1, "O livro deve ter pelo menos 1 página")
    .optional()
    .default(0),
  
  idioma: z.string()
    .min(2, "Informe o idioma do livro")
    .optional()
    .default("Português"),
  
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