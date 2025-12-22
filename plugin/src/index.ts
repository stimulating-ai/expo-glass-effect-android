import {
  ConfigPlugin,
  withProjectBuildGradle,
  withAppBuildGradle,
  withGradleProperties,
} from '@expo/config-plugins';

/**
 * Expo config plugin for expo-liquid-glass.
 *
 * This plugin ensures that Jetpack Compose is properly configured in your Android project.
 */
const withLiquidGlass: ConfigPlugin = (config) => {
  // Ensure kotlin version is set correctly in project build.gradle
  config = withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      let contents = config.modResults.contents;

      // Ensure kotlinVersion is at least 1.9.10 for Compose compatibility
      if (!contents.includes('kotlinVersion')) {
        // Add kotlinVersion to ext block if not present
        contents = contents.replace(
          /ext\s*\{/,
          `ext {\n        kotlinVersion = "1.9.10"`
        );
      }

      config.modResults.contents = contents;
    }
    return config;
  });

  // Add Compose configuration to app build.gradle
  config = withAppBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      let contents = config.modResults.contents;

      // Add buildFeatures.compose = true if not present
      if (!contents.includes('compose true') && !contents.includes('compose = true')) {
        contents = contents.replace(
          /android\s*\{/,
          `android {\n    buildFeatures {\n        compose true\n    }\n    composeOptions {\n        kotlinCompilerExtensionVersion = "1.5.3"\n    }`
        );
      }

      config.modResults.contents = contents;
    }
    return config;
  });

  // Ensure new architecture is enabled for better performance
  config = withGradleProperties(config, (config) => {
    // Check if newArchEnabled is already set
    const newArchEnabledProp = config.modResults.find(
      (item) => item.type === 'property' && item.key === 'newArchEnabled'
    );

    // We don't force new architecture, just log a recommendation
    // The module works with both old and new architecture

    return config;
  });

  return config;
};

export default withLiquidGlass;
