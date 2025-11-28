# Project Structure

## 📁 Complete Directory Structure

```
@armemon-library/react-native-ui/
│
├── 📂 src/                          # Source code
│   ├── 📂 components/               # UI Components
│   │   └── 📂 text/                 # Text component module
│   │       ├── Text.tsx             # Main component
│   │       ├── types.ts             # Type definitions
│   │       ├── useTextConfig.ts     # Config resolution hook
│   │       └── index.ts             # Re-exports
│   │
│   ├── 📂 config/                   # Configuration system
│   │   ├── config.ts                # Core (store, configure, subscribe)
│   │   ├── 📂 defaults/             # Default configurations
│   │   │   ├── themeDefaults.ts
│   │   │   ├── scalingDefaults.ts
│   │   │   └── textDefaults.ts
│   │   └── 📂 helpers/              # Configuration helpers
│   │       ├── theme.ts             # setTheme()
│   │       └── scaling.ts           # Scaling helper functions
│   │
│   ├── 📂 constants/                # Constants & utilities
│   │   ├── fontSizes.ts             # Font size system (multipliers)
│   │   ├── skins.ts                 # Skin parser
│   │   └── colors.ts                # Color definitions
│   │
│   ├── 📂 context/                  # React Contexts
│   │   ├── ThemeContext.tsx         # Theme provider & hook
│   │   └── ScalingContext.tsx       # Scaling provider & hook
│   │
│   ├── 📂 utils/                    # Utility functions
│   │   ├── 📂 layout/
│   │   │   ├── getStyles.ts         # Margin/padding helpers
│   │   │   ├── deepMerge.ts         # Config merge utility
│   │   │   └── isTablet.ts          # Device detection
│   │   └── 📂 scaling/
│   │       ├── getNativeFontScale.ts
│   │       └── useScaledValue.ts
│   │
│   └── index.ts                     # Main exports
│
├── 📂 docs/                         # Documentation
│   ├── README.md                    # Docs index
│   ├── CONFIGURATION_GUIDE.md       # Complete config reference
│   └── SCALING_EXAMPLES.md          # Scaling usage examples
│
├── 📂 examples/                     # Configuration examples
│   ├── README.md                    # Examples index
│   ├── config.template.ts           # Full template with comments
│   └── config.quick-reference.ts    # Quick copy-paste examples
│
├── 📄 README.md                     # Main documentation
├── 📄 package.json                  # Package configuration
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 .babelrc                      # Babel config
└── 📄 .npmignore                    # NPM ignore rules
```

## 🎯 Organization Principles

### 1. **Source Code** (`src/`)
- **Modular Components**: Each component in its own folder with types and logic separated
- **Config System**: Core, defaults, and helpers organized separately
- **Clear Separation**: Context, constants, and utils have dedicated folders

### 2. **Documentation** (`docs/`)
- **Comprehensive Guides**: Step-by-step documentation for all features
- **Examples**: Real-world usage patterns
- **Searchable**: Well-organized and easy to navigate

### 3. **Examples** (`examples/`)
- **Ready-to-Use**: Copy-paste configurations
- **Templates**: Fully commented examples
- **Quick Reference**: Fast lookup for common patterns

## 📊 File Count Summary

| Category | Count | Description |
|----------|-------|-------------|
| **Source Files** | ~21 | TypeScript/TSX components and utilities |
| **Documentation** | 3 | Markdown guides |
| **Examples** | 2 | Configuration templates |
| **Config Files** | 4 | Build and package configs |

## 🎨 Design Patterns Used

### Component Structure
```
components/[name]/
├── [Name].tsx           # Main component (UI only)
├── types.ts             # Type definitions
├── use[Name]Config.ts   # Logic & config resolution
└── index.ts             # Clean re-exports
```

### Config Structure
```
config/
├── config.ts            # Core (store + API)
├── defaults/            # Default values
└── helpers/             # Helper functions
```

## 🚀 Benefits

✅ **Easy Navigation**: Know exactly where to find things  
✅ **Maintainable**: Each file has one clear responsibility  
✅ **Scalable**: Easy to add new components/features  
✅ **Professional**: Industry-standard folder structure  
✅ **Clear Documentation**: Separate docs and examples folders  
✅ **Clean Root**: Only essential files in root directory  

## 📝 Next Steps for New Features

### Adding a New Component
1. Create `src/components/[name]/` folder
2. Add `[Name].tsx`, `types.ts`, `use[Name]Config.ts`
3. Export from `src/components/[name]/index.ts`
4. Add to `src/index.ts`

### Adding Configuration
1. Add defaults in `src/config/defaults/`
2. Add helpers in `src/config/helpers/`
3. Update `src/config/config.ts` if needed
4. Export from `src/index.ts`

### Adding Documentation
1. Create guide in `docs/` folder
2. Create examples in `examples/` folder  
3. Link from main `README.md`
