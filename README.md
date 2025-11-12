# Quis - Quiz Application

Aplicação web de quiz interativo com sistema de estabelecimentos parceiros.

## Tecnologias

Este projeto foi desenvolvido com:

- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server de alta performance
- **shadcn-ui** - Componentes React reutilizáveis baseados em Radix UI
- **Tailwind CSS** - Framework CSS utility-first
- **React Router v6** - Roteamento para aplicações React
- **TanStack React Query** - Gerenciamento de estado assíncrono

## Requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

Recomendado: [instalar Node.js com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

## Instalação

```bash
# Clone o repositório
git clone <YOUR_GIT_URL>

# Entre no diretório do projeto
cd quis

# Instale as dependências
npm install
```

## Comandos Disponíveis

```bash
# Inicia o servidor de desenvolvimento (porta 8080)
npm run dev

# Cria build de produção
npm run build

# Cria build de desenvolvimento
npm run build:dev

# Executa o linter
npm run lint

# Visualiza o build de produção
npm run preview
```

## Estrutura do Projeto

```
src/
├── pages/          # Páginas da aplicação
├── components/     # Componentes React reutilizáveis
├── components/ui/  # Componentes shadcn-ui
├── data/          # Dados mock (quizzes e estabelecimentos)
├── hooks/         # Custom React hooks
└── lib/           # Funções utilitárias
```

## Funcionalidades

- Sistema de quiz por temas
- Timer de 30 segundos por questão
- Sistema de pontuação e resultados
- Listagem de estabelecimentos parceiros
- Filtros por tipo, bairro e status
- Interface responsiva e moderna

## Desenvolvimento

O servidor de desenvolvimento roda em `http://localhost:8080` com hot-reload habilitado.

Para adicionar novos componentes shadcn-ui:

```bash
npx shadcn@latest add <component-name>
```

## Estrutura de Dados

Os dados são gerenciados através de arquivos mock em `src/data/`:

- `quizData.ts` - Temas, quizzes e questões
- `establishmentsData.ts` - Estabelecimentos parceiros

## Deploy

Esta é uma aplicação front-end estática que pode ser hospedada em:

- Vercel
- Netlify
- GitHub Pages
- Qualquer serviço de hospedagem estática

Execute `npm run build` e faça deploy da pasta `dist/`.
