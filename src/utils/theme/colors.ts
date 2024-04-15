// --------------------------- Color Interface --------------------------------- //
export interface Color {
  0: string;
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
  95: string;
  99: string;
  100: string;
}
export interface CustomColor {
  [key: string]: string;
}
export type ColorPartial = Partial<Color>;

// --------------------------- Purple / Primary --------------------------------- //
export const primaryColors: Color = {
  0: "#000000",
  10: "#21005D",
  20: "#381E72",
  30: "#4F378B",
  40: "#6750A4",
  50: "#7F67BE",
  60: "#9A82DB",
  70: "#B69DF8",
  80: "#D0BCFF",
  90: "#EADDFF",
  95: "#F6EDFF",
  99: "#FFFBFE",
  100: "#FFFFFF",
};
export const purple = primaryColors;

// --------------------------- Light Purple / Secondary --------------------------------- //
export const secondaryColors: Color = {
  0: "#000000",
  10: "#21005D",
  20: "#381E72",
  30: "#4F378B",
  40: "#6750A4",
  50: "#7F67BE",
  60: "#9A82DB",
  70: "#B69DF8",
  80: "#D0BCFF",
  90: "#EADDFF",
  95: "#F6EDFF",
  99: "#FFFBFE",
  100: "#FFFFFF",
};
export const lightPurple = secondaryColors;

// --------------------------- Tertiary / Burgundy  --------------------------------- //
export const tertiaryColors: Color = {
  0: "#000000",
  10: "#31111D",
  20: "#492532",
  30: "#633B48",
  40: "#7D5260",
  50: "#986977",
  60: "#B58392",
  70: "#D29DAC",
  80: "#EFB8C8",
  90: "#FFD8E4",
  95: "#FFECF1",
  99: "#FFFBFA",
  100: "#FFFFFF",
};
export const burgundy = tertiaryColors;

// --------------------------- Red / Error --------------------------------- //
export const errorColors: Color = {
  0: "#000000",
  10: "#21005D",
  20: "#381E72",
  30: "#4F378B",
  40: "#6750A4",
  50: "#7F67BE",
  60: "#9A82DB",
  70: "#B69DF8",
  80: "#D0BCFF",
  90: "#EADDFF",
  95: "#F6EDFF",
  99: "#FFFBFE",
  100: "#FFFFFF",
};
export const red = errorColors;

// --------------------------- Neutral / Grayscale --------------------------------- //
export const neutralColors: Color = {
  0: "#000000",
  10: "#1D1B20",
  20: "#322F35",
  30: "#48464C",
  40: "#605D64",
  50: "#79767D",
  60: "#938F96",
  70: "#AEA9B1",
  80: "#CAC5CD",
  90: "#E6E0E9",
  95: "#F5EFF7",
  99: "#FFFBFF",
  100: "#FFFFFF",
};
export const grayscale = neutralColors;

// --------------------------- Neutral Variant / Lightscale --------------------------------- //
export const neutralVariantColors: Color = {
  0: "#000000",
  10: "#1D1A22",
  20: "#322F37",
  30: "#49454F",
  40: "#605D66",
  50: "#79747E",
  60: "#938F99",
  70: "#AEA9B4",
  80: "#CAC4D0",
  90: "#E7E0EC",
  95: "#F5EEFA",
  99: "#FFFBFE",
  100: "#FFFFFF",
};
export const lightscale = neutralVariantColors;

// --------------------------- Background --------------------------------- //
export const backgroundColors: CustomColor = {
  lightBackground: "rgba(254, 247, 255, 1)",
  lightOnBackground: "rgba(29, 27, 32, 1)",
  darkBackground: "rgba(20,18,24,1)",
  darkOnBackground: "rgba(230, 224, 233, 1)",
  lightBackgroundOpacity008: "rgba(20,18,24,0.08)",
  lightBackgroundOpacity012: "rgba(20,18,24,0.12)",
  lightBackgroundOpacity016: "rgba(20,18,24,0.16)",
  lightOnBackgroundOpacity008: "rgba(29,27,32,0.08)",
  lightOnBackgroundOpacity012: "rgba(29,27,32,0.12)",
  lightOnBackgroundOpacity016: "rgba(29,27,32,0.16)",
  darkBackgroundOpacity008: "rgba(20,18,24,0.08)",
  darkBackgroundOpacity012: "rgba(20,18,24,0.12)",
  darkBackgroundOpacity016: "rgba(20,18,24,0.16)",
  darkOnBackgroundOpacity008: "rgba(230,224,233,0.08)",
  darkOnBackgroundOpacity012: "rgba(230,224,233,0.12)",
  darkOnBackgroundOpacity016: "rgba(230,224,233,0.16)",
};

// --------------------------- Elevation --------------------------------- //
export interface Elevation {
  elevation1: string;
  elevation2: string;
  elevation3: string;
  elevation4: string;
  elevation5: string;
}

export const elevationLight: Elevation = {
  elevation1:
    "0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
  elevation2:
    "0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
  elevation3:
    "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.30)",
  elevation4:
    "0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px 0px rgba(0, 0, 0, 0.30)",
  elevation5:
    "0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.30)",
};

export const elevationDark: Elevation = {
  elevation1:
    "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
  elevation2:
    "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
  elevation3:
    "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.30)",
  elevation4:
    "0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px 0px rgba(0, 0, 0, 0.30)",
  elevation5:
    "0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.30)",
};

// --------------------------- Surface --------------------------------- //
export interface Surface {
  surfaceTint: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
}

export const surfaceLight: Surface = {
  surfaceTint: "#68548E",
  surface: "#FEF7FF",
  onSurface: "#1D1B20",
  surfaceVariant: "#E7E0EB",
  onSurfaceVariant: "#49454E",
  surfaceDim: "#DED8E0",
  surfaceBright: "#FEF7FF",
  surfaceContainerLowest: "#FFFFFF",
  surfaceContainerLow: "#F8F1FA",
  surfaceContainer: "#F2ECF4",
  surfaceContainerHigh: "#EDE6EE",
  surfaceContainerHighest: "#E7E0E8",
};

export const surfaceDark: Surface = {
  surfaceTint: "#D3BCFD",
  surface: "#151218",
  onSurface: "#E7E0E8",
  surfaceVariant: "#49454E",
  onSurfaceVariant: "#CBC4CF",
  surfaceDim: "#151218",
  surfaceBright: "#3B383E",
  surfaceContainerLowest: "#0F0D13",
  surfaceContainerLow: "#1D1B20",
  surfaceContainer: "#211F24",
  surfaceContainerHigh: "#2C292F",
  surfaceContainerHighest: "#36343A",
};

// --------------------------- Theme --------------------------------- //
export const colors = {
  primary: {
    light: "#68548E",
    lightMedium: "#4B3970",
    lightHigh: "#2A164D",
    dark: "#D3BCFD",
    darkMedium: "#D7C0FF",
    darkHigh: "#FFF9FF",
  },
  onPrimary: {
    light: "#FFFFFF",
    dark: "#38265C",
  },
  primaryContainer: {
    light: "#EBDDFF",
    dark: "#4F3D74",
  },
  onPrimaryContainer: {
    light: "#230F46",
    dark: "#EBDDFF",
  },
  secondary: {
    light: "#635B70",
    dark: "#CDC2DB",
  },
  onSecondary: {
    light: "#FFFFFF",
    dark: "#342D40",
  },
  secondaryContainer: {
    light: "#E9DEF8",
    dark: "#4B4358",
  },
  onSecondaryContainer: {
    light: "#1F182B",
    dark: "#E9DEF8",
  },
  background: {
    light: "#FEF7FF",
    dark: "#151218",
  },
  onBackground: {
    light: "#1D1B20",
    dark: "#E7E0E8",
  },
  surface: {
    light: "#FEF7FF",
    dark: "#151218",
  },
  onSurface: {
    light: "#1D1B20",
    dark: "#E7E0E8",
  },
  error: {
    light: "#BA1A1A",
    dark: "#FFB4AB",
  },
  onError: {
    light: "#FFFFFF",
    dark: "#690005",
  },
  errorContainer: {
    light: "#FFDAD6",
    dark: "#93000A",
  },
  onErrorContainer: {
    light: "#410002",
    dark: "#FFDAD6",
  },
};

export default colors;
