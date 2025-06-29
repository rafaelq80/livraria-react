/**
 * Remove caracteres especiais e HTML tags de uma string
 */
export const sanitizeString = (input: string): string => {
  if (!input) return '';
  
  // Remove HTML tags
  const withoutHtml = input.replace(/<[^>]*>/g, '');
  
  // Remove caracteres especiais mantendo acentos
  const sanitized = withoutHtml.replace(/[^\w\s\u00C0-\u00FF]/g, '');
  
  // Remove espaços extras
  return sanitized.trim();
};

/**
 * Sanitiza um número removendo caracteres não numéricos
 */
export const sanitizeNumber = (input: string | number): number => {
  if (typeof input === 'number') return input;
  if (!input) return 0;
  
  // Remove tudo que não for número
  const sanitized = input.replace(/[^\d]/g, '');
  return parseInt(sanitized, 10) || 0;
};

/**
 * Sanitiza um email removendo caracteres inválidos
 */
export const sanitizeEmail = (input: string): string => {
  if (!input) return '';
  
  // Remove espaços e caracteres especiais
  return input.trim().toLowerCase();
};

/**
 * Sanitiza um objeto removendo propriedades undefined/null
 */
export const sanitizeObject = <T extends object>(obj: T): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};

/**
 * Sanitiza um array removendo valores undefined/null
 */
export const sanitizeArray = <T>(arr: (T | null | undefined)[]): T[] => {
  return arr.filter((item): item is T => item !== undefined && item !== null);
};

/**
 * Sanitiza uma URL removendo caracteres inválidos
 */
export const sanitizeUrl = (input: string): string => {
  if (!input) return '';
  
  try {
    const url = new URL(input);
    return url.toString();
  } catch {
    return '';
  }
};

/**
 * Sanitiza um nome próprio (primeira letra maiúscula)
 * Mantém caracteres especiais comuns em nomes como apóstrofos e hífens
 */
export const sanitizeProperName = (input: string): string => {
  if (!input) return '';
  
  // Lista de caracteres especiais permitidos em nomes
  const allowedSpecialChars = /[a-zA-ZÀ-ÿ\s'-]/g;
  
  // Remove caracteres não permitidos
  const cleaned = input.match(allowedSpecialChars)?.join('') ?? '';
  
  return cleaned
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(word => {
      // Preserva apóstrofos e hífens, mas capitaliza a primeira letra
      const firstChar = word.charAt(0).toUpperCase();
      const rest = word.slice(1);
      return firstChar + rest;
    })
    .join(' ');
}; 