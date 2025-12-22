import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';
import { Platform, View } from 'react-native';

import type { LiquidGlassProviderProps } from './ExpoLiquidGlass.types';

const NativeView = Platform.OS === 'android'
  ? requireNativeViewManager('LiquidGlassProviderView')
  : null;

/**
 * LiquidGlassProvider wraps your app content to enable backdrop capture for glass effects.
 *
 * Any LiquidGlassView components inside this provider will be able to display
 * the glass effect using the content within this provider as the backdrop.
 *
 * @example
 * ```tsx
 * <LiquidGlassProvider style={{ flex: 1 }} backgroundColor="#FFFFFF">
 *   <YourAppContent />
 *   <LiquidGlassView style={{ position: 'absolute', bottom: 0 }}>
 *     <Text>Content on the glass</Text>
 *   </LiquidGlassView>
 * </LiquidGlassProvider>
 * ```
 */
export function LiquidGlassProvider({
  backgroundColor = '#FFFFFF',
  children,
  style,
  ...props
}: LiquidGlassProviderProps) {
  if (Platform.OS !== 'android' || !NativeView) {
    // On non-Android platforms, just render a regular View
    return (
      <View style={[{ backgroundColor }, style]} {...props}>
        {children}
      </View>
    );
  }

  return (
    <NativeView
      backgroundColor={backgroundColor}
      style={style}
      {...props}
    >
      {children}
    </NativeView>
  );
}
