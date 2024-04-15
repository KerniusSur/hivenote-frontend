import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import AppTheme from "AppTheme";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { getDesignTokens } from "utils/theme/themes";

type ThemeContextType = {
  switchColorMode: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType>({
  switchColorMode: () => {},
});

type ColorMode = "light" | "dark";

export function ThemeContextProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    if (typeof window !== undefined) {
    }
  }, []);

  const [mode, setMode] = useState<ColorMode>(
    (window.localStorage.getItem("theme") as ColorMode) ?? "light"
  );

  const switchColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    window.localStorage.setItem("theme", newMode);
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => {
    const themedAppTheme = getDesignTokens(mode);
    return createTheme(AppTheme, themedAppTheme);
  }, [mode]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={{ switchColorMode }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
}
