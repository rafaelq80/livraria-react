import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

// Interface para dados do formulário de autor
interface AutorFormData {
  nome: string;
  nacionalidade?: string;
}

/**
 * Preenche o formulário de autor com nome e, opcionalmente, nacionalidade
 * 
 * @param data - Objeto contendo nome (obrigatório) e nacionalidade (opcional)
 * @returns Promise que resolve quando o formulário for preenchido
 * @throws Error se os campos não forem inputs válidos
 */
export async function preencherFormularioAutor({ nome, nacionalidade }: AutorFormData): Promise<void> {
  // Preenche o campo nome (obrigatório)
  const nomeInput = await screen.findByLabelText(/Nome/i);
  if (!(nomeInput instanceof HTMLInputElement)) throw new Error('Campo nome não é um input');
  await userEvent.clear(nomeInput);
  await userEvent.type(nomeInput, nome);

  // Preenche o campo nacionalidade se fornecido
  if (nacionalidade) {
    const nacionalidadeInput = await screen.findByLabelText(/Nacionalidade/i);
    if (!(nacionalidadeInput instanceof HTMLInputElement)) throw new Error('Campo nacionalidade não é um input');
    await userEvent.clear(nacionalidadeInput);
    await userEvent.type(nacionalidadeInput, nacionalidade);
  }
}

/**
 * Exclui o primeiro autor da lista (clica no botão de excluir e confirma no modal)
 * 
 * Esta função:
 * 1. Encontra todos os botões de excluir
 * 2. Clica no primeiro botão (abre o modal)
 * 3. Encontra o botão de confirmação no modal
 * 4. Clica no botão de confirmação
 * 
 * @returns Promise que resolve quando a exclusão for confirmada
 */
export async function excluirPrimeiroAutorDaLista(): Promise<void> {
  const deleteButtons = await screen.findAllByRole('button', { name: /excluir/i });
  deleteButtons[0].click();
  const confirmButtons = await screen.findAllByRole('button', { name: /excluir/i });
  confirmButtons[confirmButtons.length - 1].click();
}

/**
 * Espera até que um autor seja removido da tabela (não apareça mais na tela)
 * 
 * Verifica se o nome do autor ainda está presente em elementos de tabela
 * Útil para confirmar que a exclusão foi bem-sucedida
 * 
 * @param nome - Nome do autor que deve ser removido
 * @returns Promise que resolve quando o autor não for mais encontrado
 */
export async function esperarRemocaoAutorDaTabela(nome: string): Promise<void> {
  await waitFor(() => {
    const tableCells = screen.queryAllByText(nome);
    const tableElements = tableCells.filter(
      (el) => el.closest('table') || el.closest('[role="row"]')
    );
    expect(tableElements.length).toBe(0);
  });
}

 