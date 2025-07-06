import { http, HttpResponse } from 'msw'
import messages from '../shared/constants/messages';

// URL base da API para interceptação
const API_URL = 'https://livraria-nest.onrender.com'

// Interface que define a estrutura de um autor
interface Autor {
  id: number
  nome: string
  nacionalidade: string
}

// Dados mockados para simular autores no backend
const autoresMock: Autor[] = [
  { id: 1, nome: 'Autor 1', nacionalidade: 'Brasileira' },
  { id: 2, nome: 'Autor 2', nacionalidade: 'Portuguesa' },
]

// --- Controle de mocks dinâmicos para simular cenários de erro ---
// Permite simular diferentes status HTTP durante os testes
let mockAutorGetError: null | number = null; // null = sucesso, 404 = not found, 500 = erro interno
let mockAutorPostError: null | number = null;
let _forceDeleteError = false;

// Funções para controlar os mocks de erro
export function setForceDeleteError(val: boolean) { _forceDeleteError = val; }
export function getForceDeleteError() { return _forceDeleteError; }

export function setMockAutorGetError(status: number | null) {
  mockAutorGetError = status;
}

export function setMockAutorPostError(status: number | null) {
  mockAutorPostError = status;
}

export function resetMockAutorErrors() {
  mockAutorGetError = null;
  mockAutorPostError = null;
}

export { autoresMock };

// Handlers MSW para interceptar requisições HTTP
export const handlers = [
  // GET /autores - Listar todos os autores
  http.get(`${API_URL}/autores`, ({ request }) => {
    // Verifica se há token de autenticação no header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json({ message: messages.auth.loginRequired }, { status: 401 });
    }
    return HttpResponse.json(autoresMock, { status: 200 })
  }),

  // GET /autores/:id - Buscar autor por ID
  http.get(`${API_URL}/autores/:id`, ({ params }) => {
    // Simula erro se configurado
    if (mockAutorGetError) {
      return HttpResponse.json({ message: 'Erro simulado' }, { status: mockAutorGetError });
    }
    const id = Number(params.id)
    const autor = autoresMock.find(a => a.id === id)
    if (autor) {
      return HttpResponse.json(autor, { status: 200 })
    }
    return HttpResponse.json({ message: messages.autor.notFound }, { status: 404 })
  }),

  // POST /autores - Criar novo autor
  http.post(`${API_URL}/autores`, async ({ request }) => {
    // Simula erro se configurado
    if (mockAutorPostError) {
      return HttpResponse.json({ message: 'Erro simulado' }, { status: mockAutorPostError });
    }
    try {
      const novoAutor = await request.json() as Omit<Autor, 'id'>
      // Valida se o nome foi fornecido
      if (!novoAutor.nome) {
        return HttpResponse.json(
          { message: messages.autor.required.nome }, 
          { status: 400 }
        )
      }
      // Cria autor com ID único e adiciona ao mock
      const autorComId: Autor = { 
        ...novoAutor, 
        id: autoresMock.length + 1 
      }
      autoresMock.push(autorComId)
      return HttpResponse.json(autorComId, { status: 201 })
    } catch {
      return HttpResponse.json(
        { message: messages.autor.genericError }, 
        { status: 400 }
      )
    }
  }),

  // PUT /autores - Atualizar autor existente
  http.put(`${API_URL}/autores`, async ({ request }) => {
    try {
      const dadosAtualizados = await request.json();
      // Valida se os dados são válidos
      if (!dadosAtualizados || typeof dadosAtualizados !== 'object' || !('id' in dadosAtualizados)) {
        return HttpResponse.json({ message: 'Dados inválidos' }, { status: 400 });
      }
      const id = Number(dadosAtualizados.id);
      const index = autoresMock.findIndex(a => a.id === id);
      if (index !== -1) {
        // Atualiza o autor mantendo o ID original
        autoresMock[index] = {
          ...autoresMock[index],
          ...(dadosAtualizados as Record<string, unknown>),
          id // Garante que o ID não seja alterado
        };
        return HttpResponse.json(autoresMock[index], { status: 200 });
      }
      return HttpResponse.json({ message: messages.autor.notFound }, { status: 404 });
    } catch {
      return HttpResponse.json({ message: 'Dados inválidos' }, { status: 400 });
    }
  }),

  // DELETE /autores/:id - Excluir autor
  http.delete(`${API_URL}/autores/:id`, ({ params }) => {
    // Simula erro de exclusão se configurado
    if (_forceDeleteError) {
      _forceDeleteError = false;
      return HttpResponse.json({ message: messages.auth.loginRequired }, { status: 404 });
    }
    const id = Number(params.id)
    const index = autoresMock.findIndex(a => a.id === id)
    if (index !== -1) {
      // Remove o autor do array mock
      autoresMock.splice(index, 1)
      return new HttpResponse(null, { status: 204 })
    }
    // Retorna erro se autor não for encontrado
    return HttpResponse.json(
      { message: messages.autor.notFound },
      { status: 404 }
    )
  })
] 