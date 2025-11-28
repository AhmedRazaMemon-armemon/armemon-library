# Custom Skins Debug Guide

## Issue: Custom skins not working?

### ✅ Correct Configuration

```typescript
import { configure, Text, SKINS } from "@armemon-library/react-native-ui";

// Configure ONCE - preferably in App.tsx, NOT inside a component
configure({
  text: {
    skins: {              // ← Must be 'skins' (not 'types')
      aaa: {
        baseSkin: 'small-light',  // ← Must be 'baseSkin' (not 'skin')
      },
      heading: {
        baseSkin: 'large-bold',
        styles: {
          letterSpacing: 1,
        }
      },
      myCustom: {
        fontSize: 20,     // Can specify fontSize directly
        styles: {
          color: 'red',
        }
      }
    }
  }
});

// Usage - use STRING for custom skins
<Text skin="aaa">This uses aaa skin (small-light base)</Text>
<Text skin="heading">This uses heading skin (large-bold base)</Text>
<Text skin="myCustom">This uses myCustom (20px, red)</Text>

// Built-in skins - use SKINS const OR string
<Text skin={SKINS.largeBold}>Built-in with const</Text>
<Text skin="large-bold">Built-in with string</Text>
```

## 🔍 Debugging Steps

### Step 1: Check if configure() is called
```typescript
import { getConfig } from '@armemon-library/react-native-ui';

// Add this to check
console.log('Config:', JSON.stringify(getConfig(), null, 2));
```

You should see:
```json
{
  "text": {
    "skins": {
      "aaa": {
        "baseSkin": "small-light"
      }
    }
  }
}
```

### Step 2: Call configure() OUTSIDE the component

❌ **WRONG - Inside component:**
```typescript
const SplashScreen = () => {
  // ❌ This runs on every render!
  configure({
    text: { skins: { aaa: { baseSkin: 'small-light' } } }
  });
  
  return <Text skin="aaa">text</Text>;
};
```

✅ **CORRECT - In App.tsx or top-level:**
```typescript
// App.tsx or index.tsx
import { configure } from '@armemon-library/react-native-ui';

// Configure ONCE at app startup
configure({
  text: {
    skins: {
      aaa: { baseSkin: 'small-light' }
    }
  }
});

function App() {
  return <SplashScreen />;
}

// SplashScreen.tsx - NO configure call
const SplashScreen = () => {
  return <Text skin="aaa">text</Text>;  // ✅ Just use it
};
```

### Step 3: Test with console logs

```typescript
import { Text, getConfig } from '@armemon-library/react-native-ui';

const SplashScreen = () => {
  const config = getConfig();
  
  // Debug: Check if custom skin exists
  console.log('Custom skins:', config.text?.skins);
  console.log('aaa skin:', config.text?.skins?.aaa);
  
  return (
    <View>
      <Text skin="aaa">Testing aaa skin</Text>
    </View>
  );
};
```

## 🚨 Common Mistakes

### Mistake 1: Using old property names
```typescript
❌ configure({ text: { types: { ... } } })      // Old name
✅ configure({ text: { skins: { ... } } })      // New name

❌ configure({ text: { skins: { aaa: { skin: '...' } } } })
✅ configure({ text: { skins: { aaa: { baseSkin: '...' } } } })
```

### Mistake 2: Looking for custom skins in SKINS const
```typescript
❌ <Text skin={SKINS.aaa} />     // Won't work - custom  skins not in SKINS
✅ <Text skin="aaa" />            // Correct - use string
```

### Mistake 3: Configuring inside component
```typescript
❌ const MyComponent = () => {
     configure({ ... });  // Runs on every render!
   }

✅ // Top of App.tsx
   configure({ ... });   // Runs once
   
   const MyComponent = () => { ... }
```

## ✅ Complete Working Example

```typescript
// App.tsx
import React from 'react';
import { configure } from '@armemon-library/react-native-ui';
import SplashScreen from './screens/SplashScreen';

// Configure ONCE at app level
configure({
  text: {
    skins: {
      aaa: {
        baseSkin: 'small-light',
      },
      heading: {
        baseSkin: 'extra-large-bold',
        styles: {
          letterSpacing: 1,
          lineHeight: 32,
        }
      },
    }
  }
});

export default function App() {
  return <SplashScreen />;
}
```

```typescript
// screens/SplashScreen.tsx
import React from 'react';
import { View } from 'react-native';
import { Text, SKINS } from '@armemon-library/react-native-ui';

const SplashScreen = () => {
  return (
    <View style={{ padding: 20 }}>
      {/* Custom skins */}
      <Text skin="aaa">Custom aaa skin (small-light)</Text>
      <Text skin="heading">Custom heading skin</Text>
      
      {/* Built-in skins */}
      <Text skin={SKINS.largeBold}>Built-in Large Bold</Text>
      <Text skin="medium-regular">Built-in Medium Regular</Text>
    </View>
  );
};

export default SplashScreen;
```

## 🎯 Quick Test

Try this minimal test:

```typescript
import { configure, Text, getConfig } from '@armemon-library/react-native-ui';

// 1. Configure
configure({
  text: {
    skins: {
      test: { baseSkin: 'large-bold' }
    }
  }
});

// 2. Check config
console.log('Skins:', getConfig().text.skins);  
// Should log: { test: { baseSkin: 'large-bold' } }

// 3. Use it
<Text skin="test">If this is large and bold, it works!</Text>
```

If this works, your custom skins are configured correctly! 🎉
