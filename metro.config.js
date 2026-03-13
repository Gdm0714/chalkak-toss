const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Metro가 package.json exports 서브패스를 resolve하지 못하는 문제 해결
    extraNodeModules: {
      '@toss/tds-react-native/private': path.resolve(
        __dirname,
        'node_modules/@toss/tds-react-native/dist/cjs/private',
      ),
    },
    unstable_enablePackageExports: true,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
