import { createTheme } from "@mui/material";

const AppTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            color: "#ffffff",
            backgroundColor: "#000000",
            background: "#000000",
            padding: "12px 24px",
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            color: "#000000",
            borderColor: "#000000",
            padding: "12px 24px",
          },
        },
        {
          props: { variant: "text" },
          style: {
            color: "#000000",
            padding: "12px 24px",
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {},
    },
    MuiInputBase: {
      styleOverrides: {
        input: {},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "12px",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "150%",
          height: "24px",
          color: "#000000",
          opacity: 1,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#000000",
          width: "100%",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          padding: "0px !important",
        },
      },
    },
  },
  palette: {
    black: "#000000",
    white: "#ffffff",
    gray: "#f4f4f4",
    primary: {
      main: "#000000",
    },
  },
  typography: {
    h1: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "56px",
      lineHeight: "120%",
      fontWeight: 700,
      color: "#000000",
    },
    h2: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "48px",
      lineHeight: "120%",
      fontWeight: 700,
      color: "#000000",
    },
    h3: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "40px",
      lineHeight: "120%",
      fontWeight: 700,
      color: "#000000",
    },
    h4: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "32px",
      lineHeight: "130%",
      fontWeight: 700,
      color: "#000000",
    },
    h5: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "24px",
      lineHeight: "140%",
      fontWeight: 700,
      color: "#000000",
    },
    h6: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "20px",
      lineHeight: "140%",
      fontWeight: 700,
      color: "#000000",
    },
    body1: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "20px",
      lineHeight: "150%",
      fontWeight: 400,
      color: "#000000",
    },
    body2: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "18px",
      lineHeight: "150%",
      fontWeight: 400,
      color: "#000000",
    },
    body3: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "16px",
      lineHeight: "150%",
      fontWeight: 400,
      color: "#000000",
    },
    body4: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "14px",
      lineHeight: "150%",
      fontWeight: 400,
      color: "#000000",
    },
    body5: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "12px",
      lineHeight: "150%",
      fontWeight: 400,
      color: "#000000",
    },
    hyperlink: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "16px",
      lineHeight: "150%",
      fontWeight: 400,
      color: "#3872E1",
    },
    button: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "16px",
      lineHeight: "150%",
      fontWeight: 500,
      textTransform: "none",
    },
  },
});

export default AppTheme;

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    hyperlink: true;
    overline: false;
    body1: true;
    body2: true;
    body3: true;
    body4: true;
    body5: true;
    subtitle: true;
    subtitle1: false;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    hyperlink: React.CSSProperties;
    body3: React.CSSProperties;
    body4: React.CSSProperties;
    body5: React.CSSProperties;
    subtitle: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    hyperlink?: React.CSSProperties;
    body3?: React.CSSProperties;
    body4?: React.CSSProperties;
    body5?: React.CSSProperties;
    subtitle?: React.CSSProperties;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    black: string;
    white: string;
    gray: string;
  }

  interface PaletteOptions {
    black: string;
    white: string;
    gray: string;
  }
}
