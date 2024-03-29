module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // plugins: ["transform-remove-console"],
  env: {
    development: {
      plugins: ['react-native-paper/babel'],
    },

    production: {
      plugins: ['react-native-paper/babel', 'transform-remove-console'],
    },
  },
  retainLines: true,
};
