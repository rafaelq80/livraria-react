import '@testing-library/jest-dom'
import { server } from './mswServer'

// Configuração do interceptor XMLHttpRequest para ambiente de teste
// Necessário para interceptar requisições HTTP do Axios no Node/Vitest
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest'

const xhrInterceptor = new XMLHttpRequestInterceptor()
xhrInterceptor.apply()

// Configuração global dos testes
beforeAll(() => {
  // Inicia o servidor MSW para interceptar requisições HTTP
  // onUnhandledRequest: 'error' - Falha o teste se uma requisição não for mockada
  server.listen({
    onUnhandledRequest: 'error',
  })
})

afterEach(() => {
  // Reseta os handlers após cada teste para garantir isolamento
  // Evita que mocks de um teste afetem outros testes
  server.resetHandlers()
})

afterAll(() => {
  // Limpa recursos após todos os testes
  // Fecha o servidor MSW e remove o interceptor XMLHttpRequest
  server.close()
  xhrInterceptor.dispose()
})