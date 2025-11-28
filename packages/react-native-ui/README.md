# @armemon-library/react-native-ui

A professional React Native UI component library with advanced theming and scaling features.

## 📁 Project Structure

```
react-native-ui/
├── src/                    # Source code
│   ├── components/         # UI components
│   ├── config/            # Configuration system
│   ├── constants/         # Constants and font sizes
│   ├── context/           # React contexts (Theme, Scaling)
│   └── utils/             # Utility functions
├── docs/                  # Documentation
│   ├── CONFIGURATION_GUIDE.md
│   └── SCALING_EXAMPLES.md
├── examples/              # Example configurations
│   ├── config.template.ts
│   └── config.quick-reference.ts
├── README.md              # This file
└── package.json
```

## 🚀 Quick Start

```bash
npm install @armemon-library/react-native-ui
```

```typescript
import { Text, configure } from '@armemon-library/react-native-ui';

// Optional: Configure once in your app entry
configure({
  theme: 'auto',
  scaling: {
    textScale: { mode: 'both', customMultiplier: 1.0 },
    uiScale: { enabled: true, multiplier: 1.0 }
  }
});

// Use components
function App() {
  return <Text type="large-bold">Hello World!</Text>;
}
```

## 📚 Documentation

- **[Configuration Guide](./docs/CONFIGURATION_GUIDE.md)** - Complete configuration reference
- **[Scaling Examples](./docs/SCALING_EXAMPLES.md)** - Text and UI scaling examples
- **[Config Template](./examples/config.template.ts)** - Full configuration template
- **[Quick Reference](./examples/config.quick-reference.ts)** - Quick config examples

## ✨ Features

- 🎨 **Theme System** - Built-in dark/light mode with auto-detection
- 📏 **Advanced Scaling** - Native + custom text scaling and independent UI scaling
- 🔤 **Flexible Typography** - Comprehensive text component with skin system
- 🎯 **Type-safe** - Full TypeScript support
- ⚡ **Zero Dependencies** - Lightweight and performant
- 🔧 **Highly Configurable** - Global config with type-specific overrides

## 🎨 Theme System

Automatic dark/light mode support:

```typescript
import { useTheme, setTheme } from '@armemon-library/react-native-ui';

function ThemedComponent() {
  const { theme, colors, toggleTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text color={colors.textPrimary}>Current theme: {theme}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}

// Set theme programmatically
setTheme('dark');  // 'light' | 'dark' | 'auto'
```

## 📏 Scaling System

### Native Font Scaling
Respects device accessibility settings:

```typescript
import { useScaling } from '@armemon-library/react-native-ui';

const { nativeFontScale, effectiveTextScale } = useScaling();
```

### Custom Text Scaling

```typescript
import { setCustomTextScale } from '@armemon-library/react-native-ui';

setCustomTextScale(0.8);  // 80% - Smaller
setCustomTextScale(1.0);  // 100% - Normal
setCustomTextScale(1.5);  // 150% - Larger
```

### UI Scaling
Independent scaling for layouts:

```typescript
import { useScaledValue, setUIScale } from '@armemon-library/react-native-ui';

function ScalableCard() {
  const padding = useScaledValue(20, 'ui');
  return <View style={{ padding }}>{/* content */}</View>;
}

setUIScale(1.3);  // 30% more spacious
```

## 🔤 Text Component

```typescript
<Text type="large-bold">Title</Text>
<Text type="medium" color="#333">Body text</Text>
<Text size={20} ratio={1.2}>Custom sized</Text>
<Text type="medium" disableScaling>Fixed size text</Text>
```

**Available Skins:**
- Sizes: `extra-small`, `small`, `medium`, `large`, `extra-large`
- Weights: `extra-light`, `light`, `regular`, `strong`, `bold`, `extra-bold`
- Combined: `large-bold`, `medium-regular`, etc.

## ⚙️ Configuration

```typescript
import { configure } from '@armemon-library/react-native-ui';

configure({
  theme: 'auto',
  
  scaling: {
    textScale: {
      mode: 'both',           // 'native' | 'custom' | 'both'
      customMultiplier: 1.0,
    },
    uiScale: {
      enabled: true,
      multiplier: 1.0,
    }
  },
  
  text: {
    baseFontSize: undefined,  // Auto-detect (14 phone, 16 tablet)
    ratio: 1.0,
    defaultSkin: 'medium',
    
    types: {
      heading: { skin: 'extra-large-bold' },
      body: { skin: 'medium-regular' },
    },
    
    overrides: {
      'large-bold': {
        fontFamily: 'CustomFont-Bold',
        fontSize: 20,
      }
    }
  }
});
```

## 📖 API

### Components
- `<Text>` - Flexible text component with scaling

### Hooks
- `useTheme()` - Access theme state and controls
- `useScaling()` - Access scaling values and controls
- `useNativeFontScale()` - Get device font scale
- `useScaledValue(value, type)` - Scale any numeric value

### Functions
- `configure(config)` - Configure the library
- `setTheme(theme)` - Set theme mode
- `setCustomTextScale(multiplier)` - Set text scale
- `setUIScale(multiplier)` - Set UI scale
- `setTextScaleMode(mode)` - Set scaling mode

## 🔧 TypeScript Support

```typescript
import type { 
  TextProps, 
  TextSkin,
  ScalingContextType 
} from '@armemon-library/react-native-ui';
```

## 📄 License

MIT

## 👤 Author

Ahmed Raza Memon
