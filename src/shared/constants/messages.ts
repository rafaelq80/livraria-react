const messages = {
  // Mensagens de erro padronizadas
  error: {
    // Erros HTTP
    http: {
      401: 'Acesso Negado!',
      403: 'Erro de autorização. Contate o Administrador.',
      404: 'Recurso não encontrado.',
      500: 'Erro no servidor. Tente novamente mais tarde.',
      502: 'Servidor temporariamente indisponível.',
      503: 'Serviço temporariamente indisponível.',
    },
    // Erros de rede
    network: 'Erro de conexão. Verifique sua internet.',
    // Erros genéricos
    generic: 'Ocorreu um erro inesperado.',
    default: 'Erro ao processar solicitação!',
  },

  // Mensagens específicas por entidade
  autor: {
    required: {
      nome: 'Nome é obrigatório',
    },
    minLength: 'Nome deve ter pelo menos 2 caracteres',
    notFound: 'Autor não encontrado',
    emptyList: 'Nenhum autor cadastrado',
    saveError: 'Erro ao salvar o autor!',
    createSuccess: 'Autor(a) cadastrado(a) com sucesso!',
    updateSuccess: 'Autor(a) atualizado(a) com sucesso!',
    deleteSuccess: 'Autor(a) excluído(a) com sucesso!',
    deleteError: 'Erro ao excluir o autor!',
    loadError: 'Erro ao carregar autores',
    createError: 'Erro ao cadastrar autor!',
    updateError: 'Erro ao atualizar autor!',
    genericError: 'Ocorreu um erro inesperado.',
  },

  categoria: {
    required: {
      tipo: 'Categoria é obrigatória',
    },
    minLength: 'Categoria deve ter pelo menos 2 caracteres',
    notFound: 'Categoria não encontrada',
    emptyList: 'Nenhuma categoria cadastrada',
    saveError: 'Erro ao salvar a categoria!',
    createSuccess: 'Categoria cadastrada com sucesso!',
    updateSuccess: 'Categoria atualizada com sucesso!',
    deleteSuccess: 'Categoria excluída com sucesso!',
    deleteError: 'Erro ao excluir a categoria!',
    loadError: 'Erro ao carregar categorias',
    createError: 'Erro ao cadastrar categoria!',
    updateError: 'Erro ao atualizar categoria!',
  },

  editora: {
    notFound: 'Editora não encontrada',
    emptyList: 'Nenhuma editora cadastrada',
    saveError: 'Erro ao salvar a editora!',
    createSuccess: 'Editora cadastrada com sucesso!',
    updateSuccess: 'Editora atualizada com sucesso!',
    deleteSuccess: 'Editora excluída com sucesso!',
    deleteError: 'Erro ao excluir a editora!',
    loadError: 'Erro ao carregar editoras',
    createError: 'Erro ao cadastrar editora!',
    updateError: 'Erro ao atualizar editora!',
  },

  produto: {
    notFound: 'Produto não encontrado',
    emptyList: 'Nenhum produto cadastrado',
    saveError: 'Erro ao salvar o produto!',
    createSuccess: 'Produto cadastrado com sucesso!',
    updateSuccess: 'Produto atualizado com sucesso!',
    deleteSuccess: 'Produto excluído com sucesso!',
    deleteError: 'Erro ao excluir o produto!',
    loadError: 'Erro ao carregar produtos',
    createError: 'Erro ao cadastrar produto!',
    updateError: 'Erro ao atualizar produto!',
  },

  role: {
    notFound: 'Role não encontrada',
    emptyList: 'Nenhuma role cadastrada',
    saveError: 'Erro ao salvar a role!',
    createSuccess: 'Role cadastrada com sucesso!',
    updateSuccess: 'Role atualizada com sucesso!',
    deleteSuccess: 'Role excluída com sucesso!',
    deleteError: 'Erro ao excluir a role!',
    loadError: 'Erro ao carregar roles',
    createError: 'Erro ao cadastrar role!',
    updateError: 'Erro ao atualizar role!',
  },

  usuario: {
    notFound: 'Usuário não encontrado',
    emptyList: 'Nenhum usuário cadastrado',
    saveError: 'Erro ao salvar o usuário!',
    createSuccess: 'Usuário cadastrado com sucesso!',
    updateSuccess: 'Usuário atualizado com sucesso!',
    deleteSuccess: 'Usuário excluído com sucesso!',
    deleteError: 'Erro ao excluir o usuário!',
    loadError: 'Erro ao carregar usuários',
    createError: 'Erro ao cadastrar usuário!',
    updateError: 'Erro ao atualizar usuário!',
  },

  // Mensagens de autenticação
  auth: {
    loginSuccess: 'Usuário autenticado com sucesso!',
    loginError: 'Dados do Usuário inconsistentes!',
    logoutSuccess: 'Usuário desconectado!',
    loginRequired: 'Você precisa estar logado!',
  },

  // Mensagens de carrinho
  carrinho: {
    loadError: 'Erro ao carregar itens do carrinho',
  },

  // Mensagens globais
  global: {
    forbidden: 'Você não tem permissão de acesso!',
    notFound: 'Recurso não encontrado.',
    genericError: 'Ocorreu um erro inesperado.',
    unauthorized: 'Acesso não autorizado.',
    serverError: 'Erro no servidor. Tente novamente mais tarde.',
    connectionError: 'Erro de conexão. Verifique sua internet.',
  }
};

export default messages; 