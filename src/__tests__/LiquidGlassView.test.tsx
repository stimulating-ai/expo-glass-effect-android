import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, View, Platform } from 'react-native';

import { LiquidGlassView } from '../LiquidGlassView';

// Mock expo-modules-core
jest.mock('expo-modules-core', () => ({
  requireNativeViewManager: jest.fn(() => null),
}));

describe('LiquidGlassView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('on non-Android platforms (fallback mode)', () => {
    beforeAll(() => {
      Platform.OS = 'ios';
    });

    it('renders children correctly', () => {
      const { getByText } = render(
        <LiquidGlassView>
          <Text>Glass Content</Text>
        </LiquidGlassView>
      );

      expect(getByText('Glass Content')).toBeTruthy();
    });

    it('applies surfaceColor and surfaceOpacity as fallback style', () => {
      const { getByTestId } = render(
        <LiquidGlassView
          surfaceColor="#0088FF"
          surfaceOpacity={0.7}
          testID="glass-view"
        >
          <Text>Content</Text>
        </LiquidGlassView>
      );

      const glassView = getByTestId('glass-view');
      expect(glassView.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: '#0088FF',
            opacity: 0.7,
          }),
        ])
      );
    });

    it('applies cornerRadius as borderRadius', () => {
      const { getByTestId } = render(
        <LiquidGlassView
          cornerRadius={20}
          testID="glass-view"
        >
          <Text>Content</Text>
        </LiquidGlassView>
      );

      const glassView = getByTestId('glass-view');
      expect(glassView.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            borderRadius: 20,
          }),
        ])
      );
    });

    it('uses default prop values', () => {
      const { getByTestId } = render(
        <LiquidGlassView testID="glass-view">
          <Text>Content</Text>
        </LiquidGlassView>
      );

      const glassView = getByTestId('glass-view');
      expect(glassView.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: '#FFFFFF',
            opacity: 0.5,
            borderRadius: 0,
          }),
        ])
      );
    });

    it('applies custom styles', () => {
      const { getByTestId } = render(
        <LiquidGlassView
          style={{ width: 200, height: 100, margin: 10 }}
          testID="glass-view"
        >
          <Text>Content</Text>
        </LiquidGlassView>
      );

      const glassView = getByTestId('glass-view');
      expect(glassView.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ width: 200, height: 100, margin: 10 }),
        ])
      );
    });

    it('renders multiple children', () => {
      const { getByText } = render(
        <LiquidGlassView>
          <Text>Child 1</Text>
          <Text>Child 2</Text>
          <View>
            <Text>Nested</Text>
          </View>
        </LiquidGlassView>
      );

      expect(getByText('Child 1')).toBeTruthy();
      expect(getByText('Child 2')).toBeTruthy();
      expect(getByText('Nested')).toBeTruthy();
    });

    it('sets overflow to hidden', () => {
      const { getByTestId } = render(
        <LiquidGlassView testID="glass-view">
          <Text>Content</Text>
        </LiquidGlassView>
      );

      const glassView = getByTestId('glass-view');
      expect(glassView.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            overflow: 'hidden',
          }),
        ])
      );
    });
  });

  describe('on Android platform', () => {
    beforeAll(() => {
      Platform.OS = 'android';
    });

    it('falls back to View when native module is not available', () => {
      const { getByText, getByTestId } = render(
        <LiquidGlassView testID="glass-view">
          <Text>Android Glass Content</Text>
        </LiquidGlassView>
      );

      expect(getByText('Android Glass Content')).toBeTruthy();
      expect(getByTestId('glass-view')).toBeTruthy();
    });
  });

  describe('prop validation', () => {
    beforeAll(() => {
      Platform.OS = 'ios';
    });

    it('handles all blur props', () => {
      const { getByTestId } = render(
        <LiquidGlassView
          blurRadius={15}
          testID="glass-view"
        >
          <Text>Content</Text>
        </LiquidGlassView>
      );

      // In fallback mode, blurRadius is not applied to styles
      // but component should render without errors
      expect(getByTestId('glass-view')).toBeTruthy();
    });

    it('handles all lens props', () => {
      const { getByTestId } = render(
        <LiquidGlassView
          lensHeight={20}
          lensRefractionAmount={40}
          testID="glass-view"
        >
          <Text>Content</Text>
        </LiquidGlassView>
      );

      expect(getByTestId('glass-view')).toBeTruthy();
    });

    it('handles all color control props', () => {
      const { getByTestId } = render(
        <LiquidGlassView
          vibrancy={true}
          brightness={0.5}
          contrast={1.2}
          saturation={1.5}
          testID="glass-view"
        >
          <Text>Content</Text>
        </LiquidGlassView>
      );

      expect(getByTestId('glass-view')).toBeTruthy();
    });

    it('handles boolean vibrancy prop', () => {
      const { getByTestId, rerender } = render(
        <LiquidGlassView vibrancy={true} testID="glass-view">
          <Text>Content</Text>
        </LiquidGlassView>
      );

      expect(getByTestId('glass-view')).toBeTruthy();

      rerender(
        <LiquidGlassView vibrancy={false} testID="glass-view">
          <Text>Content</Text>
        </LiquidGlassView>
      );

      expect(getByTestId('glass-view')).toBeTruthy();
    });
  });
});
