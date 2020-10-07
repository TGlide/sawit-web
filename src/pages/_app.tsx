import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import Head from "next/head";
import theme from "../theme";

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Sawit</title>
      </Head>

      <ThemeProvider theme={theme}>
        <ColorModeProvider value={"dark"}>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
