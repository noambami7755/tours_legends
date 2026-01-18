module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel", // בגרסה 2 זה חייב להיות כאן!
      "react-native-reanimated/plugin",
    ],
  };
};