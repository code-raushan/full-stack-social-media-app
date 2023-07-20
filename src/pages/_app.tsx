import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {Toaster} from 'react-hot-toast'
import type { AppProps } from "next/app";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient;

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="294256846544-a9a43cbmqee525e1o65aqagmfj37jl9u.apps.googleusercontent.com">
      <Component {...pageProps} />
      <Toaster />
      <ReactQueryDevtools />
    </GoogleOAuthProvider>
    </QueryClientProvider>
    
  );
}
