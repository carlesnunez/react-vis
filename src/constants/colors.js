import kebab from 'lodash.kebabcase';

import { transformObject } from '../utils';

export const DARK_COLORS_RAW = {
  colorText: [210, 10, 90],
  colorBackground: [210, 15, 6],
  colorBlurredBackground: [210, 15, 6, 0.75],
  colorMutedBackground: [210, 38, 15, 0.85],

  colorAction: [240, 95, 62],
  colorPrimary: [225, 100, 75],
  colorSecondary: [333, 100, 55],
  colorTertiary: [280, 100, 85],
  colorDecorative: [200, 50, 60],
  colorInfo100: [214, 40, 15],
  colorInfo200: [218, 32, 20],
  colorInfo300: [218, 30, 25],
  colorInfo400: [218, 45, 40],
  colorInfo500: [225, 100, 60],
  colorInfo700: [215, 100, 72],
  colorWarning100: [30, 25, 11],
  colorWarning200: [32, 20, 15],
  colorWarning300: [32, 25, 20],
  colorWarning400: [35, 45, 35],
  colorWarning500: [40, 100, 50],
  colorWarning700: [43, 100, 72],
  colorSuccess100: [176, 35, 10],
  colorSuccess200: [176, 26, 14],
  colorSuccess300: [176, 28, 20],
  colorSuccess400: [176, 45, 30],
  colorSuccess500: [160, 100, 40],
  colorSuccess700: [160, 80, 65],

  // Colors for the sky effects across the site
  colorCloud100: [210, 15, 6],
  colorCloud300: [212, 40, 9],
  colorCloud400: [213, 40, 10],
  colorCloud500: [213, 40, 12],
  colorSkyFrom: [214, 40, 11],
  colorSkyTo: [200, 50, 30],
  colorSkySubtle: [210, 40, 16],

  colorGray50: [210, 19, 9],
  colorGray100: [210, 15, 12],
  colorGray200: [210, 15, 18],
  colorGray300: [210, 10, 30],
  colorGray400: [210, 9, 40],
  colorGray500: [210, 8, 50],
  colorGray600: [210, 12, 55],
  colorGray700: [210, 14, 66],
  colorGray800: [210, 20, 77],
  colorGray900: [210, 25, 88],
  colorGray1000: [210, 25, 96],

  // This color is used when I want something that APPEARS white.
  // In "Dark Mode", actual white would be painfully bright, so this tones it down a bit.
  colorAdaptiveWhite: [210, 25, 92],

  syntaxBg: [210, 15, 6], // Same as `background`
  syntaxHighlight: [210, 30, 18],
  syntaxTxt: [0, 0, 100],
  syntaxComment: [200, 18, 51],
  syntaxProp: [326, 100, 61],
  syntaxBool: [50, 100, 50],
  syntaxVal: [210, 12, 65],
  syntaxStr: [259, 100, 71],
  syntaxName: [280, 100, 66],
  syntaxDel: [0, 100, 67],
  syntaxRegex: [50, 100, 50], // Same as 'syntaxBool'
  syntaxFn: [195, 100, 50],

  // LEGACY colors:
  colorInfo: [225, 100, 80],
  colorInfoBackground: [225, 100, 80, 0.1],
  colorError: [340, 95, 60],
  colorErrorBackground: [340, 95, 43, 0.1],
  colorSuccess: [160, 100, 40],
  colorSuccessBackground: [160, 100, 40, 0.1],
  colorAlert: [40, 100, 50],
  colorAlertBackground: [40, 100, 50, 0.1],
};

// For certain slices of the tree, we'll overwrite `--color-background`. For example, a warning sidenote will set it to `--color-warning-500`. If I need to know the PAGE background within those elements, I can use this value:
DARK_COLORS_RAW.colorPageBackground = DARK_COLORS_RAW.colorBackground;

// Same deal for primary color:
DARK_COLORS_RAW.colorPagePrimary = DARK_COLORS_RAW.colorPrimary;

DARK_COLORS_RAW.kbdBackgroundColor = DARK_COLORS_RAW.colorGray400;
DARK_COLORS_RAW.kbdBorderColor = DARK_COLORS_RAW.colorGray300;

// The background color for <InlineCode> and similar things:
DARK_COLORS_RAW.colorCodeBg = DARK_COLORS_RAW.colorGray100;
// In Dark Mode, elements like code snippets and Demo have an outline. This color only exists in Dark Mode:
DARK_COLORS_RAW.colorContentOutline = DARK_COLORS_RAW.colorGray300;

export const LIGHT_COLORS_RAW = {
  colorText: [222, 22, 5],
  // Was thinking of shifting to an off-white, but sadly I have so many images with a white background, which clashes with any non-white page bg.
  colorBackground: [0, 0, 100],
  colorBlurredBackground: [0, 0, 95, 0.75],
  colorMutedBackground: [200, 45, 76, 0.85],

  colorAction: [240, 95, 62],
  colorPrimary: [240, 95, 62],
  colorSecondary: [333, 100, 45],
  colorTertiary: [255, 85, 30],
  colorDecorative: [200, 75, 65],
  colorInfo100: [213, 80, 95],
  colorInfo200: [220, 70, 91],
  colorInfo300: [220, 58, 87],
  colorInfo400: [220, 70, 78],
  colorInfo500: [245, 100, 60],
  colorInfo700: [245, 64, 40],
  colorError100: [340, 80, 95],
  colorError200: [340, 70, 85],
  colorError500: [340, 95, 39],
  colorWarning100: [50, 85, 90],
  colorWarning200: [48, 80, 85],
  colorWarning300: [45, 77, 80],
  colorWarning400: [37, 80, 60],
  colorWarning500: [37, 100, 50],
  colorWarning700: [33, 100, 40],
  colorSuccess100: [157, 48, 95],
  colorSuccess200: [155, 44, 87],
  colorSuccess300: [155, 40, 82],
  colorSuccess500: [145, 100, 25],
  colorSuccess700: [145, 80, 17],

  colorCloud100: [203, 60, 95],
  colorCloud300: [202, 68, 92],
  colorCloud400: [201, 60, 86],
  colorCloud500: [200, 80, 83],
  colorCloud700: [210, 30, 55],
  colorSkyFrom: [200, 70, 78],
  colorSkyTo: [200, 70, 70],
  colorSkySubtle: [200, 90, 88],

  colorGray50: [225, 40, 96],
  colorGray100: [225, 25, 92],
  colorGray200: [225, 16, 86],
  colorGray300: [225, 8, 80],
  colorGray400: [225, 8, 70],
  colorGray500: [225, 7, 60],
  colorGray600: [225, 15, 50],
  colorGray700: [225, 12, 40],
  colorGray800: [225, 20, 30],
  colorGray900: [225, 25, 20],
  colorGray1000: [225, 15, 15],

  colorAdaptiveWhite: [0, 0, 100],

  syntaxBg: [213, 80, 95],
  syntaxHighlight: [225, 25, 93],
  syntaxTxt: [0, 0, 16],
  syntaxComment: [225, 15, 42],
  syntaxProp: [327, 100, 43],
  syntaxBool: [302, 100, 37],
  syntaxVal: [200, 15, 40],
  syntaxStr: [259, 100, 56],
  syntaxName: [280, 100, 50],
  syntaxDel: [0, 100, 67],
  syntaxRegex: [255, 100, 42],
  syntaxFn: [231, 99, 62],

  // Legacy colors
  colorInfo: [245, 100, 60],
  colorInfoBackground: [215, 100, 40, 0.1],
  colorError: [340, 95, 39],
  colorErrorBackground: [340, 95, 43, 0.1],
  colorSuccess: [145, 100, 27],
  colorSuccessBackground: [145, 100, 40, 0.1],
  colorAlert: [37, 100, 50],
  colorAlertBackground: [52, 100, 50, 0.25],
};

LIGHT_COLORS_RAW.colorPageBackground =
  LIGHT_COLORS_RAW.colorBackground;
LIGHT_COLORS_RAW.colorPagePrimary = LIGHT_COLORS_RAW.colorPrimary;

LIGHT_COLORS_RAW.kbdBackgroundColor = LIGHT_COLORS_RAW.colorGray100;
LIGHT_COLORS_RAW.kbdBorderColor = LIGHT_COLORS_RAW.colorGray300;
LIGHT_COLORS_RAW.colorCodeBg = LIGHT_COLORS_RAW.syntaxBg;
// In light mode, content isn't outlined, and so we pass transparent as a value:
LIGHT_COLORS_RAW.colorContentOutline = [0, 0, 0, 0];

export const LIGHT_COLORS = createStyleObject(LIGHT_COLORS_RAW);
export const DARK_COLORS = createStyleObject(DARK_COLORS_RAW);

export const LIGHT_COLORS_CSS = createCssString(LIGHT_COLORS);
export const DARK_COLORS_CSS = createCssString(DARK_COLORS);

// This method takes the raw H/S/L values and produces an object that can be passed to `style`:
// Input: { gray500: [210, 10, 90] }
// Output: { '--color-gray-500': 'hsl(210deg 10% 90%)' }
function createStyleObject(colors) {
  return transformObject(colors, (key, value) => {
    if (typeof value === 'string') {
      // This allows us to "share" a value across keys.
      value = colors[value];
    }

    const [h, s, l, a = 1] = value;

    const newKey = `--${kebab(key)}`;
    const newValue =
      a === 1
        ? `hsl(${h}deg ${s}% ${l}%)`
        : `hsl(${h}deg ${s}% ${l}% / ${a})`;

    return [newKey, newValue];
  });
}

function createCssString(colorMap) {
  return Object.entries(colorMap)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n');
}

/*
  Sometimes I want to grab the raw HSL values and combine them with a custom opacity. This helper function makes it easier.

  Example usage:
  color: hsl(${vals(DARK_COLORS.colorText)} / 0.5);
*/
export function vals(colorValues) {
  return `${colorValues[0]}deg ${colorValues[1]}% ${colorValues[2]}%`;
}