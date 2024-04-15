import { Components, PaletteMode, PaletteOptions, Theme } from "@mui/material";
import { hexToRgba } from "utils/ObjectUtils";
import colors, { outline, surfaceDark, surfaceLight } from "utils/theme/colors";

interface DesignTokens {
  palette: PaletteOptions | undefined;
  components: Components<Omit<Theme, "components">> | undefined;
}

export const getDesignTokens = (mode: PaletteMode): DesignTokens => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: colors.primary.light,
            contrastText: colors.onPrimary.light,
          },
          secondary: {
            main: colors.secondary.light,
            contrastText: colors.onSecondary.light,
          },
          error: {
            main: colors.error.light,
            contrastText: colors.onError.light,
          },
          background: {
            default: colors.background.light,
            paper: colors.surface.light,
          },
          text: {
            primary: colors.onSurface.light,
            secondary: colors.onSecondaryContainer.light,
          },
        }
      : {
          primary: {
            main: colors.primary.dark,
            contrastText: colors.onPrimary.dark,
          },
          secondary: {
            main: colors.secondary.dark,
            contrastText: colors.onSecondary.dark,
          },
          error: {
            main: colors.error.dark,
            contrastText: colors.onError.dark,
          },
          background: {
            default: colors.background.dark,
            paper: colors.surface.dark,
          },
          text: {
            primary: colors.onSurface.dark,
            secondary: colors.onSecondaryContainer.dark,
          },
        }),
  },
  components: {
    ...(mode === "light"
      ? {
          // ------------------ MuiAppBar ------------------ //
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: surfaceLight.surfaceContainer,
              },
            },
          },
          // ------------------ MuiButton ------------------ //
          MuiButton: {
            styleOverrides: {
              contained: {
                "&:hover": {
                  backgroundColor: hexToRgba(surfaceLight.surfaceTint, 0.9),
                },
              },
              outlined: {
                "&:hover": {
                  backgroundColor: hexToRgba(surfaceLight.surfaceTint, 0.12),
                  borderColor: hexToRgba(surfaceLight.surfaceTint, 0.9),
                },
              },
            },
          },
          // ------------------ MuiDivider ------------------ //
          MuiDivider: {
            styleOverrides: {
              root: {
                borderColor: outline.light,
              },
            },
          },
        }
      : {
          // ------------------ MuiAppBar ------------------ //
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: surfaceDark.surfaceContainer,
              },
            },
          },
          // ------------------ MuiButton ------------------ //
          MuiButton: {
            styleOverrides: {
              contained: {
                "&:hover": {
                  backgroundColor: hexToRgba(surfaceDark.surfaceTint, 0.9),
                },
              },
              outlined: {
                "&:hover": {
                  backgroundColor: hexToRgba(surfaceDark.surfaceTint, 0.12),
                  borderColor: hexToRgba(surfaceDark.surfaceTint, 0.9),
                },
              },
            },
          },
          // ------------------ MuiDivider ------------------ //
          MuiDivider: {
            styleOverrides: {
              root: {
                borderColor: outline.dark,
              },
            },
          },
        }),
  },
});
