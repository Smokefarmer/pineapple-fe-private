'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme as rainbowDarkTheme, // Import themes
  lightTheme as rainbowLightTheme,
} from '@rainbow-me/rainbowkit';
import { http, WagmiProvider } from 'wagmi';
// Import chains
import { base, bsc, bscTestnet, mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { SiweProvider } from "./components/auth/siwe-provider";

// --- Config ---
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;
if (!projectId) throw new Error("WalletConnect Project ID is not set");

// Alchemy configuration from env
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
console.log('ALCHEMY_API_KEY', ALCHEMY_API_KEY);

// Supported chains
const chains = [
  bsc,
  bscTestnet,
  mainnet,
  sepolia,
  base,
] as const;

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'Pineapple Express Token Launcher', // Updated App Name
  projectId: projectId,
  wallets: wallets,
  chains: chains,
  transports: {
    [bsc.id]: http(`https://bnb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
    [bscTestnet.id]: http(`https://bnb-testnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
    [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
  },
});

// --- React Query Client (Singleton) ---
const makeQueryClient = () => new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000 } } });
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (typeof window === 'undefined') { return makeQueryClient(); }
  else { if (!browserQueryClient) browserQueryClient = makeQueryClient(); return browserQueryClient; }
}

// --- RainbowKit Theme Wrapper ---
function RainbowThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  // Wait for client-side hydration to complete
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  // Prevent hydration mismatch by not rendering theme-dependent content on server
  if (!mounted) {
    return (
      <RainbowKitProvider modalSize="compact">
        {children}
      </RainbowKitProvider>
    );
  }

  const isDarkMode = resolvedTheme === 'dark';

  // Pineapple Express Accent (Amber)
  const pineappleDark = rainbowDarkTheme({ accentColor: '#f59e0b', accentColorForeground: '#1f2937', borderRadius: 'medium' }); // amber-500, gray-800 text
  const pineappleLight = rainbowLightTheme({ accentColor: '#d97706', accentColorForeground: 'white', borderRadius: 'medium' });   // amber-600, white text

  return (
    <RainbowKitProvider
      theme={isDarkMode ? pineappleDark : pineappleLight}
      modalSize="compact"
      // Optionally show only BNB Chain icon if desired
      // initialChainId={bsc.id}
    >
      {children}
    </RainbowKitProvider>
  );
}

// --- Main Providers Component ---
export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <SiweProvider>
              <RainbowThemeWrapper>
                {children}
              </RainbowThemeWrapper>
            </SiweProvider>
          </SessionProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </WagmiProvider>
    </NextThemesProvider>
  );
}