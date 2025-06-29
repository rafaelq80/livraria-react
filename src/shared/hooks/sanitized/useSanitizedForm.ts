import { useForm, UseFormProps, FieldValues } from 'react-hook-form';
import { sanitizeString, sanitizeNumber, sanitizeEmail, sanitizeProperName } from '../../../utils/SanitizeUtils';

/**
 * Interface que define as opções de sanitização disponíveis
 * Permite controlar quais tipos de dados devem ser sanitizados
 */
interface SanitizeOptions {
  /** Habilita sanitização de strings (remove caracteres especiais) */
  sanitizeStrings?: boolean;
  /** Habilita sanitização de números (remove caracteres não numéricos) */
  sanitizeNumbers?: boolean;
  /** Habilita sanitização de emails (remove espaços e caracteres inválidos) */
  sanitizeEmails?: boolean;
  /** Habilita sanitização de nomes próprios (capitaliza e remove caracteres especiais) */
  sanitizeNames?: boolean;
}

/**
 * Hook customizado que estende react-hook-form com funcionalidades de sanitização
 * 
 * Este hook adiciona sanitização automática aos dados do formulário antes
 * da submissão, garantindo que os dados estejam limpos e seguros.
 * 
 * Funcionalidades:
 * - Sanitização automática baseada no tipo de campo
 * - Controle granular sobre quais tipos sanitizar
 * - Preservação da API original do react-hook-form
 * - Sanitização apenas no momento da submissão
 * - Suporte a todos os tipos de dados do formulário
 * 
 * @param options Configurações padrão do react-hook-form
 * @param sanitizeOptions Opções de sanitização (todas habilitadas por padrão)
 * @returns Formulário com sanitização automática
 */
export function useSanitizedForm<T extends FieldValues>(
  options: UseFormProps<T>,
  sanitizeOptions: SanitizeOptions = {
    sanitizeStrings: true,
    sanitizeNumbers: true,
    sanitizeEmails: true,
    sanitizeNames: true,
  }
) {
  // Cria o formulário base usando react-hook-form
  const form = useForm<T>(options);

  /**
   * Sanitiza um valor baseado no seu tipo
   * Aplica as funções de sanitização apropriadas conforme as opções configuradas
   * 
   * @param value Valor a ser sanitizado
   * @param type Tipo do valor (string, number, email, name)
   * @returns Valor sanitizado ou o valor original se não for sanitizado
   */
  const sanitizeValue = (value: unknown, type: string) => {
    // Retorna o valor original se for undefined ou null
    if (value === undefined || value === null) return value;

    // Aplica sanitização baseada no tipo e nas opções configuradas
    switch (type) {
      case 'string':
        return sanitizeOptions.sanitizeStrings && typeof value === 'string' ? sanitizeString(value) : value;
      case 'number':
        return sanitizeOptions.sanitizeNumbers && typeof value === 'number' ? sanitizeNumber(value) : value;
      case 'email':
        return sanitizeOptions.sanitizeEmails && typeof value === 'string' ? sanitizeEmail(value) : value;
      case 'name':
        return sanitizeOptions.sanitizeNames && typeof value === 'string' ? sanitizeProperName(value) : value;
      default:
        return value;
    }
  };

  // Preserva a referência original do handleSubmit
  const handleSubmit = form.handleSubmit;

  /**
   * Sobrescreve o handleSubmit original para adicionar sanitização
   * Sanitiza todos os campos antes de chamar o callback onValid
   */
  form.handleSubmit = (onValid, onInvalid) => {
    return handleSubmit(
      (data) => {
        // Sanitiza todos os campos do formulário
        const sanitizedData = Object.entries(data).reduce((acc, [key, value]) => {
          // Determina o tipo do campo baseado nos valores padrão
          const field = (options.defaultValues as Record<string, unknown>)?.[key];
          const type = typeof field;
          
          // Aplica sanitização ao valor
          const sanitizedValue = sanitizeValue(value, type);
          
          // Adiciona apenas valores não undefined ao objeto sanitizado
          if (sanitizedValue !== undefined) {
            acc[key as keyof T] = sanitizedValue as T[keyof T];
          }
          return acc;
        }, {} as T);

        // Chama o callback com os dados sanitizados
        onValid?.(sanitizedData);
      },
      onInvalid
    );
  };

  return form;
} 