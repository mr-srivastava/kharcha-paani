# Kharcha Paani - Complete Migration Summary

## 🎯 What Has Been Done

### ✅ 1. Package.json Updated
- **Version**: Bumped to 2.0.0
- **Node Version**: Set to Node 22+ (with `.nvmrc` file)
- **Build Tool**: Migrated from Create React App to Vite
- **State Management**: Replaced Redux + Redux Saga with Zustand
- **React**: Upgraded from 17 to 18
- **All dependencies**: Updated to latest versions

### ✅ 2. State Management Migration
- Created new Zustand store: `src/store/useGroupStore.ts`
- Removed Redux boilerplate (actions, reducers, sagas)
- Updated `src/bootstrap.tsx` to remove Redux Provider and use React 18 API
- Created migration guide: `ZUSTAND_MIGRATION.md`
- Created example component: `src/pages/Groups/Groups.zustand.tsx`

---

## 📋 Next Steps - What You Need to Do

### Step 1: Clean Install Dependencies

```bash
# Make sure you're using Node 22
nvm use 22

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Step 2: Create Vite Configuration Files

#### Create `vite.config.ts` (root directory)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    svgr(), // Allows importing SVGs as React components
    tsconfigPaths(), // Reads path aliases from tsconfig.json
  ],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  define: {
    'process.env': {},
  },
});
```

#### Create `tsconfig.node.json` (root directory)

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

#### Update `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,

    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "src/*": ["./src/*"]
    },
    "typeRoots": ["./src/@types", "./node_modules/@types"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### Create `src/vite-env.d.ts`

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

#### Move and Update `index.html`

**Move** `public/index.html` to root directory, then update it:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Keep your Kharcha Paani sorted" />
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>Kharcha Paani</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/src/index.ts"></script>
  </body>
</html>
```

**Key changes:**
- Remove all `%PUBLIC_URL%` references
- Add `<script type="module" src="/src/index.ts"></script>` at the end

#### Create `.env.development` (root directory)

```env
VITE_API_URL=https://kharcha-paani.herokuapp.com
```

#### Create `.env.production` (root directory)

```env
VITE_API_URL=https://kharcha-paani.herokuapp.com
```

### Step 3: Update Code Files

#### Update `src/utils/config.ts`

Replace `process.env` with `import.meta.env`:

```typescript
export const API_URL: { [key: string]: string } = {
  development: 'https://kharcha-paani.herokuapp.com',
  production: 'https://kharcha-paani.herokuapp.com',
};

export const getEnv = (): string => {
  return import.meta.env.MODE; // 'development' or 'production'
};

export const getApiUrl = (): string => {
  return import.meta.env.VITE_API_URL || API_URL[getEnv()];
};
```

#### Update `src/bootstrap.scss`

Remove `~` from imports:

```scss
// Before
@import "~bootstrap/scss/bootstrap";

// After
@import "bootstrap/scss/bootstrap";
```

### Step 4: Migrate Components from Redux to Zustand

Use the example in `src/pages/Groups/Groups.zustand.tsx` as a reference.

**Files to update:**
1. `src/pages/Groups/Groups.tsx` ✅ (example provided)
2. `src/pages/GroupPage/GroupPage.tsx`
3. `src/pages/LandingPage/LandingPage.tsx`
4. `src/components/GroupModal/GroupModal.tsx`
5. `src/components/AddExpense/AddExpense.tsx`
6. Any other component using Redux

**Migration pattern:**

```typescript
// Before (Redux)
import { useAppDispatch, useAppSelector } from 'src/state/stateHooks';
const dispatch = useAppDispatch();
const groups = useAppSelector((state) => state.groups.groups);
dispatch({ type: 'GET_ALL_GROUPS' });

// After (Zustand)
import { useGroupStore } from 'src/store/useGroupStore';
const groups = useGroupStore((state) => state.groups);
const getAllGroups = useGroupStore((state) => state.getAllGroups);
getAllGroups();
```

### Step 5: Delete Old Redux Files

After migration is complete and tested:

```bash
rm -rf src/state/
```

Files to delete:
- `src/state/store.ts`
- `src/state/rootReducer.ts`
- `src/state/rootSaga.ts`
- `src/state/stateHooks.ts`
- `src/state/Reducers/group.ts`
- `src/state/Sagas/groupSaga.ts`

### Step 6: Test Everything

```bash
# Start dev server
npm run dev

# Test all features:
# - Create group
# - Edit group
# - Delete group
# - Add expense
# - View groups
# - Navigate between pages

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Optional: Add Tailwind CSS (Later)

After Vite migration is complete, you can add Tailwind:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then gradually migrate components from Bootstrap to Tailwind.

---

## 📊 Migration Checklist

### Vite Setup
- [ ] Create `vite.config.ts`
- [ ] Create `tsconfig.node.json`
- [ ] Update `tsconfig.json`
- [ ] Create `src/vite-env.d.ts`
- [ ] Move `public/index.html` to root and update
- [ ] Create `.env.development`
- [ ] Create `.env.production`
- [ ] Update `src/utils/config.ts` (env variables)
- [ ] Update `src/bootstrap.scss` (remove `~`)

### Zustand Migration
- [ ] Update `src/pages/Groups/Groups.tsx`
- [ ] Update `src/pages/GroupPage/GroupPage.tsx`
- [ ] Update `src/pages/LandingPage/LandingPage.tsx`
- [ ] Update `src/components/GroupModal/GroupModal.tsx`
- [ ] Update `src/components/AddExpense/AddExpense.tsx`
- [ ] Delete `src/state/` folder

### Testing
- [ ] Clean install dependencies
- [ ] Run `npm run dev`
- [ ] Test all routes
- [ ] Test create group
- [ ] Test edit group
- [ ] Test delete group
- [ ] Test add expense
- [ ] Run `npm run build`
- [ ] Run `npm run preview`

---

## 🚀 Benefits After Migration

### Vite
- ⚡ **10x faster** dev server startup
- 🔥 **Instant** HMR (Hot Module Replacement)
- 📦 **2-3x faster** production builds
- 🎯 Better tree-shaking and optimization

### Zustand
- 📉 **~70% less code** compared to Redux
- 🎯 **Simpler API** - no actions, reducers, or sagas
- 💪 **Better TypeScript** support
- 📦 **Smaller bundle** (~1KB vs Redux's ~10KB)
- 🔧 Built-in **DevTools** and **persistence**

### React 18
- ⚡ Automatic batching
- 🔄 Concurrent rendering
- 🎯 Better performance
- 🆕 New hooks (useId, useTransition, useDeferredValue)

---

## 📚 Documentation

- **Zustand Migration Guide**: `ZUSTAND_MIGRATION.md`
- **Vite Documentation**: https://vitejs.dev/
- **Zustand Documentation**: https://docs.pmnd.rs/zustand/
- **React 18 Migration**: https://react.dev/blog/2022/03/08/react-18-upgrade-guide

---

## ⚠️ Common Issues & Solutions

### Issue: "Cannot find module 'vite'"
**Solution**: Run `npm install` to install all dependencies

### Issue: "process.env is not defined"
**Solution**: Update all `process.env` references to `import.meta.env`

### Issue: SCSS imports not working
**Solution**: Remove `~` prefix from imports (e.g., `@import "bootstrap/scss/bootstrap"`)

### Issue: SVG imports not working
**Solution**: Update imports from `import { ReactComponent as Logo } from './logo.svg'` to `import Logo from './logo.svg?react'`

### Issue: Redux hooks not found
**Solution**: Replace with Zustand hooks as shown in migration guide

---

## 🎯 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check

# Lint
npm run lint

# Lint and fix
npm run lint:fix
```

---

## 📞 Need Help?

Refer to:
1. `ZUSTAND_MIGRATION.md` - Detailed Zustand migration guide
2. `src/pages/Groups/Groups.zustand.tsx` - Example migrated component
3. `src/store/useGroupStore.ts` - Store implementation with comments

---

**Good luck with the migration! 🚀**
