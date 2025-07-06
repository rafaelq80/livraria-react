import { screen, waitFor } from '@testing-library/react';

/**
 * Clica em um botão pelo nome usando regex para busca flexível
 * 
 * @param nomeRegex - Expressão regular para encontrar o botão pelo texto
 * @returns Promise que resolve quando o botão for clicado
 */
export async function clicarBotaoPorNome(nomeRegex: RegExp): Promise<void> {
  const button = await screen.findByRole('button', { name: nomeRegex });
  button.click();
}

/**
 * Espera até que um texto esteja presente na tela, mesmo que fragmentado
 * Útil para verificar se mensagens de erro ou sucesso apareceram
 * 
 * @param texto - Texto a ser verificado na tela
 * @returns Promise que resolve quando o texto for encontrado
 */
export async function esperarTextoNaTela(texto: string): Promise<void> {
  await waitFor(() => {
    const elements = screen.getAllByText((_, element) =>
      element?.textContent?.includes(texto) ?? false
    );
    expect(elements.length).toBeGreaterThan(0);
  });
} 

/**
 * Espera até que uma mensagem de toast do Toastify esteja presente na tela
 * Verifica elementos com role="alert" que são criados pelo Toastify
 * 
 * @param mensagem - Mensagem do toast a ser verificada
 * @returns Promise que resolve quando o toast for encontrado (timeout: 3s)
 */
export async function esperarToastNaTela(mensagem: string): Promise<void> {
  await waitFor(() => {
    const toasts = screen.queryAllByRole('alert');
    const hasToast = toasts.some(toast => toast.textContent?.includes(mensagem));
    expect(hasToast).toBe(true);
  }, { timeout: 3000 });
} 