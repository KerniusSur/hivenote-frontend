import "@fontsource/roboto";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import { createTheme } from "@mui/material";
import colors, { elevationLight } from "utils/theme/colors";

const AppTheme = createTheme({
  // --------------------------- Components --------------------------------- //
  components: {
    // ------------------ MuiButton ------------------ //
    MuiButton: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "10px 24px",
          gap: "8px",
          textTransform: "none",
          borderRadius: "100px",
          height: "40px",
          flexShrink: 0,
          animationTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
          animationDuration: "200ms",
          "&:hover": {
            boxShadow: elevationLight.elevation1,
          },
        },
      },
      variants: [
        {
          props: { startIcon: true },
          style: {
            padding: "10px 24px 10px 16px",
          },
        },
        {
          props: { endIcon: true },
          style: {
            padding: "10px 16px 10px 24px",
          },
        },
      ],
    },
    // ------------------ MuiOutlinedInput ------------------ //
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "12px",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "150%",
          height: "24px",
          opacity: 1,
        },
      },
    },
    // ------------------ MuiDivider ------------------ //
    MuiDivider: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    // ------------------ MuiTypography ------------------ //
    MuiTypography: {
      styleOverrides: {
        root: {
          padding: "0px !important",
        },
      },
    },
    // ------------------ MuiAppBar ------------------ //
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
  // --------------------------- Components --------------------------------- //
  // --------------------------- Breakpoints --------------------------------- //
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1200,
      xl: 1600,
    },
  },
  // --------------------------- Breakpoints --------------------------------- //
  // --------------------------- Typography --------------------------------- //
  typography: {
    h1: {
      // Display Large
      fontFamily: "Roboto",
      fontSize: "57px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "64px",
      letterSpacing: "-0.25px",
    },
    h2: {
      // Display Medium
      fontFamily: "Roboto",
      fontSize: "45px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "52px",
    },
    h3: {
      // Display Small
      fontFamily: "Roboto",
      fontSize: "36px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "44px",
    },
    h4: {
      // Headline Large
      fontFamily: "Roboto",
      fontSize: "32px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "40px",
    },
    h5: {
      // Headline Medium
      fontFamily: "Roboto",
      fontSize: "28px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "36px",
    },
    h6: {
      // Headline Small
      fontFamily: "Roboto",
      fontSize: "24px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "32px",
    },
    title1: {
      // Title Large
      fontFamily: "Roboto",
      fontSize: "22px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "28px",
    },
    title2: {
      // Title Medium
      fontFamily: "Roboto",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "24px",
      letterSpacing: "0.15px",
    },
    title3: {
      // Title Small
      fontFamily: "Roboto",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "20px",
      letterSpacing: "0.1px",
    },
    label1: {
      // Label Large
      fontFamily: "Roboto",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "20px",
      letterSpacing: "0.1px",
    },
    label2: {
      // Label Medium
      fontFamily: "Roboto",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "16px",
      letterSpacing: "0.5px",
    },
    label3: {
      // Label Small
      fontFamily: "Roboto",
      fontSize: "11px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "16px",
      letterSpacing: "0.5px",
    },
    body1: {
      // Body Large
      fontFamily: "Roboto",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "24px",
      letterSpacing: "0.5px",
    },
    body2: {
      // Body Medium
      fontFamily: "Roboto",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "20px",
      letterSpacing: "0.25px",
    },
    body3: {
      // Body Small
      fontFamily: "Roboto",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "16px",
      letterSpacing: "0.4px",
    },
    hyperlink: {
      // Hyperlink
      fontFamily: "Roboto",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "24px",
      color: "#6750A4",
      textDecoration: "underline",
    },
    button: {
      // Button (Label Large)
      fontFamily: "Roboto",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "20px",
      letterSpacing: "0.1px",
    },
  },
  // --------------------------- Typography --------------------------------- //
});

export default AppTheme;

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
    title1: true;
    title2: true;
    title3: true;
    label1: true;
    label2: true;
    label3: true;
    hyperlink: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    body3: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    title3: React.CSSProperties;
    label1: React.CSSProperties;
    label2: React.CSSProperties;
    label3: React.CSSProperties;
    hyperlink: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    title3: React.CSSProperties;
    label1: React.CSSProperties;
    label2: React.CSSProperties;
    label3: React.CSSProperties;
    hyperlink: React.CSSProperties;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {}

  interface PaletteOptions {}
}
