import {
  ConfigPlugin,
  withProjectBuildGradle,
  withSettingsGradle,
} from '@expo/config-plugins';

/**
 * Expo config plugin for expo-glass-effect-android.
 *
 * For Kotlin 2.0+, the compose compiler plugin must be declared in the host project
 * before library modules can apply it. This plugin adds that declaration.
 *
 * For Kotlin 1.x, no plugin is needed (uses composeOptions instead).
 */

// Extract Kotlin version from gradle contents
function getKotlinVersion(contents: string): string | null {
  // Try to find kotlinVersion in ext block: kotlinVersion = "2.0.21"
  const extMatch = contents.match(/kotlinVersion\s*=\s*["']([^"']+)["']/);
  if (extMatch) {
    return extMatch[1];
  }
  return null;
}

// Check if Kotlin version is 2.0+
function isKotlin2Plus(version: string | null): boolean {
  if (!version) return false;
  const parts = version.split('.');
  const major = parseInt(parts[0], 10);
  return major >= 2;
}

const withLiquidGlass: ConfigPlugin = (config) => {
  // Add to build.gradle plugins block
  config = withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      const kotlinVersion = getKotlinVersion(config.modResults.contents);

      // Only add compose plugin for Kotlin 2.0+
      if (isKotlin2Plus(kotlinVersion)) {
        let contents = config.modResults.contents;

        if (!contents.includes('org.jetbrains.kotlin.plugin.compose')) {
          const pluginsBlockRegex = /plugins\s*\{/;
          if (pluginsBlockRegex.test(contents)) {
            contents = contents.replace(
              pluginsBlockRegex,
              `plugins {\n    id("org.jetbrains.kotlin.plugin.compose") version "${kotlinVersion}" apply false`
            );
          }
        }

        config.modResults.contents = contents;
      }
    }
    return config;
  });

  // Add to settings.gradle pluginManagement
  // Note: settings.gradle usually doesn't have kotlinVersion, so we use a fallback
  config = withSettingsGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      let contents = config.modResults.contents;

      // Check if compose compiler plugin is already declared
      if (!contents.includes('org.jetbrains.kotlin.plugin.compose')) {
        // Try to detect Kotlin version from settings.gradle or use a fallback
        let kotlinVersion = getKotlinVersion(contents);

        // If not in settings.gradle, check if there's a version catalog or use fallback
        if (!kotlinVersion) {
          // Look for kotlin plugin version in pluginManagement
          const kotlinPluginMatch = contents.match(/id\s*\(?["']org\.jetbrains\.kotlin\.[^"']+["']\)?\s*version\s*["']([^"']+)["']/);
          if (kotlinPluginMatch) {
            kotlinVersion = kotlinPluginMatch[1];
          }
        }

        // Only add if we detected Kotlin 2.0+ or if Kotlin plugin is defined
        if (isKotlin2Plus(kotlinVersion)) {
          const pluginManagementRegex = /pluginManagement\s*\{[\s\S]*?plugins\s*\{/;
          if (pluginManagementRegex.test(contents)) {
            contents = contents.replace(
              pluginManagementRegex,
              (match) => `${match}\n        id("org.jetbrains.kotlin.plugin.compose") version "${kotlinVersion}" apply false`
            );
            config.modResults.contents = contents;
          }
        }
      }
    }
    return config;
  });

  return config;
};

export default withLiquidGlass;
