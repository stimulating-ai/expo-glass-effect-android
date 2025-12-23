import { ConfigPlugin } from '@expo/config-plugins';
/**
 * Expo config plugin for expo-glass-effect-android.
 *
 * Adds the Kotlin Compose compiler plugin to settings.gradle pluginManagement
 * so library modules can apply it.
 */
declare const withLiquidGlass: ConfigPlugin;
export default withLiquidGlass;
