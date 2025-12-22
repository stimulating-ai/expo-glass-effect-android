import * as ExpoGlassEffectAndroid from '../index';

// Mock expo-modules-core
jest.mock('expo-modules-core', () => ({
  requireNativeViewManager: jest.fn(() => null),
}));

describe('expo-glass-effect-android exports', () => {
  it('exports LiquidGlassProvider', () => {
    expect(ExpoGlassEffectAndroid.LiquidGlassProvider).toBeDefined();
    expect(typeof ExpoGlassEffectAndroid.LiquidGlassProvider).toBe('function');
  });

  it('exports LiquidGlassView', () => {
    expect(ExpoGlassEffectAndroid.LiquidGlassView).toBeDefined();
    expect(typeof ExpoGlassEffectAndroid.LiquidGlassView).toBe('function');
  });

  it('exports the correct number of components', () => {
    const exports = Object.keys(ExpoGlassEffectAndroid);
    // Should export LiquidGlassProvider and LiquidGlassView
    expect(exports).toContain('LiquidGlassProvider');
    expect(exports).toContain('LiquidGlassView');
  });
});
