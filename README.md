# expo-glass-effect-android

Liquid glass effect for React Native / Expo using [AndroidLiquidGlass (Backdrop)](https://github.com/Kyant0/AndroidLiquidGlass).

This package brings the beautiful liquid glass morphism effect to your React Native apps, featuring blur, lens refraction, vibrancy, and more.

## Features

- Blur effect with customizable radius
- Lens refraction effect (Android 13+) for the distinctive "liquid glass" look
- Vibrancy (saturation boost) for vivid colors through the glass
- Color controls (brightness, contrast, saturation)
- Semi-transparent surface overlay
- Rounded corners support
- Graceful fallback for older Android versions

## Platform Support

| Platform | Support |
|----------|---------|
| Android 13+ (API 33) | Full support (blur + lens + all effects) |
| Android 12 (API 31-32) | Partial (blur + color effects, no lens) |
| Android < 12 | Fallback (plain semi-transparent background) |
| iOS | Fallback only (plain background) |

## Installation

```bash
npx expo install expo-glass-effect-android
```

Or with npm/yarn:

```bash
npm install expo-glass-effect-android
# or
yarn add expo-glass-effect-android
```

### Expo Config Plugin (Required)

Add the plugin to your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": ["expo-glass-effect-android"]
  }
}
```

Then rebuild your app:

```bash
npx expo prebuild --clean
npx expo run:android
```

## Usage

```tsx
import { LiquidGlassProvider, LiquidGlassView } from 'expo-glass-effect-android';

function App() {
  return (
    <LiquidGlassProvider style={{ flex: 1 }} backgroundColor="#FFFFFF">
      {/* Your app content - this will appear "behind" the glass */}
      <ScrollView>
        <Image source={require('./background.jpg')} style={{ width: '100%', height: 400 }} />
        <Text style={{ fontSize: 24, padding: 20 }}>
          Scroll through this content to see the glass effect!
        </Text>
      </ScrollView>

      {/* Glass effect overlay */}
      <LiquidGlassView
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: 80,
        }}
        blurRadius={10}
        lensHeight={16}
        lensRefractionAmount={32}
        vibrancy={true}
        surfaceOpacity={0.5}
        surfaceColor="#FFFFFF"
        cornerRadius={20}
      >
        {/* Content ON TOP of the glass */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Glass Bottom Bar
          </Text>
        </View>
      </LiquidGlassView>
    </LiquidGlassProvider>
  );
}
```

## API

### LiquidGlassProvider

Wraps your app content to enable backdrop capture for glass effects.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundColor` | `string` | `"#FFFFFF"` | Background color for the backdrop |
| `style` | `ViewStyle` | - | Style for the container |
| `children` | `ReactNode` | - | Content that appears behind the glass |

### LiquidGlassView

Renders the glass effect with blur, lens refraction, and other visual effects.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `blurRadius` | `number` | `10` | Blur radius in dp |
| `lensHeight` | `number` | `16` | Lens refraction height in dp (Android 13+) |
| `lensRefractionAmount` | `number` | `32` | Lens refraction amount in dp (Android 13+) |
| `vibrancy` | `boolean` | `false` | Enable 1.5x saturation boost |
| `brightness` | `number` | `0` | Brightness adjustment (-1 to 1) |
| `contrast` | `number` | `1` | Contrast adjustment (0 to 2) |
| `saturation` | `number` | `1` | Saturation adjustment (0 to 2) |
| `surfaceOpacity` | `number` | `0.5` | Surface overlay opacity (0 to 1) |
| `surfaceColor` | `string` | `"#FFFFFF"` | Surface overlay color |
| `cornerRadius` | `number` | `0` | Corner radius in dp |
| `style` | `ViewStyle` | - | Style for the glass container |
| `children` | `ReactNode` | - | Content rendered on top of the glass |

## Examples

### Glass Bottom Tab Bar

```tsx
<LiquidGlassView
  style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80 }}
  blurRadius={15}
  lensHeight={20}
  lensRefractionAmount={40}
  vibrancy={true}
  surfaceOpacity={0.3}
  cornerRadius={0}
>
  <TabBar />
</LiquidGlassView>
```

### Glass Card

```tsx
<LiquidGlassView
  style={{ width: 300, height: 200, margin: 20 }}
  blurRadius={8}
  lensHeight={12}
  lensRefractionAmount={24}
  surfaceOpacity={0.6}
  surfaceColor="#FFFFFF"
  cornerRadius={16}
>
  <CardContent />
</LiquidGlassView>
```

### Tinted Glass Button

```tsx
<LiquidGlassView
  style={{ width: 120, height: 48 }}
  blurRadius={6}
  vibrancy={true}
  saturation={1.5}
  surfaceOpacity={0.4}
  surfaceColor="#0088FF"
  cornerRadius={24}
>
  <Text style={{ color: 'white' }}>Press Me</Text>
</LiquidGlassView>
```

## How It Works

This package uses the [AndroidLiquidGlass (Backdrop)](https://github.com/Kyant0/AndroidLiquidGlass) library by Kyant0, which leverages Android's `RenderEffect` API (Android 12+) and custom shaders (Android 13+) to create realistic glass effects.

The `LiquidGlassProvider` captures the content behind the glass using Jetpack Compose's backdrop system, and `LiquidGlassView` renders that captured content with various effects applied.

## License

MIT

## Credits

- [AndroidLiquidGlass (Backdrop)](https://github.com/Kyant0/AndroidLiquidGlass) by Kyant0 - Apache-2.0 License
