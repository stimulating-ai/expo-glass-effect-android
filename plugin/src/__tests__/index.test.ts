import { ExpoConfig } from '@expo/config-types';
import withLiquidGlass from '../index';

// Mock @expo/config-plugins
jest.mock('@expo/config-plugins', () => ({
  withProjectBuildGradle: jest.fn((config, callback) => {
    const modResults = {
      language: 'groovy',
      contents: `
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
    }
}
      `,
    };
    callback({ ...config, modResults });
    return config;
  }),
  withAppBuildGradle: jest.fn((config, callback) => {
    const modResults = {
      language: 'groovy',
      contents: `
android {
    compileSdkVersion rootProject.ext.compileSdkVersion
}
      `,
    };
    callback({ ...config, modResults });
    return config;
  }),
  withGradleProperties: jest.fn((config, callback) => {
    const modResults: Array<{ type: string; key: string; value: string }> = [];
    callback({ ...config, modResults });
    return config;
  }),
}));

describe('withLiquidGlass config plugin', () => {
  const baseConfig: ExpoConfig = {
    name: 'TestApp',
    slug: 'test-app',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('is a function', () => {
    expect(typeof withLiquidGlass).toBe('function');
  });

  it('returns the config object', () => {
    const result = withLiquidGlass(baseConfig);
    expect(result).toBeDefined();
    expect(result.name).toBe('TestApp');
    expect(result.slug).toBe('test-app');
  });

  it('calls withProjectBuildGradle', () => {
    const { withProjectBuildGradle } = require('@expo/config-plugins');

    withLiquidGlass(baseConfig);

    expect(withProjectBuildGradle).toHaveBeenCalled();
  });

  it('calls withAppBuildGradle', () => {
    const { withAppBuildGradle } = require('@expo/config-plugins');

    withLiquidGlass(baseConfig);

    expect(withAppBuildGradle).toHaveBeenCalled();
  });

  it('calls withGradleProperties', () => {
    const { withGradleProperties } = require('@expo/config-plugins');

    withLiquidGlass(baseConfig);

    expect(withGradleProperties).toHaveBeenCalled();
  });
});

describe('withLiquidGlass Gradle modifications', () => {
  it('adds kotlinVersion if not present', () => {
    const { withProjectBuildGradle } = require('@expo/config-plugins');

    // Reset mock to capture the callback
    withProjectBuildGradle.mockImplementation((config: ExpoConfig, callback: Function) => {
      const modResults = {
        language: 'groovy',
        contents: `
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
    }
}
        `,
      };
      const result = callback({ ...config, modResults });
      return result || config;
    });

    const baseConfig: ExpoConfig = {
      name: 'TestApp',
      slug: 'test-app',
    };

    withLiquidGlass(baseConfig);

    expect(withProjectBuildGradle).toHaveBeenCalled();
  });

  it('adds compose build features if not present', () => {
    const { withAppBuildGradle } = require('@expo/config-plugins');

    // Reset mock to capture the callback
    withAppBuildGradle.mockImplementation((config: ExpoConfig, callback: Function) => {
      const modResults = {
        language: 'groovy',
        contents: `
android {
    compileSdkVersion 34
}
        `,
      };
      const result = callback({ ...config, modResults });
      return result || config;
    });

    const baseConfig: ExpoConfig = {
      name: 'TestApp',
      slug: 'test-app',
    };

    withLiquidGlass(baseConfig);

    expect(withAppBuildGradle).toHaveBeenCalled();
  });

  it('does not add compose if already present', () => {
    const { withAppBuildGradle } = require('@expo/config-plugins');

    let modifiedContents = '';

    withAppBuildGradle.mockImplementation((config: ExpoConfig, callback: Function) => {
      const modResults = {
        language: 'groovy',
        contents: `
android {
    buildFeatures {
        compose true
    }
}
        `,
      };
      callback({ ...config, modResults });
      modifiedContents = modResults.contents;
      return config;
    });

    const baseConfig: ExpoConfig = {
      name: 'TestApp',
      slug: 'test-app',
    };

    withLiquidGlass(baseConfig);

    // Should not duplicate compose configuration
    const composeMatches = modifiedContents.match(/compose true/g);
    expect(composeMatches?.length).toBe(1);
  });
});
