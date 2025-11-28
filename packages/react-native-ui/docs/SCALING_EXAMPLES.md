# Scaling System - Usage Examples

This document demonstrates how to use the new scaling system with native and custom text scaling, plus independent UI scaling.

## Basic Setup

### Option 1: Without Provider (Recommended)

The scaling system works automatically without any provider. Just configure it once in your app entry:

```typescript
import { configure } from '@armemon-library/react-native-ui';

// In your App.tsx or index.js
configure({
  scaling: {
    textScale: {
      mode: 'both',           // 'native' | 'custom' | 'both'
      customMultiplier: 1.0,  // 0.8 - 1.5 recommended
      respectNative: true
    },
    uiScale: {
      enabled: true,
      multiplier: 1.0         // 0.8 - 1.5 recommended
    }
  }
});
```

### Option 2: With Provider (Optional)

If you prefer using a provider pattern:

```typescript
import { ScalingProvider } from '@armemon-library/react-native-ui';

function App() {
  return (
    <ScalingProvider>
      {/* Your app content */}
    </ScalingProvider>
  );
}
```

## Text Scaling

### Automatic Native Font Scaling

Text components automatically respect device accessibility font settings:

```typescript
import { Text } from '@armemon-library/react-native-ui';

function MyComponent() {
  return (
    <Text type="medium">
      This text automatically scales with device settings!
    </Text>
  );
}
```

### Custom Text Scaling

Control text scaling programmatically:

```typescript
import { setCustomTextScale, useScaling } from '@armemon-library/react-native-ui';

function FontScaleControls() {
  const { customTextScale, effectiveTextScale } = useScaling();

  return (
    <View>
      <Text>Custom Scale: {customTextScale}</Text>
      <Text>Effective Scale: {effectiveTextScale.toFixed(2)}</Text>
      
      <Button 
        title="Smaller (0.8x)"
        onPress={() => setCustomTextScale(0.8)}
      />
      <Button 
        title="Normal (1.0x)"
        onPress={() => setCustomTextScale(1.0)}
      />
      <Button 
        title="Larger (1.2x)"
        onPress={() => setCustomTextScale(1.2)}
      />
    </View>
  );
}
```

### Scaling Modes

Control how text scaling works:

```typescript
import { setTextScaleMode } from '@armemon-library/react-native-ui';

// Only use native device font scale
setTextScaleMode('native');

// Only use custom multiplier
setTextScaleMode('custom');

// Combine both (default)
setTextScaleMode('both');  // effectiveScale = nativeScale * customScale
```

### Disable Scaling for Specific Text

Sometimes you need fixed-size text (e.g., icons, badges):

```typescript
<Text type="medium" disableScaling>
  This won't scale with any settings
</Text>
```

## UI Scaling

Scale your UI elements independently from text:

### Using `useScaledValue` Hook

```typescript
import { useScaledValue } from '@armemon-library/react-native-ui';

function Card() {
  const padding = useScaledValue(20, 'ui');    // Scales with UI scale
  const fontSize = useScaledValue(16, 'text'); // Scales with text scale

  return (
    <View style={{ padding }}>
      <Text size={fontSize}>Scalable Card</Text>
    </View>
  );
}
```

### Control UI Scaling

```typescript
import { setUIScale, useScaling } from '@armemon-library/react-native-ui';

function UIScaleControls() {
  const { effectiveUIScale } = useScaling();

  return (
    <View>
      <Text>UI Scale: {effectiveUIScale.toFixed(2)}</Text>
      
      <Button 
        title="Compact (0.9x)"
        onPress={() => setUIScale(0.9)}
      />
      <Button 
        title="Normal (1.0x)"
        onPress={() => setUIScale(1.0)}
      />
      <Button 
        title="Spacious (1.3x)"
        onPress={() => setUIScale(1.3)}
      />
    </View>
  );
}
```

## Complete Example

```typescript
import React from 'react';
import { View, Button, ScrollView } from 'react-native';
import {
  Text,
  useScaling,
  useScaledValue,
  setCustomTextScale,
  setUIScale,
  setTextScaleMode
} from '@armemon-library/react-native-ui';

function ScalingDemo() {
  const { 
    nativeFontScale, 
    customTextScale, 
    effectiveTextScale,
    effectiveUIScale 
  } = useScaling();

  // UI values that scale automatically
  const containerPadding = useScaledValue(20, 'ui');
  const itemSpacing = useScaledValue(12, 'ui');

  return (
    <ScrollView style={{ padding: containerPadding }}>
      {/* Info Display */}
      <View style={{ marginBottom: itemSpacing }}>
        <Text type="large-bold">Scaling Information</Text>
        <Text>Native Font Scale: {nativeFontScale.toFixed(2)}</Text>
        <Text>Custom Text Scale: {customTextScale.toFixed(2)}</Text>
        <Text>Effective Text Scale: {effectiveTextScale.toFixed(2)}</Text>
        <Text>UI Scale: {effectiveUIScale.toFixed(2)}</Text>
      </View>

      {/* Text Scale Controls */}
      <View style={{ marginBottom: itemSpacing }}>
        <Text type="medium-bold">Text Scale</Text>
        <Button title="Small (0.8x)" onPress={() => setCustomTextScale(0.8)} />
        <Button title="Normal (1.0x)" onPress={() => setCustomTextScale(1.0)} />
        <Button title="Large (1.2x)" onPress={() => setCustomTextScale(1.2)} />
      </View>

      {/* UI Scale Controls */}
      <View style={{ marginBottom: itemSpacing }}>
        <Text type="medium-bold">UI Scale</Text>
        <Button title="Compact (0.9x)" onPress={() => setUIScale(0.9)} />
        <Button title="Normal (1.0x)" onPress={() => setUIScale(1.0)} />
        <Button title="Spacious (1.3x)" onPress={() => setUIScale(1.3)} />
      </View>

      {/* Scaling Mode Controls */}
      <View style={{ marginBottom: itemSpacing }}>
        <Text type="medium-bold">Scaling Mode</Text>
        <Button title="Native Only" onPress={() => setTextScaleMode('native')} />
        <Button title="Custom Only" onPress={() => setTextScaleMode('custom')} />
        <Button title="Both Combined" onPress={() => setTextScaleMode('both')} />
      </View>

      {/* Sample Content */}
      <View style={{ marginTop: itemSpacing }}>
        <Text type="extra-large-bold">Sample Text Sizes</Text>
        <Text type="extra-small">Extra Small Text</Text>
        <Text type="small">Small Text</Text>
        <Text type="medium">Medium Text (Default)</Text>
        <Text type="large">Large Text</Text>
        <Text type="extra-large">Extra Large Text</Text>
        
        <Text type="medium" disableScaling>
          This text doesn't scale (disableScaling prop)
        </Text>
      </View>
    </ScrollView>
  );
}

export default ScalingDemo;
```

## Advanced: Custom Containers with UI Scaling

For future container and template components:

```typescript
import { useScaledValue } from '@armemon-library/react-native-ui';

function ScalableContainer({ children }) {
  const padding = useScaledValue(16, 'ui');
  const borderRadius = useScaledValue(8, 'ui');
  const margin = useScaledValue(12, 'ui');

  return (
    <View 
      style={{
        padding,
        borderRadius,
        margin,
        backgroundColor: '#f0f0f0'
      }}
    >
      {children}
    </View>
  );
}
```

## API Reference

### Hooks

- `useScaling()` - Get all scaling values and controls
- `useNativeFontScale()` - Get only native font scale
- `useScaledValue(value, type)` - Scale any numeric value

### Helper Functions

- `setCustomTextScale(multiplier)` - Set custom text scale (0.8-1.5)
- `setUIScale(multiplier)` - Set UI scale (0.8-1.5)
- `setTextScaleMode(mode)` - Set scaling mode ('native' | 'custom' | 'both')
- `configure({ scaling: {...} })` - Configure entire scaling system

### Components

- `<ScalingProvider>` - Optional provider component
- `<Text disableScaling>` - Disable scaling for specific text

### Types

```typescript
interface ScalingContextType {
  nativeFontScale: number;
  customTextScale: number;
  uiScale: number;
  effectiveTextScale: number;
  effectiveUIScale: number;
  setCustomTextScale: (scale: number) => void;
  setUIScale: (scale: number) => void;
  setTextScaleMode: (mode: 'native' | 'custom' | 'both') => void;
}
```
