import { Layout } from "@/layout";
import "@/styles/globals.css";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { persistor, store } from "../context/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { THEME_COLOR, WEBSITE_TITLE } from "@/constants";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{Component.title ? Component.title : WEBSITE_TITLE}</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
              <ChakraProvider theme={theme}>
                <Layout>
                  <NextNProgress
                    color={`rgb( ${THEME_COLOR.r},  ${THEME_COLOR.g}, ${THEME_COLOR.b})`}
                    options={{
                      showSpinner: false,
                    }}
                  />
                  <Component {...pageProps} />
                </Layout>
              </ChakraProvider>
            </SessionProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
}
