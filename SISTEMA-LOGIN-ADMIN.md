# Sistema de Login e Painéis Administrativos

## Visão Geral

Sistema completo de autenticação e painéis administrativos implementado com dados mockados, pronto para integração futura com backend.

## Funcionalidades Implementadas

### 1. Sistema de Autenticação

#### AuthContext ([src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx))
- Sistema de autenticação mockado com localStorage
- Suporte a 3 tipos de usuários (roles):
  - **Admin** - Acesso total ao sistema
  - **Establishment** - Gerenciamento de estabelecimento
  - **User** - Usuário comum
- Funções disponíveis:
  - `login(email, password)` - Autenticação
  - `register(name, email, password)` - Cadastro de novos usuários
  - `logout()` - Logout
  - `updateProfile(updates)` - Atualizar perfil

#### ProtectedRoute ([src/components/ProtectedRoute.tsx](src/components/ProtectedRoute.tsx))
- Componente para proteger rotas baseado em autenticação e roles
- Redireciona usuários não autenticados para login
- Redireciona usuários sem permissão para seu dashboard apropriado

### 2. Páginas de Autenticação

#### Login ([src/pages/Login.tsx](src/pages/Login.tsx))
- Interface moderna e responsiva
- Validação de formulário
- Indicador de loading durante autenticação
- Mostrar/ocultar senha
- Link para registro
- **Credenciais de teste disponíveis:**
  ```
  Admin:          admin@quis.com / admin123
  Estabelecimento: bar@quis.com / bar123
  Usuário:        user@quis.com / user123
  ```

#### Registro ([src/pages/Register.tsx](src/pages/Register.tsx))
- Formulário completo de cadastro
- Validação de senha com indicador de força
- Confirmação de senha
- Validação de email duplicado (mockada)
- Novos usuários são registrados como role 'user' por padrão

### 3. Painéis Administrativos

#### Painel de Administrador ([src/pages/AdminPanel.tsx](src/pages/AdminPanel.tsx))
**Rota:** `/admin` (protegida - apenas admin)

Funcionalidades mockadas:
- **Dashboard com Estatísticas:**
  - Total de usuários (1.247)
  - Total de estabelecimentos (89)
  - Total de quizzes (156)
  - Quizzes ativos (134)

- **Abas de Gerenciamento:**
  - Visão Geral - Dashboard principal
  - Usuários - Lista de usuários recentes
  - Estabelecimentos - Gerenciamento de parceiros
  - Quizzes - Gerenciamento de quizzes

- **Ações Rápidas:**
  - Criar novo quiz
  - Adicionar estabelecimento
  - Configurações da plataforma

- **Funcionalidades de Lista:**
  - Visualizar detalhes
  - Editar registros
  - Deletar registros

#### Painel de Estabelecimento ([src/pages/EstablishmentPanel.tsx](src/pages/EstablishmentPanel.tsx))
**Rota:** `/painel` (protegida - apenas establishment)

Funcionalidades mockadas:
- **Dashboard com Estatísticas:**
  - Meus quizzes (12 total, 8 ativos)
  - Total de participantes (342)
  - Próximos eventos (3)
  - Taxa de engajamento (87%)

- **Abas de Gerenciamento:**
  - Visão Geral - Dashboard principal
  - Meus Quizzes - Lista de quizzes do estabelecimento
  - Eventos - Eventos agendados
  - Estatísticas - Top participantes e métricas

- **Gerenciamento de Quizzes:**
  - Lista com status (ativo/rascunho)
  - Número de perguntas e participantes
  - Próximas datas de eventos
  - Ações: visualizar, editar, deletar

- **Próximos Eventos:**
  - Data e horário
  - Quiz associado
  - Participantes inscritos
  - Capacidade máxima

- **Top Participantes:**
  - Ranking com medalhas
  - Pontuação total
  - Número de quizzes participados

### 4. Navegação Atualizada

#### Navigation ([src/components/Navigation.tsx](src/components/Navigation.tsx))
- Integração com sistema de autenticação
- Botões dinâmicos baseados no estado de login:
  - **Não autenticado:** "Entrar / Cadastrar"
  - **Autenticado:**
    - Botão "Painel" (para admin e establishment)
    - Botão "Sair"
- Redirecionamento automático para dashboard apropriado
- Versões desktop e mobile

### 5. Rotas Configuradas

#### App.tsx
Novas rotas adicionadas:
```typescript
/login          → Página de login (pública)
/registro       → Página de registro (pública)
/admin          → Painel administrativo (protegida - apenas admin)
/painel         → Painel de estabelecimento (protegida - apenas establishment)
```

## Como Usar

### 1. Fazer Login

1. Acesse `/login` ou clique em "Entrar / Cadastrar"
2. Use uma das credenciais de teste:
   - Admin: `admin@quis.com` / `admin123`
   - Estabelecimento: `bar@quis.com` / `bar123`
   - Usuário: `user@quis.com` / `user123`
3. Será redirecionado automaticamente:
   - Admin → `/admin`
   - Estabelecimento → `/painel`
   - Usuário → página anterior ou home

### 2. Registrar Nova Conta

1. Acesse `/registro`
2. Preencha nome, email e senha (mínimo 6 caracteres)
3. Novos usuários são criados com role 'user'

### 3. Acessar Painéis

- **Admin:** Após login, clique em "Painel" ou acesse `/admin`
- **Estabelecimento:** Após login, clique em "Painel" ou acesse `/painel`

### 4. Fazer Logout

- Clique no botão "Sair" no menu de navegação

## Estrutura de Dados

### User Interface
```typescript
{
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'establishment';
  establishmentId?: string; // Para usuários do tipo establishment
  createdAt: string;
}
```

## Armazenamento

- **localStorage:** Chave `quiz-user`
- Dados persistem entre sessões
- Limpar localStorage remove autenticação

## Proteção de Rotas

### Fluxo de Segurança

1. Usuário tenta acessar rota protegida
2. ProtectedRoute verifica autenticação
3. Se não autenticado → redireciona para `/login`
4. Se autenticado mas sem permissão → redireciona para seu dashboard
5. Se autenticado e com permissão → permite acesso

### Exemplo de Uso
```typescript
<ProtectedRoute allowedRoles={['admin']}>
  <AdminPanel />
</ProtectedRoute>
```

## Integração Futura com Backend

### Pontos de Integração

1. **AuthContext** ([src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx:48-106))
   - Substituir funções `login()` e `register()` por chamadas API
   - Implementar refresh token
   - Adicionar tratamento de erros específicos

2. **Painéis**
   - Substituir dados mockados por chamadas API
   - Implementar paginação
   - Adicionar filtros e busca

3. **ProtectedRoute**
   - Verificar token no servidor
   - Implementar refresh automático de token

### Endpoints Sugeridos
```
POST   /api/auth/login       - Autenticação
POST   /api/auth/register    - Registro
POST   /api/auth/logout      - Logout
GET    /api/auth/me          - Dados do usuário logado
PUT    /api/auth/profile     - Atualizar perfil

GET    /api/admin/stats      - Estatísticas gerais
GET    /api/admin/users      - Lista de usuários
GET    /api/admin/establishments - Lista de estabelecimentos

GET    /api/establishment/stats - Estatísticas do estabelecimento
GET    /api/establishment/quizzes - Quizzes do estabelecimento
GET    /api/establishment/events - Eventos agendados
```

## Componentes UI Utilizados

Do shadcn/ui:
- Button
- Input
- Label
- Card
- Badge
- Alert
- Skeleton

## Estilização

- Tailwind CSS
- Gradientes customizados
- Animações com Framer Motion
- Responsivo (mobile-first)
- Dark mode ready

## Notas Técnicas

- TypeScript com validação de tipos
- React Context API para estado global
- Custom hooks para localStorage
- Lazy loading de páginas
- Error boundaries
- PWA ready

## Próximos Passos Recomendados

1. Implementar recuperação de senha
2. Adicionar perfil de usuário editável
3. Implementar upload de avatar
4. Adicionar notificações em tempo real
5. Implementar filtros e busca nos painéis
6. Adicionar paginação nas listas
7. Implementar modals de confirmação para ações destrutivas
8. Adicionar gráficos de estatísticas
9. Implementar sistema de permissões mais granular
10. Adicionar testes unitários e e2e

## Build e Deploy

O projeto está compilando corretamente:
```bash
npm run build:dev  # Build de desenvolvimento
npm run build      # Build de produção
npm run dev        # Servidor de desenvolvimento
```

---

**Status:** ✅ Implementado e funcional
**Última atualização:** 11/11/2025
