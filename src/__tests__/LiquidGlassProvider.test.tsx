import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, View, Platform } from 'react-native';

import { LiquidGlassProvider } from '../LiquidGlassProvider';

// Mock expo-modules-core
jest.mock('expo-modules-core', () => ({
  requireNativeViewManager: jest.fn(() => null),
}));

describe('LiquidGlassProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('on non-Android platforms', () => {
    beforeAll(() => {
      Platform.OS = 'ios';
    });

    it('renders children correctly', () => {
      const { getByText } = render(
        <LiquidGlassProvider>
          <Text>Test Child</Text>
        </LiquidGlassProvider>
      );

      expect(getByText('Test Child')).toBeTruthy();
    });

    it('applies backgroundColor prop as style', () => {
      const { getByTestId } = render(
        <LiquidGlassProvider
          backgroundColor="#FF0000"
          testID="provider"
        >
          <Text>Content</Text>
        </LiquidGlassProvider>
      );

      const provider = getByTestId('provider');
      expect(provider.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ backgroundColor: '#FF0000' }),
        ])
      );
    });

    it('applies custom styles', () => {
      const { getByTestId } = render(
        <LiquidGlassProvider
          style={{ flex: 1, padding: 20 }}
          testID="provider"
        >
          <Text>Content</Text>
        </LiquidGlassProvider>
      );

      const provider = getByTestId('provider');
      expect(provider.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ flex: 1, padding: 20 }),
        ])
      );
    });

    it('uses default white background when no backgroundColor provided', () => {
      const { getByTestId } = render(
        <LiquidGlassProvider testID="provider">
          <Text>Content</Text>
        </LiquidGlassProvider>
      );

      const provider = getByTestId('provider');
      expect(provider.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ backgroundColor: '#FFFFFF' }),
        ])
      );
    });

    it('renders multiple children', () => {
      const { getByText } = render(
        <LiquidGlassProvider>
          <Text>Child 1</Text>
          <Text>Child 2</Text>
          <View>
            <Text>Nested Child</Text>
          </View>
        </LiquidGlassProvider>
      );

      expect(getByText('Child 1')).toBeTruthy();
      expect(getByText('Child 2')).toBeTruthy();
      expect(getByText('Nested Child')).toBeTruthy();
    });
  });

  describe('on Android platform', () => {
    beforeAll(() => {
      Platform.OS = 'android';
    });

    it('falls back to View when native module is not available', () => {
      const { getByText, getByTestId } = render(
        <LiquidGlassProvider testID="provider">
          <Text>Android Content</Text>
        </LiquidGlassProvider>
      );

      expect(getByText('Android Content')).toBeTruthy();
      expect(getByTestId('provider')).toBeTruthy();
    });
  });
});
