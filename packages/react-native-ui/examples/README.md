# Configuration Examples

This folder contains ready-to-use configuration templates and examples.

## 📁 Available Files

### [config.template.ts](./config.template.ts)
**Complete Configuration Template**
- Every single configuration option explained
- Real-world examples for all features
- Multiple preset configurations (minimal, accessibility, senior-friendly, etc.)
- Detailed comments for each property

**Use this when:** You want to understand all options and create a full custom configuration.

### [config.quick-reference.ts](./config.quick-reference.ts)
**Quick Reference & Copy-Paste Examples**
- Minimal setup configurations
- Common scenarios (text scaling, UI scaling, custom fonts, etc.)
- Runtime configuration changes
- Quick examples you can copy directly

**Use this when:** You know what you want and just need the code to copy.

## 🚀 How to Use

1. **Copy** the template file to your project (e.g., `src/config/uiConfig.ts`)
2. **Customize** the values to match your needs
3. **Import** and configure in your `App.tsx`:

```typescript
import { configure } from '@armemon-library/react-native-ui';
import { uiConfig } from './config/uiConfig';

function App() {
  configure(uiConfig);
  return <YourApp />;
}
```

## 📖 Documentation

For detailed explanations, see:
- [Configuration Guide](../docs/CONFIGURATION_GUIDE.md) - Complete reference
- [Scaling Examples](../docs/SCALING_EXAMPLES.md) - Scaling use cases
- [Main README](../README.md) - Getting started

## 💡 Quick Examples

### Minimal Config
```typescript
configure({ theme: 'auto' });
```

### With Scaling
```typescript
configure({
  scaling: {
    textScale: { mode: 'both', customMultiplier: 1.0 },
    uiScale: { enabled: true, multiplier: 1.0 }
  }
});
```

### With Custom Types
```typescript
configure({
  text: {
    types: {
      heading: { skin: 'extra-large-bold' },
      body: { skin: 'medium-regular' }
    }
  }
});
```

See the template files for complete examples!
