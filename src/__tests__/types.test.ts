/**
 * Type tests for expo-glass-effect-android
 * These tests verify that the TypeScript types are correctly defined.
 */

import type {
  LiquidGlassProviderProps,
  LiquidGlassViewProps,
} from '../ExpoLiquidGlass.types';

describe('TypeScript types', () => {
  describe('LiquidGlassProviderProps', () => {
    it('should accept valid props', () => {
      const validProps: LiquidGlassProviderProps = {
        backgroundColor: '#FFFFFF',
        style: { flex: 1 },
      };

      expect(validProps.backgroundColor).toBe('#FFFFFF');
    });

    it('should allow optional backgroundColor', () => {
      const propsWithoutBg: LiquidGlassProviderProps = {
        style: { flex: 1 },
      };

      expect(propsWithoutBg.backgroundColor).toBeUndefined();
    });
  });

  describe('LiquidGlassViewProps', () => {
    it('should accept all valid props', () => {
      const validProps: LiquidGlassViewProps = {
        blurRadius: 10,
        lensHeight: 16,
        lensRefractionAmount: 32,
        vibrancy: true,
        brightness: 0.5,
        contrast: 1.2,
        saturation: 1.5,
        surfaceOpacity: 0.5,
        surfaceColor: '#FFFFFF',
        cornerRadius: 20,
        style: { width: 200, height: 100 },
      };

      expect(validProps.blurRadius).toBe(10);
      expect(validProps.vibrancy).toBe(true);
    });

    it('should allow all props to be optional', () => {
      const minimalProps: LiquidGlassViewProps = {};

      expect(minimalProps.blurRadius).toBeUndefined();
      expect(minimalProps.vibrancy).toBeUndefined();
    });

    it('should accept numeric values for blur props', () => {
      const props: LiquidGlassViewProps = {
        blurRadius: 15,
      };

      expect(typeof props.blurRadius).toBe('number');
    });

    it('should accept numeric values for lens props', () => {
      const props: LiquidGlassViewProps = {
        lensHeight: 20,
        lensRefractionAmount: 40,
      };

      expect(typeof props.lensHeight).toBe('number');
      expect(typeof props.lensRefractionAmount).toBe('number');
    });

    it('should accept boolean for vibrancy', () => {
      const props: LiquidGlassViewProps = {
        vibrancy: false,
      };

      expect(typeof props.vibrancy).toBe('boolean');
    });

    it('should accept numeric values for color controls', () => {
      const props: LiquidGlassViewProps = {
        brightness: -0.5,
        contrast: 1.5,
        saturation: 0.8,
      };

      expect(typeof props.brightness).toBe('number');
      expect(typeof props.contrast).toBe('number');
      expect(typeof props.saturation).toBe('number');
    });

    it('should accept string for surfaceColor', () => {
      const props: LiquidGlassViewProps = {
        surfaceColor: '#0088FF',
      };

      expect(typeof props.surfaceColor).toBe('string');
    });

    it('should accept numeric for surfaceOpacity', () => {
      const props: LiquidGlassViewProps = {
        surfaceOpacity: 0.7,
      };

      expect(typeof props.surfaceOpacity).toBe('number');
    });

    it('should accept numeric for cornerRadius', () => {
      const props: LiquidGlassViewProps = {
        cornerRadius: 16,
      };

      expect(typeof props.cornerRadius).toBe('number');
    });
  });
});
