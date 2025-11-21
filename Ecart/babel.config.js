module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@config': './src/config',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@utils': './src/utils',
            '@styles': './src/styles',
            '@store': './src/store',
            '@types': './src/types',
            '@constants': './src/constants',
            '@database': './src/database', 
          },
        },
      ],
      // keep last if you use Reanimated:
      // 'react-native-reanimated/plugin',
    ],
  };
};