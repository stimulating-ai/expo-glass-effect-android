"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Expo config plugin for expo-glass-effect-android.
 *
 * The library's android/build.gradle handles Compose compiler configuration
 * internally for both Kotlin 1.x and 2.0+:
 * - Kotlin 2.0+: Adds compose-compiler-gradle-plugin to buildscript and applies it
 * - Kotlin 1.x: Uses composeOptions with kotlinCompilerExtensionVersion
 *
 * No additional gradle modifications needed from the config plugin.
 */
const withLiquidGlass = (config) => {
    return config;
};
exports.default = withLiquidGlass;
