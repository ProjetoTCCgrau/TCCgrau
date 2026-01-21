# Cinneview - Vue.js

Aplicação de review de filmes construída com Vue.js 3, Vue Router e armazenamento local.

## Funcionalidades

- Sistema de login e cadastro local
- Página de filmes em cartaz
- Avaliações de filmes com editor de imagem
- Ranking de filmes
- Sistema de comentários
- Perfil do usuário
- Tema claro/escuro

## Estrutura do Projeto

```
src/
  components/     - Componentes reutilizáveis
  pages/          - Páginas da aplicação
  stores/         - Gerenciamento de estado
  assets/         - Imagens e recursos estáticos
  main.js         - Ponto de entrada
  router.js       - Configuração de rotas
  style.css       - Estilos globais
  App.vue         - Componente raiz
```

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Autenticação

A autenticação é feita localmente usando localStorage. Usuários podem:
- Criar nova conta
- Fazer login
- Acessar perfil (apenas quando logado)
- Fazer logout

## Editor de Imagem

Na aba de Avaliações, clique em uma imagem de filme para abrir o editor. Você pode:
- Ajustar brilho, contraste e saturação
- Aplicar escala de cinza
- Rotacionar a imagem
- Baixar a imagem editada
