import {
  ConfigPlugin,
  withSettingsGradle,
} from '@expo/config-plugins';

/**
 * Expo config plugin for expo-glass-effect-android.
 *
 * Adds the Kotlin Compose compiler plugin to settings.gradle pluginManagement
 * so library modules can apply it.
 */
const withLiquidGlass: ConfigPlugin = (config) => {
  config = withSettingsGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      let contents = config.modResults.contents;

      // Add compose compiler plugin to pluginManagement if not present
      if (!contents.includes('org.jetbrains.kotlin.plugin.compose')) {
        // Find the plugins block inside pluginManagement
        const pluginManagementPluginsRegex = /(pluginManagement\s*\{[\s\S]*?plugins\s*\{)/;
        const match = contents.match(pluginManagementPluginsRegex);

        if (match) {
          contents = contents.replace(
            pluginManagementPluginsRegex,
            `$1\n        id("org.jetbrains.kotlin.plugin.compose") apply false`
          );
          config.modResults.contents = contents;
        }
      }
    }
    return config;
  });

  return config;
};

export default withLiquidGlass;
