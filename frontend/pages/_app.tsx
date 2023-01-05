import "../styles/globals.css";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@emotion/react";
import defaultTheme from "../themes/default";
import { Container } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/*   
        CssBaseline adds Normalize CSS. It makes page to follow mui. 
        It adds CSS properties like "box-sizing: border-box" and "margin : 0"
        */}
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;