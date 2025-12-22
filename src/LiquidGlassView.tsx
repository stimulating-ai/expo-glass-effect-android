import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

import type { LiquidGlassViewProps } from './ExpoLiquidGlass.types';

const NativeView = Platform.OS === 'android'
  ? requireNativeViewManager('LiquidGlassView')
  : null;

/**
 * LiquidGlassView renders a glass effect with blur, lens refraction, and other visual effects.
 *
 * Must be placed inside a LiquidGlassProvider to work properly.
 * Children of this component are rendered ON TOP of the glass effect.
 *
 * @example
 * ```tsx
 * <LiquidGlassView
 *   style={{ width: 200, height: 100 }}
 *   blurRadius={10}
 *   lensHeight={16}
 *   lensRefractionAmount={32}
 *   vibrancy={true}
 *   surfaceOpacity={0.5}
 *   surfaceColor="#FFFFFF"
 *   cornerRadius={20}
 * >
 *   <Text>Content on the glass</Text>
 * </LiquidGlassView>
 * ```
 */
export function LiquidGlassView({
  blurRadius = 10,
  lensHeight = 16,
  lensRefractionAmount = 32,
  vibrancy = false,
  brightness = 0,
  contrast = 1,
  saturation = 1,
  surfaceOpacity = 0.5,
  surfaceColor = '#FFFFFF',
  cornerRadius = 0,
  children,
  style,
  ...props
}: LiquidGlassViewProps) {
  if (Platform.OS !== 'android' || !NativeView) {
    // On non-Android platforms, render a fallback with semi-transparent background
    return (
      <View
        style={[
          {
            backgroundColor: surfaceColor,
            opacity: surfaceOpacity,
            borderRadius: cornerRadius,
            overflow: 'hidden',
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }

  return (
    <NativeView
      blurRadius={blurRadius}
      lensHeight={lensHeight}
      lensRefractionAmount={lensRefractionAmount}
      vibrancy={vibrancy}
      brightness={brightness}
      contrast={contrast}
      saturation={saturation}
      surfaceOpacity={surfaceOpacity}
      surfaceColor={surfaceColor}
      cornerRadius={cornerRadius}
      style={style}
      {...props}
    >
      {children}
    </NativeView>
  );
}
