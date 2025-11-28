# Complete Configuration Guide

## 📖 Table of Contents
1. [Configuration Structure](#configuration-structure)
2. [All Available Options](#all-available-options)
3. [Configuration Examples](#configuration-examples)
4. [Text Type System](#text-type-system)
5. [Font Size Calculation](#font-size-calculation)

---

## Configuration Structure

```
configure({
  ├── theme                    // 'light' | 'dark' | 'auto'
  ├── scaleIndex              // 0 | 1 | 2 (legacy base font size theme)
  ├── scaling
  │   ├── textScale
  │   │   ├── mode            // 'native' | 'custom' | 'both'
  │   │   ├── customMultiplier // 0.8 - 1.5
  │   │   └── respectNative   // true | false
  │   └── uiScale
  │       ├── enabled         // true | false
  │       └── multiplier      // 0.8 - 1.5
  └── text
      ├── ratio               // Global text multiplier
      ├── defaultSkin         // Default skin name
      ├── color              // Default text color
      ├── types              // Custom type definitions
      │   └── [typeName]
      │       ├── skin        // Skin to use
      │       ├── fontSize    // Override size
      │       └── styles      // React Native TextStyle
      └── overrides          // Override built-in skins
          └── [skinName]
              ├── fontSize
              ├── fontWeight
              ├── fontFamily
              └── ...any TextStyle
})
```

---

## All Available Options

### 1. Theme
```typescript
theme: 'light' | 'dark' | 'auto'
```
- `'light'` - Always light theme
- `'dark'` - Always dark theme  
- `'auto'` - Follow device system theme (default)

### 2. Scale Index (Legacy)
```typescript
scaleIndex: 0 | 1 | 2
```
- `0` - Small base sizes (M: 12px)
- `1` - Medium base sizes (M: 14px) - **Default**
- `2` - Large base sizes (M: 16px)

**Note:** Use the new `scaling.textScale` instead for more control

### 3. Scaling System

#### Text Scaling
```typescript
scaling: {
  textScale: {
    mode: 'native' | 'custom' | 'both',
    customMultiplier: number (0.5 - 2.0),
    respectNative: boolean
  }
}
```

**Modes:**
- `'native'` → effectiveTextScale = device scale only
- `'custom'` → effectiveTextScale = customMultiplier only
- `'both'` → effectiveTextScale = device scale × customMultiplier

#### UI Scaling
```typescript
scaling: {
  uiScale: {
    enabled: boolean,
    multiplier: number (0.5 - 2.0)
  }
}
```

### 4. Text Configuration

```typescript
text: {
  ratio: number,              // Global multiplier (1.0 = 100%)
  defaultSkin: string,        // Default skin name
  color: string | undefined,  // Default color
  types: { ... },             // Custom type definitions
  overrides: { ... }          // Skin overrides
}
```

#### Custom Types
```typescript
types: {
  [typeName: string]: {
    skin?: string,           // Which skin to use
    fontSize?: number,       // Override font size
    styles?: TextStyle       // Additional styles
  }
}
```

#### Overrides
```typescript
overrides: {
  [skinOrTypeName: string]: {
    fontSize?: number,
    fontWeight?: FontWeight,
    fontFamily?: string,
    color?: string,
    ...any TextStyle property
  }
}
```

---

## Configuration Examples

### Example 1: Maximum Accessibility
```typescript
configure({
  theme: 'auto',  // Respect device theme
  scaling: {
    textScale: {
      mode: 'native',  // Only device font scale
      customMultiplier: 1.0,
    },
    uiScale: {
      enabled: false,  // No UI scaling
      multiplier: 1.0,
    },
  },
});
```

### Example 2: App with In-App Font Controls
```typescript
configure({
  theme: 'auto',
  scaling: {
    textScale: {
      mode: 'both',    // Combine device + custom
      customMultiplier: 1.0,  // Users can change this
    },
    uiScale: {
      enabled: true,
      multiplier: 1.0,
    },
  },
});

// Later in settings:
setCustomTextScale(1.3);  // User chooses "Large"
```

### Example 3: Fixed Design (Games, Design Tools)
```typescript
configure({
  theme: 'dark',
  scaling: {
    textScale: {
      mode: 'custom',  // Ignore device
      customMultiplier: 1.0,  // No scaling
    },
    uiScale: {
      enabled: false,
      multiplier: 1.0,
    },
  },
});
```

### Example 4: Senior-Friendly App
```typescript
configure({
  theme: 'auto',
  scaling: {
    textScale: {
      mode: 'both',
      customMultiplier: 1.4,  // 40% larger by default
    },
    uiScale: {
      enabled: true,
      multiplier: 1.3,  // 30% more spacious
    },
  },
  text: {
    defaultSkin: 'medium-bold',  // Bolder text
  },
});
```

### Example 5: With Custom Types & Fonts
```typescript
configure({
  text: {
    types: {
      // Semantic types
      heading: {
        skin: 'extra-large-bold',
        styles: { 
          letterSpacing: 0.5,
          lineHeight: 32,
        },
      },
      body: {
        skin: 'medium-regular',
        styles: { lineHeight: 22 },
      },
      caption: {
        skin: 'small-light',
        styles: { opacity: 0.6 },
      },
    },
    overrides: {
      // Apply custom fonts
      'extra-large-bold': {
        fontFamily: 'Poppins-Bold',
        fontSize: 28,
      },
      'medium-regular': {
        fontFamily: 'Poppins-Regular',
      },
      'small-light': {
        fontFamily: 'Poppins-Light',
      },
    },
  },
});

// Usage:
<Text type="heading">My Title</Text>
<Text type="body">Paragraph text...</Text>
<Text type="caption">Small note</Text>
```

---

## Text Type System

### Built-in Skins

**Size-only:**
- `extra-small`
- `small`
- `medium` (default)
- `large`
- `extra-large`

**Combined (size-weight):**
- `{size}-extra-light`
- `{size}-light`
- `{size}-regular`
- `{size}-strong`
- `{size}-bold`
- `{size}-extra-bold`

**Examples:**
- `large-bold`
- `medium-regular`
- `small-light`
- `extra-large-extra-bold`

### Custom Types

You can create semantic types:

```typescript
configure({
  text: {
    types: {
      heading: { skin: 'extra-large-bold' },
      title: { skin: 'large-bold' },
      subtitle: { skin: 'medium-regular' },
      body: { skin: 'medium-regular' },
      caption: { skin: 'small-light' },
      button: { 
        skin: 'medium-bold',
        styles: { textTransform: 'uppercase' }
      },
      link: {
        skin: 'medium-regular',
        styles: { textDecorationLine: 'underline' }
      },
      error: {
        skin: 'small-bold',
      },
    },
    overrides: {
      error: { color: '#ef4444' },  // Red
      link: { color: '#3b82f6' },   // Blue
    },
  },
});
```

---

## Font Size Calculation

### The Complete Formula

```typescript
finalFontSize = baseSize × ratio × effectiveTextScale
```

Where:
1. **baseSize** - From skin + scaleIndex theme
2. **ratio** - Global or instance ratio
3. **effectiveTextScale** - From scaling mode

### Step-by-Step Example

```typescript
// Configuration
configure({
  scaleIndex: 1,              // Medium theme
  scaling: {
    textScale: {
      mode: 'both',
      customMultiplier: 1.2,
    },
  },
  text: {
    ratio: 1.0,
  },
});

// Device font scale: 1.3 (user has "Large" fonts in Settings)

// Usage
<Text type="medium">Hello</Text>

// Calculation:
// 1. baseSize = 14 (medium from scaleIndex 1)
// 2. ratio = 1.0 (default)
// 3. effectiveTextScale = 1.3 × 1.2 = 1.56 (both mode)
// 4. finalFontSize = 14 × 1.0 × 1.56 = 21.84px ✅
```

### Different Modes Comparison

Same setup, device scale 1.3, customMultiplier 1.2:

| Mode | Calculation | Result |
|------|-------------|--------|
| `'native'` | 14 × 1.0 × 1.3 | 18.2px |
| `'custom'` | 14 × 1.0 × 1.2 | 16.8px |
| `'both'` | 14 × 1.0 × 1.56 | 21.84px |

### Priority Order

Font size is determined by (highest to lowest priority):

1. `size` prop on `<Text>` component
2. `overrides[type].fontSize` in config
3. `types[type].fontSize` in config  
4. Skin's base size from `BASE_FONT_SIZES`

Then multiplied by:
- `ratio` (instance prop → global config)
- `effectiveTextScale` (from scaling mode)

---

## Quick Copy-Paste Configs

### Minimal (Recommended Start)
```typescript
configure({
  theme: 'auto',
});
```

### Standard App
```typescript
configure({
  theme: 'auto',
  scaling: {
    textScale: { mode: 'both', customMultiplier: 1.0 },
    uiScale: { enabled: true, multiplier: 1.0 },
  },
});
```

### Reading App
```typescript
configure({
  theme: 'auto',
  scaling: {
    textScale: { mode: 'both', customMultiplier: 1.0 },
  },
  text: {
    types: {
      title: { skin: 'large-bold' },
      paragraph: { 
        skin: 'medium-regular',
        styles: { lineHeight: 24 }
      },
    },
  },
});
```

---

## See Also

- [CONFIG_TEMPLATE.ts](./CONFIG_TEMPLATE.ts) - Full annotated template
- [CONFIG_QUICK_REFERENCE.ts](./CONFIG_QUICK_REFERENCE.ts) - Quick examples
- [SCALING_EXAMPLES.md](./SCALING_EXAMPLES.md) - Scaling usage examples
- [README.md](./README.md) - Library overview
