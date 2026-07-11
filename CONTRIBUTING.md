# Contributing to DevOS

We welcome contributions to the DevOS platform! To maintain premium codebase quality matching Stripe, Linear, and Vercel standards, please adhere to the following development guidelines.

---

## Technical Stack & Layout Standards
- **Dark-First Aesthetics**: Direct styling configurations using Tailwind CSS v4 variables in `app/globals.css`. Ensure new cards or sections match background (`#0D1117`) and border (`#30363D`) tokens.
- **Server Components by Default**: Keep pages under `app/` as Server Components. Extract interactive controls into client sub-components.
- **Strict Size Limits**: Do not exceed 250–300 lines of code per component file. Split large structures into small files in the modular feature folder (e.g. `features/<feature>/components`).
- **Zustand State Coordinator**: Maintain CRUD actions inside `store/useStore.ts` to keep the layout synchronized across views.

---

## Onboarding Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/devos.git
   cd devos
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## Verification Protocols
Before committing, make sure to execute all checks to confirm zero errors or warnings:
```bash
# 1. Check ESLint Rules
npm run lint

# 2. Verify TypeScript Types
npx tsc --noEmit

# 3. Test Production Compilation
npm run build
```
Ensure that no deprecated Lucide icons or raw backticks inside JSX blocks are introduced.
