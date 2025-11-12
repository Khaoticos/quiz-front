# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5 with SWC plugin for fast refresh
- **UI Library**: shadcn-ui components built on Radix UI
- **Styling**: Tailwind CSS with custom theming
- **Routing**: React Router v6
- **State Management**: TanStack React Query (v5)
- **Form Handling**: React Hook Form with Zod validation

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (runs on port 8080)
npm run dev

# Build for production
npm build

# Build for development environment
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Project Architecture

### Directory Structure

- `src/pages/` - Page components mapped to routes
- `src/components/` - Reusable React components
- `src/components/ui/` - shadcn-ui components (auto-generated, rarely modified)
- `src/data/` - Mock data and type definitions (quizData.ts, establishmentsData.ts)
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions (utils.ts for cn() helper)

### Routing

Routes are defined in [src/App.tsx](src/App.tsx). The application uses React Router with the following structure:

- `/` - Landing page
- `/quizzes` - Quiz themes listing
- `/quizzes/:themeId` - Quizzes within a theme
- `/quiz/:quizId` - Active quiz game
- `/quiz/:quizId/results` - Quiz results page
- `/estabelecimentos` - Establishments listing
- `/estabelecimentos/:id` - Establishment details
- `*` - 404 Not Found (catch-all)

**Important**: When adding new routes, always add them ABOVE the catch-all `*` route in App.tsx.

### Data Model

The application uses a hierarchical quiz structure:

```
Theme → Quiz → Question → Alternative
```

Defined types are in [src/data/quizData.ts](src/data/quizData.ts):
- `Theme` - Contains multiple quizzes (e.g., "Cultura Pop")
- `Quiz` - Contains multiple questions
- `Question` - Contains alternatives and a timer value
- `Alternative` - Individual answer option with correctness flag

Establishments data structure in [src/data/establishmentsData.ts](src/data/establishmentsData.ts):
- `Establishment` - Bar/restaurant with address, quizzes, social links
- `EstablishmentQuiz` - Quiz specific to an establishment
- Currently using mock data

### Quiz Game Flow

The quiz game ([src/pages/QuizGame.tsx](src/pages/QuizGame.tsx)) implements:
1. 30-second timer per question
2. Answer tracking with time spent and correctness
3. Auto-advance when timer expires or answer is selected
4. Final results stored and shown on results page

### Path Aliases

The project uses `@/` as an alias for `src/`:
```typescript
import { Button } from "@/components/ui/button"
import { themes } from "@/data/quizData"
```

### shadcn-ui Components

Configuration in [components.json](components.json):
- Style: default
- Base color: slate
- CSS variables enabled
- Components installed via CLI: `npx shadcn@latest add <component-name>`

Do not manually edit files in `src/components/ui/` unless necessary. Use the shadcn CLI to add or update components.

### TypeScript Configuration

The project uses relaxed TypeScript settings ([tsconfig.json](tsconfig.json)):
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedLocals: false`
- `noUnusedParameters: false`

This allows for faster development but be mindful of type safety.

## Working with the Codebase

### Adding a New Page

1. Create page component in `src/pages/NewPage.tsx`
2. Import and add route in `src/App.tsx` BEFORE the catch-all route:
   ```tsx
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Add navigation link in [src/components/Navigation.tsx](src/components/Navigation.tsx) if needed

### Adding shadcn-ui Components

```bash
npx shadcn@latest add <component-name>
```

This automatically installs the component in `src/components/ui/`.

### Styling Patterns

- Use Tailwind utility classes
- Custom gradient classes: `bg-gradient-primary`, `bg-gradient-card`
- Consistent spacing with Tailwind scale
- Dark mode support via `next-themes` package

### Data Management

All data is stored as mock data in `src/data/`:
- Quiz content in `quizData.ts`
- Establishment content in `establishmentsData.ts`

This is a front-end only application. All quiz questions, answers, establishment information, and user results are managed through mock data structures in TypeScript files.
