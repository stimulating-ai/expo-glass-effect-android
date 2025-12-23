import {
  ConfigPlugin,
  withProjectBuildGradle,
  withSettingsGradle,
} from '@expo/config-plugins';

/**
 * Expo config plugin for expo-glass-effect-android.
 *
 * This plugin ensures that Jetpack Compose compiler is properly configured for Kotlin 2.0+.
 */
const withLiquidGlass: ConfigPlugin = (config) => {
  // Add compose compiler plugin to settings.gradle for Kotlin 2.0+ compatibility
  config = withSettingsGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      let contents = config.modResults.contents;

      // Check if compose compiler plugin is already in pluginManagement
      if (!contents.includes('org.jetbrains.kotlin.plugin.compose')) {
        // Add compose compiler plugin to pluginManagement plugins block
        // This is required for Kotlin 2.0+
        const pluginManagementRegex = /pluginManagement\s*\{[\s\S]*?plugins\s*\{/;
        if (pluginManagementRegex.test(contents)) {
          contents = contents.replace(
            pluginManagementRegex,
            (match) => `${match}\n        id("org.jetbrains.kotlin.plugin.compose") version "2.0.21" apply false`
          );
        }
      }

      config.modResults.contents = contents;
    }
    return config;
  });

  // Ensure compose compiler plugin is applied in root build.gradle for Kotlin 2.0+
  config = withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      let contents = config.modResults.contents;

      // Add compose compiler plugin to plugins block if not present
      if (!contents.includes('org.jetbrains.kotlin.plugin.compose')) {
        // Try to add to plugins block
        const pluginsBlockRegex = /plugins\s*\{/;
        if (pluginsBlockRegex.test(contents)) {
          contents = contents.replace(
            pluginsBlockRegex,
            `plugins {\n    id("org.jetbrains.kotlin.plugin.compose") version "2.0.21" apply false`
          );
        }
      }

      config.modResults.contents = contents;
    }
    return config;
  });

  return config;
};

export default withLiquidGlass;
