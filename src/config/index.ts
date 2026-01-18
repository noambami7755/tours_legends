export const Config = {
  BASE_URL: process.env.EXPO_PUBLIC_BASE_URL || 'https://meny.co.il/wp-json/wp/v2',
  DATA_TYPE_EP: process.env.EXPO_PUBLIC_DATA_TYPE_EP || 'teva',
  THEME_COLOR: process.env.EXPO_PUBLIC_THEME_COLOR || '#4d7c0f',
  ADS_URL: process.env.EXPO_PUBLIC_ADS_URL || 'https://meny.co.il/wp-json/meny/v1/ads',
};

export const Theme = {
  colors: {
    primary: Config.THEME_COLOR,
    background: '#f3f4f6',
    text: '#1f2937',
    white: '#ffffff',
  },
};
