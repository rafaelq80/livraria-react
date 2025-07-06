import { setupServer } from 'msw/node'
import { handlers } from './mswHandlers'

// Configura o servidor MSW para ambiente Node.js
// Este servidor intercepta requisições HTTP durante os testes
export const server = setupServer(...handlers)