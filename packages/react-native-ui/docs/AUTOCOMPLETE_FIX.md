# TypeScript Autocomplete Not Working?

## Quick Fix: Restart TypeScript Server

### VSCode:
1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type: `TypeScript: Restart TS Server`
3. Press Enter
4. Wait 5 seconds for reload

### Alternative: Reload Window
1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type: `Developer: Reload Window`
3. Press Enter

## Test Autocomplete

After restarting, try this:

```typescript
import { Text, SKINS } from "@armemon-library/react-native-ui";

// Type "SKINS." - you should see:
<Text skin={SKINS.  // ← Press Ctrl+Space here
```

**Expected autocomplete list:**
- `extraSmall`
- `small`
- `medium`
- `large`
- `extraLarge`
- `largeBold`
- `mediumRegular`
- `smallLight`
- etc... (35 total options)

## Still Not Working?

### Check 1: Verify exports
```typescript
import { SKINS } from "@armemon-library/react-native-ui";
console.log(Object.keys(SKINS));  // Should show all skin names
```

### Check 2: Build the library (if using from source)
```bash
cd packages/react-native-ui
npm run build  # or yarn build
```

### Check 3: Clear node_modules cache
```bash
rm -rf node_modules
npm install  # or yarn install
```

### Check 4: Check tsconfig.json
Make sure your `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

## Why Does This Happen?

TypeScript Language Server caches type definitions. When you make changes to:
- Type exports
- Interface definitions  
- Const objects with `as const`

The server needs to reload to pick up the new types.

## Autocomplete for `skin` prop

The `skin` prop should also show autocomplete because it's typed as:
```typescript
skin?: TextSkin
```

Where `TextSkin` includes all the skin string literals.

If `skin=""` autocomplete isn't working, it's because TypeScript can't infer string literal unions in JSX props perfectly. Use `SKINS` instead for better autocomplete!
