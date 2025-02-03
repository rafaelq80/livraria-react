# Projeto Livraria - Frontend

<br />

<div align="center">
    <img src="https://i.imgur.com/AzshGmS.png" title="source: imgur.com" width="50%"/>
</div>

<br />

## 1. Descrição

O **Projeto Livraria** é um **frontend** desenvolvido com **React** e **Vite**, projetado para consumir uma API Livraria, desenvolvida com **NestJS**. A aplicação proporciona uma interface moderna para o gerenciamento de **Usuários**, **Roles (Direitos de Acesso)**, **Produtos**, **Autores**, **Editoras** e **Categorias**. Além disso, implementa autenticação segura via **JWT** (JSON Web Token), protegendo as rotas e garantindo a segurança da aplicação.

<br />

### 1.1. Principais Funcionalidades

- **Autenticação por Usuário e Senha**: Sistema de login seguro para controlar o acesso de usuários.
- **Gestão de Direitos de Acesso (Roles)**: Controle granular de permissões para diferentes tipos de usuário.
- **Validação de Token JWT**: Proteção de rotas e verificação de tokens para garantir a segurança nas requisições.
- **CRUD de Usuários**: Operações para criação, leitura, atualização e exclusão de perfis de usuários.
- **CRUD de Produtos**: Gerenciamento de produtos no catálogo da livraria.
- **CRUD de Autores**: Gestão de informações sobre autores.
- **CRUD de Editoras**: Gestão das editoras dos produtos.
- **CRUD de Categorias**: Organização dos produtos em diferentes categorias.

------

## 2. Tecnologias Utilizadas

| Item                         | Descrição    |
| ---------------------------- | ------------ |
| **Servidor**                 | Node.js      |
| **Linguagem de Programação** | TypeScript   |
| **Biblioteca**               | React.js     |
| **Build Tool**               | Vite         |
| **Estilização**              | Tailwind CSS |

------

## 3. Pré-requisitos

Antes de iniciar, verifique se as seguintes ferramentas estão instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (v16+)
- [Yarn](https://yarnpkg.com/)
- **Backend da API NestJS**: A API do backend deve estar em execução. Acesse o repositório da API [aqui](https://github.com/rafaelq80/livraria-nest).

------

## 4. Instalação - Ambiente Local

<br />

### 4.1. Clonando o Repositório

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/usuario/livraria-react.git
cd livraria-react
```

<br />

### 4.2. Instalando as Dependências

Instale as dependências necessárias com o Yarn:

```bash
yarn install
```

<br />

### 4.3. Configuração do Ambiente

Certifique-se de que a URL da API NestJS está configurada corretamente em seu arquivo de configuração ou `.env`. O valor padrão é:

```bash
http://localhost:4000
```

<br />

### 4.4. Executando o Projeto

Inicie o servidor de desenvolvimento:

```bash
yarn dev
```

A aplicação estará disponível no endereço: http://localhost:5173

------

## 5. Estrutura do Projeto

A estrutura do projeto segue o padrão recomendado para aplicações React com gerenciamento de estado:

```plaintext
src/
│
├── components/       # Componentes reutilizáveis
├── contexts/         # Gerenciamento de estado global (ex: autenticação)
├── models/           # Estrutura de dados da aplicação
├── pages/            # Páginas da aplicação
├── routes/           # Definição das rotas da aplicação
├── services/         # Integração com a API (requisições HTTP)
├── utils/            # Funções auxiliares (ex: alertas, helpers)
└── App.tsx           # Componente principal da aplicação
```

------

## 6. Autenticação e Validação de Token JWT

<br />

### Fluxo de Autenticação

1. O usuário realiza o login utilizando **e-mail** e **senha**.
2. A aplicação envia uma requisição à API, que retorna um **token JWT**.
3. O token é armazenado na **Context API** para ser utilizado em futuras requisições autenticadas.
4. A aplicação verifica os direitos de acesso do usuário, conforme suas permissões.
5. Nas rotas protegidas, o token JWT é validado antes de conceder o acesso aos recursos.

<br />

### Controle de Autenticação

- **Token Expirado ou Inválido**: Caso o token expire ou seja inválido, o usuário será redirecionado automaticamente para a página de login.
- **Controle de Acesso**: Se o usuário não tiver permissão para acessar uma rota, ele será redirecionado ou verá uma página de erro.

------

## 7. Implementações Futuras

Abaixo estão algumas das funcionalidades que serão implementadas no futuro:

- [ ]  **Carrossel de Imagens**: Exibição de imagens de produtos de forma interativa.
- [ ]  **Simulador de Carrinho de Compras**: Função para simular a compra de produtos.
- [ ]  **Curtidas em Produtos**: Adicionar a possibilidade de curtir produtos.
- [ ]  **Busca de Produtos**: Implementar um campo de busca na página inicial para localizar produtos.
- [ ]  **Atualização de Perfil**: Permitir que os usuários atualizem suas informações de perfil.
- [ ]  **Formulário de Contato**: Implementar um formulário de contato para interação com os usuários.
- [ ]  **Listagem de Produtos por Categoria**: Exibir produtos filtrados por categorias específicas.

------

## 8. Contribuições

Se você deseja contribuir para o desenvolvimento deste projeto, siga as etapas abaixo:

1. **Fork** o repositório.
2. Crie uma **branch** para a sua feature (`git checkout -b minha-feature`).
3. **Commit** suas alterações (`git commit -am 'Adicionando nova feature'`).
4. **Push** para a branch (`git push origin minha-feature`).
5. Abra um **pull request** para revisão.
