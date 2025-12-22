import * as React from 'react';
import type { LiquidGlassProviderProps } from './ExpoLiquidGlass.types';
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
export declare function LiquidGlassProvider({ backgroundColor, children, style, ...props }: LiquidGlassProviderProps): React.JSX.Element;
//# sourceMappingURL=LiquidGlassProvider.d.ts.map