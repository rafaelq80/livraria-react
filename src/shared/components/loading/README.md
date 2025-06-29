# Componentes de Loading

Este módulo fornece componentes padronizados para exibição de estados de carregamento em toda a aplicação.

## Componentes Disponíveis

### 1. LoadingSpinner (Componente Base)
Componente base com configurações flexíveis para todos os tipos de loading.

### 2. PageLoadingSpinner
Variante para carregamento de páginas completas. Ocupa toda a tela com overlay.

### 3. InlineLoadingSpinner
Variante para carregamento inline de componentes. Não centraliza, ideal para loading inline.

### 4. ContainerLoadingSpinner
Variante para carregamento centralizado dentro de containers específicos. **Não ocupa a tela toda**, apenas o componente pai.

### 5. TransparentContainerLoadingSpinner
Variante para carregamento dentro de containers sem overlay. Centraliza sem fundo semi-transparente.

### 6. StrictContainerLoadingSpinner ⭐ **NOVO**
Variante que carrega **ESTRITAMENTE dentro do componente pai**. Usa apenas flex para centralizar, sem posicionamento absolute ou fixed.

## Exemplos de Uso

### StrictContainerLoadingSpinner - Loading estritamente dentro do componente

```tsx
import { StrictContainerLoadingSpinner } from '@/shared/components/loading'

function MinhaSecao() {
  const [loading, setLoading] = useState(false)
  
  return (
    <div className="border rounded-lg p-4">
      {loading ? (
        <StrictContainerLoadingSpinner text="Carregando dados..." />
      ) : (
        <div>
          <h2>Minha Seção</h2>
          <p>Conteúdo da seção...</p>
        </div>
      )}
    </div>
  )
}
```

### StrictContainerLoadingSpinner com altura customizada

```tsx
import { StrictContainerLoadingSpinner } from '@/shared/components/loading'

function MinhaSecao() {
  const [loading, setLoading] = useState(false)
  
  return (
    <div className="border rounded-lg p-4">
      {loading ? (
        <StrictContainerLoadingSpinner 
          text="Carregando..." 
          className="min-h-[300px]"
        />
      ) : (
        <div>
          <h2>Minha Seção</h2>
          <p>Conteúdo da seção...</p>
        </div>
      )}
    </div>
  )
}
```

### ContainerLoadingSpinner - Loading dentro de uma seção específica

```tsx
import { ContainerLoadingSpinner } from '@/shared/components/loading'

function MinhaSecao() {
  const [loading, setLoading] = useState(false)
  
  return (
    <div className="relative min-h-[200px]">
      {loading && <ContainerLoadingSpinner text="Carregando dados..." />}
      {/* Conteúdo da seção */}
      <div className="p-4">
        <h2>Minha Seção</h2>
        <p>Conteúdo da seção...</p>
      </div>
    </div>
  )
}
```

### TransparentContainerLoadingSpinner - Loading sem overlay

```tsx
import { TransparentContainerLoadingSpinner } from '@/shared/components/loading'

function MinhaSecao() {
  const [loading, setLoading] = useState(false)
  
  return (
    <div className="relative min-h-[200px]">
      {loading && <TransparentContainerLoadingSpinner text="Carregando..." />}
      {/* Conteúdo da seção */}
      <div className="p-4">
        <h2>Minha Seção</h2>
        <p>Conteúdo da seção...</p>
      </div>
    </div>
  )
}
```

### ContainerLoadingSpinner customizado

```tsx
import { ContainerLoadingSpinner } from '@/shared/components/loading'

function MinhaSecao() {
  const [loading, setLoading] = useState(false)
  
  return (
    <div className="relative min-h-[200px]">
      {loading && (
        <ContainerLoadingSpinner 
          text="Processando..." 
          size={32}
          color="#dc2626"
          overlay={true}
        />
      )}
      {/* Conteúdo da seção */}
    </div>
  )
}
```

## Diferenças entre as Variantes

| Variante | Posicionamento | Overlay | Uso Recomendado |
|----------|----------------|---------|-----------------|
| `PageLoadingSpinner` | Tela toda (fixed) | Sim | Carregamento de páginas completas |
| `ContainerLoadingSpinner` | Container pai (absolute) | Sim | Seções específicas com overlay |
| `TransparentContainerLoadingSpinner` | Container pai (absolute) | Não | Seções específicas sem overlay |
| `StrictContainerLoadingSpinner` | **Dentro do componente (flex)** | Não | **Loading estritamente dentro do componente** |
| `InlineLoadingSpinner` | Inline | Não | Loading inline simples |

## Importação

```tsx
import { 
  LoadingSpinner,
  PageLoadingSpinner,
  InlineLoadingSpinner,
  ContainerLoadingSpinner,
  TransparentContainerLoadingSpinner,
  StrictContainerLoadingSpinner
} from '@/shared/components/loading'
``` 