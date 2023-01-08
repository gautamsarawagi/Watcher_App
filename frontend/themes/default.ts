import { colors, createTheme, PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title1: React.CSSProperties;
    title2: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title1?: React.CSSProperties;
    title2?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title1: true;
    title2: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteColorOptions;
  }
}

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    neutral: {
      main: "#3362CC",
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3BB",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A",
    },
    primary: {
      // main: "#3362CC",
      main: "#355389",
      50: "#D7DEE8",
      300: "#B4C8E2",
      500: "#355389",
      700: "#394B73",
      900: "#092159",
    },
    secondary: {
      main: "#9c27b0",
      50: "#FCF5DB",
      300: "#FFF0B9",
      500: "#FBDF7D",
      700: "#EFCC4D",
      900: "#D6B745",
    },
    success: {
      50: "#ECFDF5",
      300: "#6EE787",
      500: "#10B981",
      700: "#047857",
      900: "#064E3B",
    },
    warning: {
      50: "#FFFBEB",
      300: "#FCD34D",
      500: "#F59E0B",
      700: "#B45309",
      900: "#78350F",
    },
    error: {
      50: "#FEF2F2",
      300: "#FE9399",
      500: "#EF4444",
      700: "#B91C1C",
      900: "#7F1D1D",
    },
    text: {
      secondary: "#000000",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: 14,
    allVariants: {
      lineHeight: 1.3,
    },
    h1: {
      fontSize: "5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "4rem",
    },
    h3: {
      fontSize: "2.25rem",
    },
    title1: {
      fontSize: "1.5rem",
    },
    title2: {
      fontSize: "1.25rem",
    },
    subtitle1: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.875rem",
    },
  },
});

export default defaultTheme;