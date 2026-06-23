const COLOR_MAP = {
  black: '#1a1a1a',
  'midnight black': '#1a1a1a',
  white: '#f0ede8',
  starlight: '#f0ede8',
  yellow: '#f5d76e',
  blue: '#6ab0e8',
  'blue titanium': '#4a6fa5',
  purple: '#6b3fa0',
  pink: '#e8b4b8',
  'rose gold': '#e8b4b8',
  'natural titanium': '#8b8681',
  gold: '#f9d77e',
  silver: '#e5e5e5',
  green: '#4a7c59',
  red: '#d32f2f',
  midnight: '#1a1a2e',
  orange: '#f97316',
};

export function getColorHex(colorName) {
  return COLOR_MAP[colorName?.toLowerCase().trim() || ''] || '#9ca3af';
}

export function isLightColor(hex) {
  return ['#f0ede8', '#f9d77e', '#f5d76e', '#e5e5e5', '#e8b4b8'].includes(hex);
}
