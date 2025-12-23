"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
/**
 * Expo config plugin for expo-glass-effect-android.
 *
 * Adds the Kotlin Compose compiler plugin to settings.gradle pluginManagement
 * so library modules can apply it.
 */
const withLiquidGlass = (config) => {
    config = (0, config_plugins_1.withSettingsGradle)(config, (config) => {
        if (config.modResults.language === 'groovy') {
            let contents = config.modResults.contents;
            // Add compose compiler plugin to pluginManagement if not present
            if (!contents.includes('org.jetbrains.kotlin.plugin.compose')) {
                // Try to detect Kotlin version from existing kotlin plugin declaration
                // Pattern: id("org.jetbrains.kotlin.android") version "2.0.21"
                const kotlinVersionMatch = contents.match(/id\s*\(?\s*["']org\.jetbrains\.kotlin\.\w+["']\s*\)?\s*version\s*["']([^"']+)["']/);
                const kotlinVersion = kotlinVersionMatch ? kotlinVersionMatch[1] : '2.0.21';
                // Find the plugins block inside pluginManagement
                const pluginManagementPluginsRegex = /(pluginManagement\s*\{[\s\S]*?plugins\s*\{)/;
                const match = contents.match(pluginManagementPluginsRegex);
                if (match) {
                    contents = contents.replace(pluginManagementPluginsRegex, `$1\n        id("org.jetbrains.kotlin.plugin.compose") version "${kotlinVersion}" apply false`);
                    config.modResults.contents = contents;
                }
            }
        }
        return config;
    });
    return config;
};
exports.default = withLiquidGlass;
