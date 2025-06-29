# Serviços da Aplicação

## AxiosService

Serviço genérico para operações CRUD com a API.

### Uso Básico

```typescript
import { listar, cadastrar, atualizar, deletar } from '@/services/AxiosService';

// Listar produtos
const produtos = await listar<Produto[]>('/produtos');

// Cadastrar produto
const novoProduto = await cadastrar<Produto>('/produtos', dadosProduto);

// Atualizar produto
const produtoAtualizado = await atualizar<Produto>(`/produtos/${id}`, dadosProduto);

// Deletar produto
await deletar(`/produtos/${id}`);
```

## AuthService

Serviço específico para operações de autenticação complementares.

### Funções Disponíveis

```typescript
import { recuperarSenha, resetarSenha, isTokenExpired, decodeToken } from '@/services/AuthService';

// Recuperar senha
const resultado = await recuperarSenha('/auth/recuperar-senha', { usuario: 'email@exemplo.com' });

// Resetar senha
const resultado = await resetarSenha('/auth/resetar-senha', { senha: 'novaSenha', token: 'tokenReset' });

// Verificar se token está expirado
const expirado = isTokenExpired(token);

// Decodificar token JWT
const payload = decodeToken(token);
```

## AuthStore (Zustand)

**IMPORTANTE**: As funções principais de autenticação estão no AuthStore, não nos serviços!

### Funções Disponíveis no AuthStore

```typescript
import { useAuth } from '@/shared/store/AuthStore';

function LoginComponent() {
  const { handleLogin, handleLogout, isAuthenticated, isAdmin, usuario } = useAuth();

  const handleSubmit = async (credentials: UsuarioLogin) => {
    try {
      await handleLogin(credentials);
      // Login bem-sucedido - redirecionamento automático
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  const handleLogoutClick = () => {
    handleLogout();
    // Logout automático - limpa localStorage e estado
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Bem-vindo, {usuario.nome}!</p>
          <button onClick={handleLogoutClick}>Sair</button>
        </div>
      ) : (
        <LoginForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}
```

### Tratamento de Sessão Expirada

```typescript
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/store/AuthStore';
import { ToastAlerta } from '@/utils/ToastAlerta';

function App() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  useEffect(() => {
    // Listener para evento de sessão expirada
    const handleUnauthorized = (event: CustomEvent) => {
      ToastAlerta(event.detail.message, 'warning');
      handleLogout(); // Usa o logout do AuthStore
      navigate('/login');
    };

    window.addEventListener('unauthorized', handleUnauthorized as EventListener);

    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized as EventListener);
    };
  }, [navigate, handleLogout]);

  return (
    // ... JSX
  );
}
```

## Arquitetura Recomendada

### 1. AuthStore (Zustand) - Estado Global
- ✅ `handleLogin()` - Login com persistência
- ✅ `handleLogout()` - Logout com limpeza de estado
- ✅ `isAuthenticated` - Status de autenticação
- ✅ `isAdmin` - Verificação de admin
- ✅ `usuario` - Dados do usuário logado

### 2. AuthService - Operações Específicas
- ✅ `recuperarSenha()` - Recuperação de senha
- ✅ `resetarSenha()` - Reset de senha
- ✅ `isTokenExpired()` - Verificação de expiração
- ✅ `decodeToken()` - Decodificação de JWT

### 3. AxiosService - Operações CRUD Genéricas
- ✅ `listar()` - GET requests
- ✅ `cadastrar()` - POST requests
- ✅ `atualizar()` - PUT requests
- ✅ `deletar()` - DELETE requests

## Por que não usar window.location.href?

### ❌ Problemas com window.location.href:

1. **Recarrega a página inteira** - Perde o estado da aplicação
2. **Não usa o React Router** - Quebra a SPA (Single Page Application)
3. **Performance ruim** - Recarrega todos os recursos
4. **Perde contexto** - Não mantém o estado do Redux/Zustand

### ✅ Benefícios do useNavigate:

1. **Navegação client-side** - Mantém a SPA
2. **Preserva estado** - Não recarrega a aplicação
3. **Melhor performance** - Transição instantânea
4. **Integração com React Router** - Histórico, rotas protegidas, etc.

## Uso Correto

### ✅ CORRETO - Usando AuthStore:

```typescript
import { useAuth } from '@/shared/store/AuthStore';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { handleLogout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout(); // Limpa estado e localStorage
    navigate('/login'); // Navegação React Router
  };

  return (
    <header>
      {isAuthenticated && (
        <button onClick={handleLogoutClick}>
          Sair
        </button>
      )}
    </header>
  );
}
```

### ❌ INCORRETO - Duplicando lógica:

```typescript
// ❌ NÃO FAÇA ISSO - Já existe no AuthStore
const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
``` 