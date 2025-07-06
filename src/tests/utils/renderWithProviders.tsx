import { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { ToastContainer } from 'react-toastify'

// Interface para configuração de rotas
interface RouteConfig {
  path: string;
  element: ReactNode;
}

// Opções estendidas para renderWithProviders
export type RenderWithProvidersOptions = RenderOptions & {
  route?: string; // Rota inicial para o MemoryRouter
  routes?: RouteConfig[]; // Configuração de rotas opcional
}

/**
 * Função utilitária para renderizar componentes React com providers necessários para testes
 * Inclui: MemoryRouter, TooltipProvider e ToastContainer
 * 
 * @param ui - Componente React a ser renderizado
 * @param options - Opções de renderização incluindo configuração de rotas
 * @returns Resultado da renderização com todos os providers configurados
 */
export function renderWithProviders(
  ui: ReactNode,
  { route = '/', routes, ...options }: RenderWithProvidersOptions = {}
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <TooltipProvider>
        <ToastContainer />
        {routes ? (
          // Renderiza com configuração de rotas se fornecida
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        ) : (
          // Renderiza o componente diretamente se não houver rotas
          ui
        )}
      </TooltipProvider>
    </MemoryRouter>,
    options
  )
} 